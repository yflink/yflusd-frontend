import { BigNumber } from 'ethers';

export const getDisplayBalance = (balance: BigNumber, decimals = 18, fractionDigits = 3) => {
  const number = getBalance(balance, decimals - fractionDigits);
  return (number / 10 ** fractionDigits).toFixed(fractionDigits);
};

export const getFullDisplayBalance = (balance: BigNumber, decimals = 18) => {
  return getDisplayBalance(balance, decimals);
};

export function getBalance(balance: BigNumber, decimals = 18): number {
  return balance.div(BigNumber.from(10).pow(decimals)).toNumber();
}

export default function hexStringToNumber(
  hex: string,
  decimals: number,
  toFixed?: number,
  daily?: boolean,
): number {
  const returnNumber = daily
    ? (Number(hex) / Math.pow(10, decimals)) * 86400
    : Number(hex) / Math.pow(10, decimals);
  return toFixed ? parseFloat(returnNumber.toFixed(toFixed)) : returnNumber;
}
