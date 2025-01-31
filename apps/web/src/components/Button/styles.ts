import styled from "styled-components";

export const ButtonContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  border-radius: 4px;
  outline: 2px solid ${(props) => props.theme.colors.primary.light};
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.35s;
  font-size: 0.9em;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary.light};
    color: ${(props) => props.theme.colors.neutral.white};
  }
`;
