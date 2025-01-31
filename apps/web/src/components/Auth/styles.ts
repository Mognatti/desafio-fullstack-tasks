import styled from "styled-components";

export const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 94vh;
`;

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 16px;
  border-radius: 4px;
  width: 400px;
  height: 400px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  h1 {
    margin: 0;
  }
`;

export const changeMethod = styled.span`
  text-decoration: underline;
`;

export const AuthFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    font-size: 0.9em;
    margin: 4px;
  }
`;
