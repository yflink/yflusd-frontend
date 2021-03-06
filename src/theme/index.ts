import {
  black,
  blue,
  teal,
  grey,
  white,
  mainColor,
  mainColorHover,
  appBG,
  bodyBGColor,
  mainTextColor,
  buttonBG,
  buttonBGHover,
  buttonSecondaryBG,
  modalBG,
  infoText,
  infoTextHover,
  infoBG,
  infoBGHover,
  textSecondary,
  textTertiary,
  textDisabled,
  red1,
  red2,
  green1,
  yellow1,
  yellow,
} from './colors';

const theme = {
  borderRadius: 12,
  color: {
    black,
    grey,
    blue,
    mainColor,
    mainColorHover,
    appBG,
    bodyBGColor,
    mainTextColor,
    buttonBG,
    buttonBGHover,
    buttonSecondaryBG,
    modalBG,
    infoText,
    infoTextHover,
    infoBG,
    infoBGHover,
    textSecondary,
    textTertiary,
    textDisabled,
    red1,
    red2,
    green1,
    yellow1,
    yellow,
    primary: {
      light: blue[200],
      main: blue[400],
    },
    secondary: {
      main: teal[200],
    },
    white,
    teal,
  },
  siteWidth: '100%',
  spacing: {
    1: 4,
    2: 8,
    3: 16,
    4: 24,
    5: 32,
    6: 48,
    7: 64,
  },
  topBarSize: 72,
};

export default theme;
