import React from 'react';
import styled from 'styled-components';
import config from '../../config';
import Dial from '../Dial';
import Countdown, { CountdownRenderProps } from 'react-countdown';

interface LaunchCountdownProps {
  deadline: Date;
  description: string;
  descriptionLink: string;
}

const LaunchCountdown: React.FC<LaunchCountdownProps> = ({
  deadline,
  description,
  descriptionLink,
}) => {
  const percentage =
    ((Date.now() - config.baseLaunchDate.getTime()) /
      (deadline.getTime() - config.baseLaunchDate.getTime())) *
    100;

  const countdownRenderer = (countdownProps: CountdownRenderProps) => {
    const { days, hours, minutes, seconds } = countdownProps;
    const h = String(days * 24 + hours);
    const m = String(minutes);
    const s = String(seconds);
    return (
      <StyledCountdown>
        {h.padStart(2, '0')}:{m.padStart(2, '0')}:{s.padStart(2, '0')}
      </StyledCountdown>
    );
  };
  return (
    <StyledCard>
      <Dial value={percentage}>
        <StyledCountdownWrapper>
          <StyledCountdownTitle>Starting In...</StyledCountdownTitle>
          <Countdown date={deadline} renderer={countdownRenderer} />
        </StyledCountdownWrapper>
      </Dial>
      <StyledDescriptionButton>
        <StyledExternalLink href={descriptionLink} target="_blank">
          {description}
        </StyledExternalLink>
      </StyledDescriptionButton>
    </StyledCard>
  );
};

const StyledCard = styled.div`
  width: 420px;
  max-width: 100vw;
  background-color: ${(props) => props.theme.color.appBG};
  box-sizing: border-box;
  padding: 16px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const StyledCountdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledCountdownTitle = styled.p`
  font-size: 20px;
  color: color: ${(props) => props.theme.color.textTertiary};
  margin: 0;
`;

const StyledCountdown = styled.p`
  font-size: 30px;
  color: ${(props) => props.theme.color.textSecondary};
  margin: 0;
`;

const StyledDescriptionButton = styled.button`
  background-color: ${(props) => props.theme.color.infoBG};
  align-items: center;
  border: 0;
  border-radius: 6px;
  margin-top: 32px;
  color: ${(props) => props.theme.color.infoText};
  cursor: pointer;
  display: flex;
  font-size: 16px;
  font-family: 'Formular Thin', sans-serif;
  justify-content: center;
  outline: none;
  padding-left: 16px;
  padding-right: 16px;
  width: 100%;
  &:hover {
    background-color: ${(props) => props.theme.color.infoBGHover};
    color: ${(props) => props.theme.color.infoTextHover};
  }
`;

const StyledExternalLink = styled.a`
  align-items: center;
  color: inherit;
  display: flex;
  flex: 1;
  height: 56px;
  justify-content: center;
  margin: 0 ${(props) => -props.theme.spacing[4]}px;
  padding: 0 ${(props) => props.theme.spacing[4]}px;
  text-decoration: none;
`;

export default LaunchCountdown;
