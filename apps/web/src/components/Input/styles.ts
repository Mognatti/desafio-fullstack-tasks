import styled from "styled-components";

export const StyledInput = styled.input`
  padding: 8px 16px;
  border: 1px solid #ccc;
  transition: all 0.35s;
  outline: none;
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.colors.primary.light};

  &:hover {
    transform: scale(1.01) translateY(-1px);
  }

  &:focus {
    border-bottom: 2px solid ${(props) => props.theme.colors.primary.light};
    transform: scale(1.03) translateY(-2px);
    background-color: ${(props) => props.theme.colors.neutral.offwhite};
  }
`;
