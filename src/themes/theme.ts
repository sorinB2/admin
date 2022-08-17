import { createTheme } from '@mui/material/styles';
import shadows, { Shadows } from '@mui/material/styles/shadows';
import { Colors } from '../constants/colors';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    fontFamilyInter: string;
  }

  interface TypographyVariantsOptions {
    fontFamilyInter?: string;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    fontFamilyInter: true;
  }
}

import '@mui/material/styles/createPalette';
declare module '@mui/material/styles/createPalette' {
  interface CommonColors {
    lightBackground: string;
    mediumGrey: string;
    lightBlueHover: string;
  }
}

export const theme = createTheme({
  palette: {
    mode: 'light',
    common: {
      black: Colors.black,
      white: Colors.white,
      lightBackground: Colors.background,
    },
    primary: {
      main: Colors.mainBlue,
      light: Colors.gray,
    },
    secondary: {
      main: Colors.mainGreen,
      light: Colors.stroke,
    },
    action: {
      disabledBackground: Colors.gray,
      disabled: Colors.white,
    },
    text: {
      primary: Colors.mainBlue,
      secondary: Colors.gray,
      disabled: Colors.white,
    },
  },
  typography: {
    fontFamily: 'Open Sans',
    fontFamilyInter: 'Inter',
    h1: {
      fontSize: '24px',
    },
    h2: {
      fontSize: '20px',
    },
    h3: {
      fontSize: '18px',
    },
    h4: {
      fontSize: '16px',
    },
    h5: {
      fontSize: '15px',
    },
    h6: {
      fontSize: '13px',
    },
    body1: {
      fontSize: '14px',
    },
    body2: {
      fontSize: '12px',
    },
    button: {
      textTransform: 'none',
      fontSize: '14px',
    },
  },
  shadows: shadows.map(() => 'none') as Shadows,
});
