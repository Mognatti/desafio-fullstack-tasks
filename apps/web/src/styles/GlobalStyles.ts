import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    margin: 0;
    padding: 0;
    background-color: ${({ theme }) => theme.colors.neutral.white};
    color: ${({ theme }) => theme.colors.neutral.dark};
    font-family: ${({ theme }) => theme.fonts.main};
  }

  h1 {
    font-size: 2rem;
  }

`;
