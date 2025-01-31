import styled from "styled-components";

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  width: 100svw;
  height: 60px;
`;

export const HeaderNav = styled.nav`
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.neutral.white};
  justify-content: space-between;
  padding: 0 80px;
  height: 100%;
  display: flex;
  align-items: center;
`;
