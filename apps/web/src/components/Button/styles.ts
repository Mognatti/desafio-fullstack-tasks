import styled from "styled-components";

export const ButtonContainer = styled.button<{ variant: "outline" | "text" }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  border-radius: ${(props) => (props.variant === "outline" ? "4px" : "0")};
  outline: ${(props) => (props.variant === `outline` ? `1px solid ${props.theme.colors.primary.light}` : "none")};
  border-bottom: ${(props) => (props.variant === `outline` ? "none" : `1px solid ${props.theme.colors.primary.light}`)};
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.35s;
  font-size: 0.9em;
  gap: 4px;

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme.colors.primary.light};
    color: ${(props) => props.theme.colors.neutral.white};
  }

  &:disabled {
    background-color: ${(props) => props.theme.colors.neutral.offwhite};
    color: ${(props) => props.theme.colors.neutral.light};
    border-bottom: ${(props) =>
      props.variant === `outline` ? "none" : `1px solid ${props.theme.colors.danger.light}`};
    outline: ${(props) => (props.variant === `outline` ? `1px solid ${props.theme.colors.danger.light}` : "none")};
    cursor: not-allowed;
  }
`;
