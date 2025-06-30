import { css } from '@emotion/react';

// Primary Color Palette (Base Colors)
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
    50: 'rgba(196, 196, 196, 0.5)', // grey 50%
    100: '#DADADA', // grey00
    200: '#ADADAD', // grey01
    300: '#888888', // grey02
    400: '#525252', // grey03
  },
  darkgrey: {
    main: '#3D3D3D',
    50: 'rgba(61, 61, 61, 0.5)', // darkgrey 50%
    dark: '#282828', // darkgrey02
  },
  black: {
    main: '#121212',
    50: 'rgba(18, 18, 18, 0.5)', // black 50%
    30: 'rgba(18, 18, 18, 0.3)', // black 30%
    10: 'rgba(18, 18, 18, 0.1)', // black 10%
    0: 'rgba(18, 18, 18, 0)', // black 0%
  },
};

// Spacing System
export const spacing = {
  gap: {
    2: '2px',
    4: '4px',
    8: '8px',
    12: '12px',
    16: '16px',
    20: '20px',
    24: '24px',
    32: '32px',
    40: '40px',
  },
  padding: {
    4: '4px',
    8: '8px',
    10: '10px',
    12: '12px',
    16: '16px',
    20: '20px',
    30: '30px',
  },
  margin: {
    20: '20px',
    32: '32px',
    40: '40px',
  },
};

// Border Radius System
export const radius = {
  small: '8px', // button_8
  medium: '12px', // button (default)
  large: '20px', // button_smallR
  xlarge: '40px', // button_bigR
};

// Typography System
export const typography = {
  fontFamily: {
    primary: 'Pretendard Variable',
    secondary: 'Paperlogy',
  },
  fontSize: {
    small01: '10px',
    small02: '11px',
    small03: '12px',
    medium01: '14px',
    medium02: '16px',
    large01: '18px',
    large02: '20px',
    large03: '22px',
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  lineHeight: {
    tight: '20px', // height20
    normal: '22px', // height22
    loose: '24px', // height24
  },
};

// Breakpoints
export const breakpoints = {
  mobile: {
    min: '320px',
    standard: '360px',
    max: '767px',
  },
  tablet: '768px',
};

// Semantic Color Tokens (Usage-based)
export const semanticColors = {
  // Text Colors
  text: {
    primary: colors.white, // primary_white
    secondary: colors.grey[100], // secondary_grey00
    tertiary: colors.grey[200], // tertiary_grey01
    ghost: colors.grey[300], // ghost_grey02
    onlightPrimary: colors.black.main, // primary_onlight_black
    onlightSecondary: colors.darkgrey.dark, // secondary_onlight_darkgrey02
    point: {
      purple: colors.purple.main, // point_purple
      subpurple: colors.purple.sub, // point_subpurple
      green: colors.neongreen, // point_green
    },
    warning: colors.red, // warning_red
    character: {
      mint: colors.character.mint, // literature_mint
      pink: colors.character.pink, // art_pink
      orange: colors.character.orange, // sociology_orange
      skyblue: colors.character.skyblue, // humanities_skyblue
      lavender: colors.character.lavender, // science_lavender
    },
  },

  // Character Theme Colors
  character: {
    art: {
      primary: colors.character.pink, // art_pink_sub
      secondary: colors.character.pinkSub,
    },
    literature: {
      primary: colors.character.mint, // literature_mint_sub
      secondary: colors.character.mintSub,
    },
    sociology: {
      primary: colors.character.orange, // sociology_orange_sub
      secondary: colors.character.orangeSub,
    },
    humanities: {
      primary: colors.character.skyblue, // humanities_skyblue_sub
      secondary: colors.character.skyblueSub,
    },
    science: {
      primary: colors.character.lavender, // science_lavender_sub
      secondary: colors.character.lavenderSub,
    },
  },

  // Button Colors
  button: {
    // Fill Colors
    fill: {
      primary: colors.purple.main, // button_primary
      background: colors.purple.dark, // button_background
      pointNeongreen: colors.neongreen, // button_point_neongreen
      kakaoyellow: colors.kakaoyellow, // button_kakaologin_yellow
      secondaryGrey02: colors.grey[300], // button_secondary_grey02
      secondaryGrey03: colors.grey[400], // button_secondary_grey03
      tertiaryDark01: colors.darkgrey.main, // button_fill_tertiary01_darkgrey
      tertiaryDark02: colors.darkgrey.dark, // button_fill_tertiary02_darkgrey02
      ghostDarkgrey: colors.darkgrey[50], // button_fill_ghost_darkgrey50%
      white: colors.white, // button_fill_white
      black: colors.black.main, // button_fill_black
    },

    // Line Colors
    line: {
      primary: colors.purple.main, // button_line_primary_purple
      warning: colors.red, // button_line_warning_red
      pointNeongreen: colors.neongreen, // button_line_point_neongreen
      pointNeongreen50: colors.neongreen50, // button_line_point_50%neongreen
      tertiaryDark: colors.darkgrey.main, // button_line_tertiary_darkgrey
      grey02: colors.grey[300], // button_line_grey02
      lightgrey01: colors.grey[200], // button_line_lightgrey01
      white: colors.white, // button_line_white
      black: colors.black.main, // button_line_black
    },
  },

  // View/Background Colors
  view: {
    cardBackground: {
      dark02: colors.darkgrey.dark, // card_background_darkgrey02
      dark: colors.darkgrey.main, // card_background_darkgrey
      grey03: colors.grey[400], // card_background_grey03
      grey02: colors.grey[300], // card_background_grey02
    },
    viewfieldBackground: colors.black.main, // viewfield_background_black
    blur: {
      comment: {
        black10: colors.black[10], // blur_comment_black10%
        black30: colors.black[30], // blur_comment_black30%
      },
      linear: colors.black[0], // blur_linear_black0%
    },
  },
};

// CSS Variables for Design Tokens
export const designTokens = css`
  :root {
    /* Base Colors */
    --color-purple-main: ${colors.purple.main};
    --color-purple-sub: ${colors.purple.sub};
    --color-purple-dark: ${colors.purple.dark};

    --color-neongreen: ${colors.neongreen};
    --color-neongreen-50: ${colors.neongreen50};
    --color-red: ${colors.red};
    --color-kakaoyellow: ${colors.kakaoyellow};

    /* Character Colors */
    --color-character-pink: ${colors.character.pink};
    --color-character-pink-sub: ${colors.character.pinkSub};
    --color-character-mint: ${colors.character.mint};
    --color-character-mint-sub: ${colors.character.mintSub};
    --color-character-orange: ${colors.character.orange};
    --color-character-orange-sub: ${colors.character.orangeSub};
    --color-character-skyblue: ${colors.character.skyblue};
    --color-character-skyblue-sub: ${colors.character.skyblueSub};
    --color-character-lavender: ${colors.character.lavender};
    --color-character-lavender-sub: ${colors.character.lavenderSub};

    /* Grayscale */
    --color-white: ${colors.white};
    --color-grey-50: ${colors.grey[50]};
    --color-grey-100: ${colors.grey[100]};
    --color-grey-200: ${colors.grey[200]};
    --color-grey-300: ${colors.grey[300]};
    --color-grey-400: ${colors.grey[400]};
    --color-darkgrey-main: ${colors.darkgrey.main};
    --color-darkgrey-50: ${colors.darkgrey[50]};
    --color-darkgrey-dark: ${colors.darkgrey.dark};
    --color-black-main: ${colors.black.main};
    --color-black-50: ${colors.black[50]};
    --color-black-30: ${colors.black[30]};
    --color-black-10: ${colors.black[10]};
    --color-black-0: ${colors.black[0]};

    /* Semantic Text Colors */
    --color-text-primary: ${semanticColors.text.primary};
    --color-text-secondary: ${semanticColors.text.secondary};
    --color-text-tertiary: ${semanticColors.text.tertiary};
    --color-text-ghost: ${semanticColors.text.ghost};
    --color-text-onlight-primary: ${semanticColors.text.onlightPrimary};
    --color-text-onlight-secondary: ${semanticColors.text.onlightSecondary};
    --color-text-point-purple: ${semanticColors.text.point.purple};
    --color-text-point-subpurple: ${semanticColors.text.point.subpurple};
    --color-text-point-green: ${semanticColors.text.point.green};
    --color-text-warning: ${semanticColors.text.warning};

    /* Button Colors */
    --color-button-fill-primary: ${semanticColors.button.fill.primary};
    --color-button-fill-background: ${semanticColors.button.fill.background};
    --color-button-fill-white: ${semanticColors.button.fill.white};
    --color-button-fill-black: ${semanticColors.button.fill.black};
    --color-button-line-primary: ${semanticColors.button.line.primary};
    --color-button-line-warning: ${semanticColors.button.line.warning};
    --color-button-line-white: ${semanticColors.button.line.white};
    --color-button-line-black: ${semanticColors.button.line.black};

    /* Spacing */
    --spacing-gap-2: ${spacing.gap[2]};
    --spacing-gap-4: ${spacing.gap[4]};
    --spacing-gap-8: ${spacing.gap[8]};
    --spacing-gap-12: ${spacing.gap[12]};
    --spacing-gap-16: ${spacing.gap[16]};
    --spacing-gap-20: ${spacing.gap[20]};
    --spacing-gap-24: ${spacing.gap[24]};
    --spacing-gap-32: ${spacing.gap[32]};
    --spacing-gap-40: ${spacing.gap[40]};

    --spacing-padding-4: ${spacing.padding[4]};
    --spacing-padding-8: ${spacing.padding[8]};
    --spacing-padding-10: ${spacing.padding[10]};
    --spacing-padding-12: ${spacing.padding[12]};
    --spacing-padding-16: ${spacing.padding[16]};
    --spacing-padding-20: ${spacing.padding[20]};
    --spacing-padding-30: ${spacing.padding[30]};

    --spacing-margin-20: ${spacing.margin[20]};
    --spacing-margin-32: ${spacing.margin[32]};
    --spacing-margin-40: ${spacing.margin[40]};

    /* Border Radius */
    --radius-small: ${radius.small};
    --radius-medium: ${radius.medium};
    --radius-large: ${radius.large};
    --radius-xlarge: ${radius.xlarge};

    /* Typography */
    --font-family-primary: ${typography.fontFamily.primary};
    --font-family-secondary: ${typography.fontFamily.secondary};

    --font-size-small01: ${typography.fontSize.small01};
    --font-size-small02: ${typography.fontSize.small02};
    --font-size-small03: ${typography.fontSize.small03};
    --font-size-medium01: ${typography.fontSize.medium01};
    --font-size-medium02: ${typography.fontSize.medium02};
    --font-size-large01: ${typography.fontSize.large01};
    --font-size-large02: ${typography.fontSize.large02};
    --font-size-large03: ${typography.fontSize.large03};

    --font-weight-regular: ${typography.fontWeight.regular};
    --font-weight-medium: ${typography.fontWeight.medium};
    --font-weight-semibold: ${typography.fontWeight.semibold};
    --font-weight-bold: ${typography.fontWeight.bold};
    --font-weight-extrabold: ${typography.fontWeight.extrabold};

    --line-height-tight: ${typography.lineHeight.tight};
    --line-height-normal: ${typography.lineHeight.normal};
    --line-height-loose: ${typography.lineHeight.loose};

    /* Breakpoints */
    --breakpoint-mobile-min: ${breakpoints.mobile.min};
    --breakpoint-mobile-standard: ${breakpoints.mobile.standard};
    --breakpoint-mobile-max: ${breakpoints.mobile.max};
    --breakpoint-tablet: ${breakpoints.tablet};
  }

  /* Responsive Breakpoints */
  @media (max-width: ${breakpoints.mobile.max}) {
    :root {
      --responsive-margin: ${spacing.margin[20]};
      --responsive-gutter: 16px;
      --responsive-columns: 2;
    }
  }

  @media (min-width: ${breakpoints.tablet}) {
    :root {
      --responsive-margin: ${spacing.margin[20]};
      --responsive-gutter: 16px;
      --responsive-columns: 3;
    }
  }
`;

export const globalStyles = css`
  * {
    font-family: ${typography.fontFamily.primary};
    font-style: normal;
    box-sizing: border-box;
  }

  ${designTokens}
`;
