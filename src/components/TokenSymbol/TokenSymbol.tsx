import React from 'react';

import yflUsdLogo from '../../assets/img/yflusd.svg';
import sYflLogo from '../../assets/img/syfl.svg';
import bYflLogo from '../../assets/img/byfl.svg';
import bonkLogo from '../../assets/img/bonk.png';
import dokiLogo from '../../assets/img/doki.png';
import linkLogo from '../../assets/img/link.png';
import masqLogo from '../../assets/img/masq.png';
import syaxLogo from '../../assets/img/yax.png';
import yflLogo from '../../assets/img/yfl.svg';
import ethLogo from '../../assets/img/eth.png';
import yflUsdEthLogo from '../../assets/img/yflusd-eth.png';
import sYflEthLogo from '../../assets/img/syfl-eth.png';
import yflUsdLinkLogo from '../../assets/img/yflusd-link.png';
import sYflLinkLogo from '../../assets/img/syfl-link.png';

const logosBySymbol: { [title: string]: string } = {
  YFLUSD: yflUsdLogo,
  bYFL: bYflLogo,
  sYFL: sYflLogo,
  BONK: bonkLogo,
  DOKI: dokiLogo,
  LINK: linkLogo,
  MASQ: masqLogo,
  SYAX: syaxLogo,
  YFL: yflLogo,
  ETH: ethLogo,
  'ETH-YFLUSD-LSLP': yflUsdEthLogo,
  'ETH-SYFL-LSLP': sYflEthLogo,
  'LINK-YFLUSD-LSLP': yflUsdLinkLogo,
  'LINK-SYFL-LSLP': sYflLinkLogo,
};

type YflLogoProps = {
  symbol: string;
  size?: number;
  pair?: boolean;
};

const TokenSymbol: React.FC<YflLogoProps> = ({ symbol, size = 76, pair }) => {
  if (!logosBySymbol[symbol]) {
    throw new Error(`Invalid YflLogo symbol: ${symbol}`);
  }
  return (
    <img
      src={logosBySymbol[symbol]}
      alt={`${symbol} Logo`}
      width={pair ? 'auto' : size}
      height={size}
    />
  );
};

export default TokenSymbol;
