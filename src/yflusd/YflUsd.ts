import { Configuration } from './config';
import { ContractName, TokenStat, TreasuryAllocationTime } from './types';
import { BigNumber, Contract, ethers, Overrides } from 'ethers';
import { decimalToBalance } from './ether-utils';
import { TransactionResponse } from '@ethersproject/providers';
import ERC20 from './ERC20';
import { getDisplayBalance } from '../utils/formatBalance';
import { getDefaultProvider } from '../utils/provider';
import ILinkswapPairABI from './ILinkswapPair.abi.json';
import POOLABI from './Pool.abi.json';

/**
 * An API module of YFLUSD contracts.
 * All contract-interacting domain logic should be defined in here.
 */
export class YflUsd {
  myAccount: string;
  provider: ethers.providers.Web3Provider;
  signer?: ethers.Signer;
  config: Configuration;
  contracts: { [name: string]: Contract };
  externalTokens: { [name: string]: any };
  boardroomVersionOfUser?: string;
  ethPriceAPI: string;

  yflusdEth: Contract;
  syflEth: Contract;
  yflusdLink: Contract;
  syflLink: Contract;
  YFLUSD: ERC20;
  SYFL: ERC20;
  BYFL: ERC20;
  tokens: Record<string, any>;
  pools: Record<string, any>;

  constructor(cfg: Configuration) {
    const { deployments, externalTokens } = cfg;
    const provider = getDefaultProvider();
    this.ethPriceAPI = cfg.ethPriceAPI;

    this.tokens = {
      ETH: { usd: 0 },
      BONK: { usd: 0 },
      DOKI: { usd: 0 },
      LINK: { usd: 0 },
      MASQ: { usd: 0 },
      SYFL: { usd: 0 },
      SYAX: { usd: 0 },
      YFL: { usd: 0 },
      YFLUSD: { usd: 0 },
      yflusdEth: {
        token0: { amount: 0, symbol: 'YFLUSD' },
        token1: { amount: 0, symbol: 'ETH' },
        totalSupply: 0,
      },
      yflusdLink: {
        token0: { amount: 0, symbol: 'LINK' },
        token1: { amount: 0, symbol: 'YFLUSD' },
        totalSupply: 0,
      },
      syflEth: {
        token0: { amount: 0, symbol: 'SYFL' },
        token1: { amount: 0, symbol: 'ETH' },
        totalSupply: 0,
      },
      syflLink: {
        token0: { amount: 0, symbol: 'LINK' },
        token1: { amount: 0, symbol: 'SYFL' },
        totalSupply: 0,
      },
    };
    this.pools = {
      BONK: {
        address: '0xA54550653b6F5D55CB8D258a3Ed7c653eb186cC0',
        totalSupply: 0,
        rewardRate: 0,
        rewardToken: 'YFLUSD',
      },
      DOKI: {
        address: '0xFa60fFae050Edda279399209f3BBc0AC59327c88',
        totalSupply: 0,
        rewardRate: 0,
        rewardToken: 'YFLUSD',
      },
      LINK: {
        address: '0x4043D9BF3bC91893604c0281Dac857e6F24824a1',
        totalSupply: 0,
        rewardRate: 0,
        rewardToken: 'YFLUSD',
      },
      MASQ: {
        address: '0x77eAddB37d116D0272fda5d6441e4423950C8427',
        totalSupply: 0,
        rewardRate: 0,
        rewardToken: 'YFLUSD',
      },
      YFL: {
        address: '0x5f35334ef7E38EBE1f94d31E6fC3d78b477f4f91',
        totalSupply: 0,
        rewardRate: 0,
        rewardToken: 'YFLUSD',
      },
      SYAX: {
        address: '0xEB94b4a6700F5b5DaDB9ecb2973bEACB71A17bCD',
        totalSupply: 0,
        rewardRate: 0,
        rewardToken: 'YFLUSD',
      },
      'ETH-YFLUSD-LSLP': {
        address: '0x6DddCc7F963C65b18FdDD842e6553528f014aDeA',
        totalSupply: 0,
        rewardRate: 0,
        rewardToken: 'SYFL',
      },
      'ETH-SYFL-LSLP': {
        address: '0x81C76925E7F41f0306E1147c4659784d4402bD51',
        totalSupply: 0,
        rewardRate: 0,
        rewardToken: 'SYFL',
      },
      'LINK-YFLUSD-LSLP': {
        address: '0x61401c19200B2420f93Bb2EECF4BAA2C193d76e1',
        totalSupply: 0,
        rewardRate: 0,
        rewardToken: 'SYFL',
      },
      'LINK-SYFL-LSLP': {
        address: '0x1b650B522b864f6BF61705A05cc89b2b0e23f9C6',
        totalSupply: 0,
        rewardRate: 0,
        rewardToken: 'SYFL',
      },
    };

    // loads contracts from deployments
    this.contracts = {};
    for (const [name, deployment] of Object.entries(deployments)) {
      this.contracts[name] = new Contract(deployment.address, deployment.abi, provider);
    }
    this.externalTokens = {};
    for (const [symbol, [address, decimal]] of Object.entries(externalTokens)) {
      this.externalTokens[symbol] = new ERC20(address, provider, symbol, decimal); // TODO: add decimal
    }
    this.YFLUSD = new ERC20(deployments.Cash.address, provider, 'YFLUSD');
    this.SYFL = new ERC20(deployments.Share.address, provider, 'sYFL');
    this.BYFL = new ERC20(deployments.Bond.address, provider, 'bYFL');

    // Linkswap Pair
    this.yflusdEth = new Contract(
      externalTokens['ETH-YFLUSD-LSLP'][0],
      ILinkswapPairABI,
      provider,
    );
    this.yflusdLink = new Contract(
      externalTokens['LINK-YFLUSD-LSLP'][0],
      ILinkswapPairABI,
      provider,
    );
    this.syflEth = new Contract(externalTokens['ETH-SYFL-LSLP'][0], ILinkswapPairABI, provider);
    this.syflLink = new Contract(
      externalTokens['LINK-SYFL-LSLP'][0],
      ILinkswapPairABI,
      provider,
    );

    this.config = cfg;
    this.provider = provider;

    this.getTokenPriceFromLinkswap([this.SYFL, this.syflEth]);
    this.getTokenPricesFromLinkswap();
    this.getPoolStats();

    this.getLPTokenPriceFromLinkswap(this.yflusdEth, 'yflusdEth');
    this.getLPTokenPriceFromLinkswap(this.yflusdLink, 'yflusdLink');
    this.getLPTokenPriceFromLinkswap(this.syflEth, 'syflEth');
    this.getLPTokenPriceFromLinkswap(this.syflLink, 'syflLink');
  }

  /**
   * @param provider From an unlocked wallet. (e.g. Metamask)
   * @param account An address of unlocked wallet account.
   */
  unlockWallet(provider: any, account: string) {
    const newProvider = new ethers.providers.Web3Provider(provider, this.config.chainId);

    this.signer = newProvider.getSigner(0);
    this.myAccount = account;
    for (const [name, contract] of Object.entries(this.contracts)) {
      this.contracts[name] = contract.connect(this.signer);
    }
    const tokens = [this.YFLUSD, this.SYFL, this.BYFL, ...Object.values(this.externalTokens)];
    for (const token of tokens) {
      token.connect(this.signer);
    }
    this.yflusdEth = this.yflusdEth.connect(this.signer);
    this.fetchBoardroomVersionOfUser()
      .then((version) => (this.boardroomVersionOfUser = version))
      .catch((err) => {
        console.error(`Failed to fetch boardroom version: ${err.stack}`);
        this.boardroomVersionOfUser = 'latest';
      });
  }

  get isUnlocked(): boolean {
    return !!this.myAccount;
  }

  gasOptions(gas: BigNumber): Overrides {
    const multiplied = Math.floor(gas.toNumber() * this.config.gasLimitMultiplier);
    return {
      gasLimit: BigNumber.from(multiplied),
    };
  }

  /**
   * @returns YFLUSD (YFLUSD) stats from Linkswap.
   * It may differ from the YFLUSD price used on Treasury (which is calculated in TWAP)
   */
  async getCashStatFromLinkswap(): Promise<TokenStat> {
    const supply = await this.YFLUSD.displayedTotalSupply();
    return {
      priceInWETH: await this.getTokenPriceFromLinkswap([this.YFLUSD, this.yflusdEth]),
      totalSupply: supply,
    };
  }

  /**
   * @returns Estimated YFLUSD (YFLUSD) price data,
   * calculated by 1-day Time-Weight Averaged Price (TWAP).
   */
  async getCashStatInEstimatedTWAP(): Promise<TokenStat> {
    const { Oracle, Treasury } = this.contracts;

    // estimate current TWAP price
    const number1e18 = BigNumber.from(10).pow(18);
    const number1e8 = BigNumber.from(10).pow(8);
    const expectedPriceInEth = BigNumber.from(
      await Oracle.expectedPrice(this.YFLUSD.address, number1e18),
    );
    const wethUsdPrice = BigNumber.from(
      await Treasury.getLinkswapPriceOracleUsdPrice(
        this.externalTokens['WETH'].address,
        number1e18,
      ),
    );
    const cashPriceTWAP = expectedPriceInEth.mul(wethUsdPrice).div(number1e8);

    const totalSupply = await this.YFLUSD.displayedTotalSupply();
    return {
      priceInWETH: getDisplayBalance(cashPriceTWAP),
      totalSupply,
    };
  }

  async getCashPriceInLastTWAP(): Promise<BigNumber> {
    const { Treasury } = this.contracts;
    return Treasury.getSeigniorageOraclePrice();
  }

  async getBondOraclePriceInLastTWAP(): Promise<BigNumber> {
    const { Treasury } = this.contracts;
    return Treasury.getBondOraclePrice();
  }

  async getBondStat(): Promise<TokenStat> {
    const decimals = BigNumber.from(10).pow(18);

    const cashPrice: BigNumber = await this.getBondOraclePriceInLastTWAP();
    const bondPrice = cashPrice.pow(2).div(decimals);

    return {
      priceInWETH: getDisplayBalance(bondPrice),
      totalSupply: await this.BYFL.displayedTotalSupply(),
    };
  }

  async getShareStat(): Promise<TokenStat> {
    return {
      priceInWETH: await this.getTokenPriceFromLinkswap([this.SYFL, this.syflEth]),
      totalSupply: await this.SYFL.displayedTotalSupply(),
    };
  }

  async getLPTokenPriceFromLinkswap(pairContract: Contract, symbol: string): Promise<boolean> {
    try {
      const [reserve0, reserve1] = await pairContract.getReserves();
      this.tokens[symbol].token0.amount = reserve0 / 1000000000000000000;
      this.tokens[symbol].token1.amount = reserve1 / 1000000000000000000;
      const supply = await pairContract.totalSupply();
      this.tokens[symbol].totalSupply = supply / 1000000000000000000;
      return true;
    } catch (err) {
      console.error(`Failed to fetch reserves: ${err}`);
    }
  }

  async getTokenPriceFromLinkswap([tokenContract, pairContract]: any[]): Promise<string> {
    try {
      const [reserve0, reserve1] = await pairContract.getReserves();
      const token0 = await pairContract.token0();
      const priceInEth =
        tokenContract.address === token0 ? reserve1 / reserve0 : reserve0 / reserve1;

      const response = await fetch(this.ethPriceAPI, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: '{"query":"{ bundles { ethPrice syflPrice yflusdPrice }}"}',
        method: 'POST',
      });
      let ethPrice = 0;
      if (response.ok) {
        const content = await response.json();
        ethPrice = content.data.bundles[0].ethPrice;
        this.tokens.ETH.usd = ethPrice;
        this.tokens.SYFL.usd = content.data.bundles[0].syflPrice;
        this.tokens.YFLUSD.usd = content.data.bundles[0].yflusdPrice;
      }
      const priceInUsd = Number(ethPrice) * Number(priceInEth);

      return priceInUsd.toFixed(2);
    } catch (err) {
      console.error(`Failed to fetch token price of ${tokenContract.symbol}: ${err}`);
    }
  }

  async getTokenPricesFromLinkswap(): Promise<boolean> {
    try {
      const response = await fetch(this.ethPriceAPI, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body:
          '{"query":"{ tokenDayDatas(orderBy: date, orderDirection: desc) { token {  symbol } priceUSD  }}","variables":null}',
        method: 'POST',
      });

      if (response.ok) {
        const content = await response.json();
        const tokenData = content.data.tokenDayDatas;
        tokenData.forEach((token: any) => {
          switch (token.token.symbol) {
            case 'BONK':
              this.tokens.BONK.usd = token.priceUSD;
              break;
            case 'DOKI':
              this.tokens.DOKI.usd = token.priceUSD;
              break;
            case 'LINK':
              this.tokens.LINK.usd = token.priceUSD;
              break;
            case 'MASQ':
              this.tokens.MASQ.usd = token.priceUSD;
              break;
            case 'YAX':
              this.tokens.SYAX.usd = token.priceUSD * 1.5;
              break;
            case 'YFL':
              this.tokens.YFL.usd = token.priceUSD;
              break;
          }
        });
      }
      return true;
    } catch (err) {
      console.error(`Failed to fetch token prices: ${err}`);
    }
  }

  async getPoolStats(): Promise<boolean> {
    const provider = getDefaultProvider();
    const _that = this;
    Object.keys(this.pools).forEach(function (key) {
      const contract: Contract = new Contract(_that.pools[key].address, POOLABI, provider);
      _that.poolStats(contract, key);
    });
    return true;
  }

  async poolStats(contract: Contract, symbol: string): Promise<boolean> {
    try {
      const supply = await contract.totalSupply();
      this.pools[symbol].totalSupply = getDisplayBalance(supply, 18, 0);
      const rewardRate = await contract.rewardRate();
      this.pools[symbol].rewardRate = (rewardRate / 1e18) * 86400 * 365;

      return true;
    } catch (err) {
      console.error(`Failed to fetch pool supply: ${err}`);
    }
  }

  /**
   * Buy bonds with cash.
   * @param amount amount of cash to purchase bonds with.
   */
  async buyBonds(amount: string | number): Promise<TransactionResponse> {
    const { Treasury } = this.contracts;
    return await Treasury.buyBonds(decimalToBalance(amount));
  }

  /**
   * Redeem bonds for cash.
   * @param amount amount of bonds to redeem.
   */
  async redeemBonds(amount: string): Promise<TransactionResponse> {
    const { Treasury } = this.contracts;
    return await Treasury.redeemBonds(decimalToBalance(amount));
  }

  async earnedFromBank(poolName: ContractName, account = this.myAccount): Promise<BigNumber> {
    const pool = this.contracts[poolName];
    try {
      return await pool.earned(account);
    } catch (err) {
      console.error(`Failed to call earned() on pool ${pool.address}: ${err.stack}`);
      return BigNumber.from(0);
    }
  }

  async stakedBalanceOnBank(
    poolName: ContractName,
    account = this.myAccount,
  ): Promise<BigNumber> {
    const pool = this.contracts[poolName];
    try {
      return await pool.balanceOf(account);
    } catch (err) {
      console.error(`Failed to call balanceOf() on pool ${pool.address}: ${err.stack}`);
      return BigNumber.from(0);
    }
  }

  /**
   * Deposits token to given pool.
   * @param poolName A name of pool contract.
   * @param amount Number of tokens with decimals applied. (e.g. 1.45 USDC * 10^18)
   * @returns {string} Transaction hash
   */
  async stake(poolName: ContractName, amount: BigNumber): Promise<TransactionResponse> {
    const pool = this.contracts[poolName];
    const gas = await pool.estimateGas.stake(amount);
    return await pool.stake(amount, this.gasOptions(gas));
  }

  /**
   * Withdraws token from given pool.
   * @param poolName A name of pool contract.
   * @param amount Number of tokens with decimals applied. (e.g. 1.45 USDC * 10^18)
   * @returns {string} Transaction hash
   */
  async unstake(poolName: ContractName, amount: BigNumber): Promise<TransactionResponse> {
    const pool = this.contracts[poolName];
    const gas = await pool.estimateGas.withdraw(amount);
    return await pool.withdraw(amount, this.gasOptions(gas));
  }

  /**
   * Transfers earned token reward from given pool to my account.
   */
  async harvest(poolName: ContractName): Promise<TransactionResponse> {
    const pool = this.contracts[poolName];
    const gas = await pool.estimateGas.getReward();
    return await pool.getReward(this.gasOptions(gas));
  }

  /**
   * Harvests and withdraws deposited tokens from the pool.
   */
  async exit(poolName: ContractName): Promise<TransactionResponse> {
    const pool = this.contracts[poolName];
    const gas = await pool.estimateGas.exit();
    return await pool.exit(this.gasOptions(gas));
  }

  async fetchBoardroomVersionOfUser(): Promise<string> {
    return 'latest';
  }

  boardroomByVersion(version: string): Contract {
    return this.contracts.Boardroom;
  }

  currentBoardroom(): Contract {
    if (!this.boardroomVersionOfUser) {
      throw new Error('you must unlock the wallet to continue.');
    }
    return this.boardroomByVersion(this.boardroomVersionOfUser);
  }

  isOldBoardroomMember(): boolean {
    return this.boardroomVersionOfUser !== 'latest';
  }

  async stakeShareToBoardroom(amount: string): Promise<TransactionResponse> {
    if (this.isOldBoardroomMember()) {
      throw new Error(
        "you're using old Boardroom. please withdraw and deposit the sYFL again.",
      );
    }
    const Boardroom = this.currentBoardroom();
    return await Boardroom.stake(decimalToBalance(amount));
  }

  async getStakedSharesOnBoardroom(): Promise<BigNumber> {
    const Boardroom = this.currentBoardroom();
    if (this.boardroomVersionOfUser === 'v1') {
      return await Boardroom.getShareOf(this.myAccount);
    }
    return await Boardroom.balanceOf(this.myAccount);
  }

  async getEarningsOnBoardroom(): Promise<BigNumber> {
    const Boardroom = this.currentBoardroom();
    if (this.boardroomVersionOfUser === 'v1') {
      return await Boardroom.getCashEarningsOf(this.myAccount);
    }
    return await Boardroom.earned(this.myAccount);
  }

  async withdrawShareFromBoardroom(amount: string): Promise<TransactionResponse> {
    const Boardroom = this.currentBoardroom();
    return await Boardroom.withdraw(decimalToBalance(amount));
  }

  async harvestCashFromBoardroom(): Promise<TransactionResponse> {
    const Boardroom = this.currentBoardroom();
    if (this.boardroomVersionOfUser === 'v1') {
      return await Boardroom.claimDividends();
    }
    return await Boardroom.claimReward();
  }

  async exitFromBoardroom(): Promise<TransactionResponse> {
    const Boardroom = this.currentBoardroom();
    return await Boardroom.exit();
  }

  async getTreasuryNextAllocationTime(): Promise<TreasuryAllocationTime> {
    const { Treasury } = this.contracts;
    const nextEpochTimestamp: BigNumber = await Treasury.nextEpochPoint();
    const period: BigNumber = await Treasury.getPeriod();

    const nextAllocation = new Date(nextEpochTimestamp.mul(1000).toNumber());
    const prevAllocation = new Date(nextAllocation.getTime() - period.toNumber() * 1000);
    return { prevAllocation, nextAllocation };
  }
}
