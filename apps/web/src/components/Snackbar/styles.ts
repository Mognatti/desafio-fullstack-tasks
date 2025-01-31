import styled from "styled-components";

export const SnackbarContainer = styled.div<{ type: "success" | "error" }>`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${(props) =>
    props.type === `success` ? `${props.theme.colors.success.light}` : `${props.theme.colors.danger.light}`};
  color: white;
  padding: 16px;
  border-radius: 4px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  min-width: 250px;
  text-align: center;
  font-size: 14px;
  animation: fadeInOut 3s ease-in-out;

  @keyframes fadeInOut {
    0% {
      opacity: 0;
      transform: translateX(-50%) translateY(10px);
    }
    10% {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
    90% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translateX(-50%) translateY(10px);
    }
  }
`;
