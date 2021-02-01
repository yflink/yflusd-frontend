import React, { useContext, useMemo } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { Link } from 'react-router-dom';

interface ButtonProps {
  children?: React.ReactNode;
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  to?: string;
  target?: '_blank' | '_self';
  variant?: 'default' | 'secondary' | 'tertiary' | 'inline';
}

const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  href,
  onClick,
  size,
  text,
  to,
  variant,
  target,
}) => {
  const { color } = useContext(ThemeContext);

  let buttonColor: string;
  let buttonColorHover: string;
  let textColor: string;
  let textColorHover: string;
  let width: string;
  switch (variant) {
    case 'secondary':
      buttonColor = color.infoBG;
      buttonColorHover = color.infoBGHover;
      textColor = color.infoText;
      textColorHover = color.infoTextHover;
      width = '100%';
      break;
    case 'inline':
      buttonColor = color.mainColor;
      buttonColorHover = color.mainColorHover;
      textColor = color.mainTextColor;
      textColorHover = color.mainTextColor;
      width = 'auto';
      break;
    case 'default':
    default:
      buttonColor = color.mainColor;
      buttonColorHover = color.mainColorHover;
      textColor = color.mainTextColor;
      textColorHover = color.mainTextColor;
      width = '100%';
  }

  let buttonSize: number;
  let buttonPadding: string;
  let fontSize: string;
  switch (size) {
    case 'sm':
      buttonPadding = '0.5rem';
      buttonSize = 37;
      fontSize = '1rem';
      break;
    case 'lg':
      buttonPadding = '0.5rem';
      buttonSize = 37;
      fontSize = '20px';
      break;
    case 'md':
    default:
      buttonPadding = '0.5rem';
      buttonSize = 37;
      fontSize = '17px';
  }

  const ButtonChild = useMemo(() => {
    if (to) {
      return <StyledLink to={to}>{text}</StyledLink>;
    } else if (href) {
      return (
        <StyledExternalLink href={href} target={target ? target : '_blank'}>
          {text}
        </StyledExternalLink>
      );
    } else {
      return text;
    }
  }, [href, text, to, target]);

  return (
    <StyledButton
      width={width}
      color={buttonColor}
      colorHover={buttonColorHover}
      textColor={textColor}
      textColorHover={textColorHover}
      disabled={disabled}
      fontSize={fontSize}
      onClick={onClick}
      padding={buttonPadding}
      size={buttonSize}
    >
      {children}
      {ButtonChild}
    </StyledButton>
  );
};

interface StyledButtonProps {
  width: string;
  color: string;
  colorHover: string;
  disabled?: boolean;
  fontSize: string;
  padding: string;
  size: number;
  textColor: string;
  textColorHover: string;
}

const StyledButton = styled.button<StyledButtonProps>`
  align-items: center;
  background-color: ${(props) =>
    !props.disabled ? props.color : props.theme.color.textTertiary};
  border: 1px solid
    ${(props) => (!props.disabled ? props.color : props.theme.color.textTertiary)};
  border-radius: 6px;
  color: ${(props) => (!props.disabled ? props.textColor : props.theme.color.mainTextColor)};
  cursor: pointer;
  display: flex;
  font-size: ${(props) => props.fontSize};
  font-weight: 500;
  height: ${(props) => props.size}px;
  justify-content: center;
  outline: none;
  padding: ${(props) => props.padding};
  pointer-events: ${(props) => (!props.disabled ? undefined : 'none')};
  width: ${(props) => props.width};
  &:hover {
    background-color: ${(props) => props.colorHover};
    border: 1px solid ${(props) => props.colorHover};
    color: ${(props) => props.theme.color.textColorHover};
  }
`;

const StyledLink = styled(Link)`
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

export default Button;
