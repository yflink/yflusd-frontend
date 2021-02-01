import { ChainId } from '@uniswap/sdk';
import { Configuration } from './yflusd/config';
import { BankInfo } from './yflusd';

const configurations: { [env: string]: Configuration } = {
  development: {
    chainId: ChainId.MAINNET,
    etherscanUrl: 'https://etherscan.io',
    ethPriceAPI: 'https://api.thegraph.com/subgraphs/name/yflink/linkswap-v1',
    defaultProvider: 'https://mainnet.infura.io/v3/4ce8cf77cb314506a8ab61ce59521079',
    deployments: require('./yflusd/deployments/deployments.mainnet.json'),
    externalTokens: {
      WETH: ['0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', 18],
      YFL: ['0x28cb7e841ee97947a86b06fa4090c8451f64c0be', 18],
      LINK: ['0x514910771AF9Ca656af840dff83E8264EcF986CA', 18],
      BONK: ['0x6d6506e6f438ede269877a0a720026559110b7d5', 18],
      MASQ: ['0x06f3c323f0238c72bf35011071f2b5b7f43a054c', 18],
      DOKI: ['0x9cEB84f92A0561fa3Cc4132aB9c0b76A59787544', 18],
      SYAX: ['0xef31cb88048416e301fee1ea13e7664b887ba7e8', 18],
      'ETH-YFLUSD-LSLP': ['0x195734d862DFb5380eeDa0ACD8acf697eA95D370', 18],
      'ETH-SYFL-LSLP': ['0x3315351F0B20595777a28054EF3d514bdC37463d', 18],
      'LINK-YFLUSD-LSLP': ['0x6cD7817e6f3f52123df529E1eDF5830240Ce48c1', 18],
      'LINK-SYFL-LSLP': ['0x74C89f297b1dC87F927d9432a4eeea697E6f89a5', 18],
    },
    baseLaunchDate: new Date('2021-02-01T20:00:00Z'),
    bondLaunchesAt: new Date('2021-02-04T00:00:00Z'),
    boardroomLaunchesAt: new Date('2021-02-04T00:00:00Z'),
    refreshInterval: 30000,
    gasLimitMultiplier: 1.7,
  },
  production: {
    chainId: ChainId.MAINNET,
    etherscanUrl: 'https://etherscan.io',
    ethPriceAPI: 'https://api.thegraph.com/subgraphs/name/yflink/linkswap-v1',
    defaultProvider: 'https://mainnet.infura.io/v3/4ce8cf77cb314506a8ab61ce59521079',
    deployments: require('./yflusd/deployments/deployments.mainnet.json'),
    externalTokens: {
      WETH: ['0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', 18],
      YFL: ['0x28cb7e841ee97947a86b06fa4090c8451f64c0be', 18],
      LINK: ['0x514910771AF9Ca656af840dff83E8264EcF986CA', 18],
      BONK: ['0x6d6506e6f438ede269877a0a720026559110b7d5', 18],
      MASQ: ['0x06f3c323f0238c72bf35011071f2b5b7f43a054c', 18],
      DOKI: ['0x9cEB84f92A0561fa3Cc4132aB9c0b76A59787544', 18],
      SYAX: ['0xef31cb88048416e301fee1ea13e7664b887ba7e8', 18],
      'ETH-YFLUSD-LSLP': ['0x195734d862DFb5380eeDa0ACD8acf697eA95D370', 18],
      'ETH-SYFL-LSLP': ['0x3315351F0B20595777a28054EF3d514bdC37463d', 18],
      'LINK-YFLUSD-LSLP': ['0x6cD7817e6f3f52123df529E1eDF5830240Ce48c1', 18],
      'LINK-SYFL-LSLP': ['0x74C89f297b1dC87F927d9432a4eeea697E6f89a5', 18],
    },
    baseLaunchDate: new Date('2021-02-01T20:00:00Z'),
    bondLaunchesAt: new Date('2021-02-04T00:00:00Z'),
    boardroomLaunchesAt: new Date('2021-02-04T00:00:00Z'),
    refreshInterval: 30000,
    gasLimitMultiplier: 1.7,
  },
};

export const bankDefinitions: { [contractName: string]: BankInfo } = {
  YFLUSDYFLPool: {
    name: 'Earn YFLUSD with YFL',
    contract: 'YFLUSDYFLPool',
    depositTokenName: 'YFL',
    earnTokenName: 'YFLUSD',
    finished: false,
    sort: 5,
  },
  YFLUSDLINKPool: {
    name: 'Earn YFLUSD with LINK',
    contract: 'YFLUSDLINKPool',
    depositTokenName: 'LINK',
    earnTokenName: 'YFLUSD',
    finished: false,
    sort: 6,
  },
  YFLUSDMASQPool: {
    name: 'Earn YFLUSD with MASQ',
    contract: 'YFLUSDMASQPool',
    depositTokenName: 'MASQ',
    earnTokenName: 'YFLUSD',
    finished: false,
    sort: 7,
  },
  YFLUSDBONKPool: {
    name: 'Earn YFLUSD with BONK',
    contract: 'YFLUSDBONKPool',
    depositTokenName: 'BONK',
    earnTokenName: 'YFLUSD',
    finished: false,
    sort: 8,
  },
  YFLUSDDOKIPool: {
    name: 'Earn YFLUSD with DOKI',
    contract: 'YFLUSDDOKIPool',
    depositTokenName: 'DOKI',
    earnTokenName: 'YFLUSD',
    finished: false,
    sort: 9,
  },
  YFLUSDSYAXPool: {
    name: 'Earn YFLUSD with sYAX',
    contract: 'YFLUSDSYAXPool',
    depositTokenName: 'SYAX',
    earnTokenName: 'YFLUSD',
    finished: false,
    sort: 10,
  },
  ETHYFLUSDLPTokenSharePool: {
    name: 'Earn sYFL with YFLUSD-ETH LSLP',
    contract: 'ETHYFLUSDLPTokenSharePool',
    depositTokenName: 'ETH-YFLUSD-LSLP',
    earnTokenName: 'SYFL',
    finished: false,
    sort: 1,
  },
  ETHSYFLLPTokenSharePool: {
    name: 'Earn sYFL with sYFL-ETH LSLP',
    contract: 'ETHSYFLLPTokenSharePool',
    depositTokenName: 'ETH-SYFL-LSLP',
    earnTokenName: 'SYFL',
    finished: false,
    sort: 3,
  },
  LINKYFLUSDLPTokenSharePool: {
    name: 'Earn sYFL with YFLUSD-LINK LSLP',
    contract: 'LINKYFLUSDLPTokenSharePool',
    depositTokenName: 'LINK-YFLUSD-LSLP',
    earnTokenName: 'SYFL',
    finished: false,
    sort: 2,
  },
  LINKSYFLLPTokenSharePool: {
    name: 'Earn sYFL with SYFL-LINK LSLP',
    contract: 'LINKSYFLLPTokenSharePool',
    depositTokenName: 'LINK-SYFL-LSLP',
    earnTokenName: 'SYFL',
    finished: false,
    sort: 4,
  },
};

export default configurations[process.env.NODE_ENV || 'production'];
