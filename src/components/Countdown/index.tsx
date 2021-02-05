import React from 'react';
import moment from 'moment';
import 'moment-duration-format';
import { useCountdown } from './useCountdown';
import styled from 'styled-components';

interface CountdownProps {
  ends: number;
  format: string;
}
export default function Countdown({ ends, format }: CountdownProps) {
  const remaining = useCountdown(ends);
  const duration = moment.duration(remaining, 'seconds');
  // @ts-ignore
  const options: moment.DurationFormatSettings = {
    forceLength: false,
    precision: 0,
    template: format,
    trim: false,
  };

  // @ts-ignore
  let display = ends === 0 ? 'not started' : `Ends in: ${duration.format(format, 0, options)}`;
  display = !!remaining && remaining >= 0 ? display : 'Rewards distribution has ended.';
  return <CountDownIndicator>{display}</CountDownIndicator>;
}

const CountDownIndicator = styled.div`
  margin: 15px 0 0;
  font-size: 15px;
  color: ${(props) => props.theme.color.grey[600]};
`;
