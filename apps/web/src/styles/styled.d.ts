import "styled-components";

interface Colors {
  primary: {
    main: string;
    light: string;
    dark: string;
  };
  secondary: {
    main: string;
    light: string;
    dark: string;
  };
  neutral: {
    main: string;
    light: string;
    dark: string;
    white: string;
    offwhite: string;
  };
  danger: {
    main: string;
    light: string;
    dark: string;
  };
  success: {
    main: string;
    light: string;
    dark: string;
  };
}

interface Fonts {
  main: string;
  secondary: string;
}

declare module "styled-components" {
  export interface DefaultTheme {
    colors: Colors;
    fonts: Fonts;
  }
}
