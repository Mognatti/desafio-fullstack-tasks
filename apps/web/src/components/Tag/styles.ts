import styled from "styled-components";

export const TagContainer = styled.span<{ variant: "pendente" | "concluida" }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  border-radius: 4px;
  font-size: 0.8em;
  width: 60px;
  background-color: ${(props) =>
    props.variant === "pendente" ? props.theme.colors.primary.light : props.theme.colors.success.light};
  color: ${(props) =>
    props.variant === "pendente" ? props.theme.colors.neutral.white : props.theme.colors.neutral.white};
`;
