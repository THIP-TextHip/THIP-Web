import { css } from '@emotion/react';

// Core Color Palette
export const colors = {
  // Purple System
  purple: {
    main: '#6868FF',
    sub: '#A1A1FF',
    dark: '#414194',
  },

  // Character Colors
  character: {
    pink: '#FF8BAC',
    pinkSub: '#FB5A88',
    mint: '#A0F8E8',
    mintSub: '#4FD9C0',
    orange: '#FDB770',
    orangeSub: '#FF8B17',
    skyblue: '#A1D5FF',
    skyblueSub: '#6DB5EE',
    lavender: '#C8A5FF',
    lavenderSub: '#A76FFF',
  },

  // Accent Colors
  neongreen: '#A7FFB4',
  neongreen50: 'rgba(167, 255, 180, 0.5)',
  red: '#FF9496',
  kakaoyellow: '#FEE500',

  // Grayscale System
  white: '#FEFEFE',
  grey: {
    50: 'rgba(196, 196, 196, 0.5)',
    100: '#DADADA',
    200: '#ADADAD',
    300: '#888888',
    400: '#525252',
  },
  darkgrey: {
    main: '#3D3D3D',
    50: 'rgba(61, 61, 61, 0.5)',
    dark: '#282828',
  },
  black: {
    main: '#121212',
    50: 'rgba(18, 18, 18, 0.5)',
    30: 'rgba(18, 18, 18, 0.3)',
    10: 'rgba(18, 18, 18, 0.1)',
    0: 'rgba(18, 18, 18, 0)',
  },
};

// Typography System - Core Only
export const typography = {
  fontFamily: {
    primary: 'Pretendard Variable',
    secondary: 'Paperlogy',
  },
  fontSize: {
    '2xs': '11px',
    xs: '12px', // small text
    sm: '14px', // body small
    base: '16px', // body base
    lg: '18px', // body large
    xl: '20px', // heading small
    '2xl': '22px', // heading large
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
};

// Semantic Color Tokens for easy usage
export const semanticColors = {
  // Text Colors
  text: {
    primary: colors.white,
    secondary: colors.grey[100],
    tertiary: colors.grey[200],
    ghost: colors.grey[300],
    onlightPrimary: colors.black.main,
    onlightSecondary: colors.darkgrey.dark,
    point: {
      purple: colors.purple.main,
      subpurple: colors.purple.sub,
      green: colors.neongreen,
    },
    warning: colors.red,
    character: {
      mint: colors.character.mint,
      pink: colors.character.pink,
      orange: colors.character.orange,
      skyblue: colors.character.skyblue,
      lavender: colors.character.lavender,
    },
  },

  // Character Theme Colors
  character: {
    art: {
      primary: colors.character.pink,
      secondary: colors.character.pinkSub,
    },
    literature: {
      primary: colors.character.mint,
      secondary: colors.character.mintSub,
    },
    sociology: {
      primary: colors.character.orange,
      secondary: colors.character.orangeSub,
    },
    humanities: {
      primary: colors.character.skyblue,
      secondary: colors.character.skyblueSub,
    },
    science: {
      primary: colors.character.lavender,
      secondary: colors.character.lavenderSub,
    },
  },

  // Button Colors
  button: {
    fill: {
      primary: colors.purple.main,
      background: colors.purple.dark,
      pointNeongreen: colors.neongreen,
      kakaoyellow: colors.kakaoyellow,
      white: colors.white,
      black: colors.black.main,
    },
    line: {
      primary: colors.purple.main,
      warning: colors.red,
      pointNeongreen: colors.neongreen,
      white: colors.white,
      black: colors.black.main,
    },
  },

  // Background Colors
  background: {
    primary: colors.black.main,
    card: colors.darkgrey.main,
    cardDark: colors.darkgrey.dark,
  },
};

// CSS Variables for Core Design Tokens Only
export const coreDesignTokens = css`
  :root {
    /* Core Colors */
    --color-purple-main: ${colors.purple.main};
    --color-purple-sub: ${colors.purple.sub};
    --color-purple-dark: ${colors.purple.dark};

    --color-neongreen: ${colors.neongreen};
    --color-red: ${colors.red};
    --color-kakaoyellow: ${colors.kakaoyellow};

    /* Character Colors */
    --color-character-pink: ${colors.character.pink};
    --color-character-mint: ${colors.character.mint};
    --color-character-orange: ${colors.character.orange};
    --color-character-skyblue: ${colors.character.skyblue};
    --color-character-lavender: ${colors.character.lavender};

    /* Grayscale */
    --color-white: ${colors.white};
    --color-grey-100: ${colors.grey[100]};
    --color-grey-200: ${colors.grey[200]};
    --color-grey-300: ${colors.grey[300]};
    --color-darkgrey-main: ${colors.darkgrey.main};
    --color-darkgrey-dark: ${colors.darkgrey.dark};
    --color-black-main: ${colors.black.main};

    /* Typography */
    --font-family-primary: ${typography.fontFamily.primary};
    --font-family-secondary: ${typography.fontFamily.secondary};

    --font-size-2xs: ${typography.fontSize['2xs']};
    --font-size-xs: ${typography.fontSize.xs};
    --font-size-sm: ${typography.fontSize.sm};
    --font-size-base: ${typography.fontSize.base};
    --font-size-lg: ${typography.fontSize.lg};
    --font-size-xl: ${typography.fontSize.xl};
    --font-size-2xl: ${typography.fontSize['2xl']};

    --font-weight-regular: ${typography.fontWeight.regular};
    --font-weight-medium: ${typography.fontWeight.medium};
    --font-weight-semibold: ${typography.fontWeight.semibold};
    --font-weight-bold: ${typography.fontWeight.bold};
    --font-weight-extrabold: ${typography.fontWeight.extrabold};
  }
`;

export const globalStyles = css`
  * {
    font-family: ${typography.fontFamily.primary};
    font-style: normal;
    box-sizing: border-box;
  }

  /* Input 요소 전역 스타일 */
  input {
    caret-color: ${colors.neongreen};
  }

  ${coreDesignTokens}
`;

// Usage example:
/*
// In your components, use like this:

const StyledButton = styled.button`
  // Use core colors from the system
  background-color: ${semanticColors.button.fill.primary};
  color: ${semanticColors.text.primary};
  
  // Use core typography
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.medium};
  
  // Use custom spacing and other properties
  padding: 12px 24px;
  margin: 8px 0;
  border-radius: 8px;
  border: none;
`;

const StyledHeading = styled.h1`
  color: ${semanticColors.text.primary};
  font-size: ${typography.fontSize['2xl']};
  font-weight: ${typography.fontWeight.bold};
  margin-bottom: 16px; // Custom spacing
`;
*/
