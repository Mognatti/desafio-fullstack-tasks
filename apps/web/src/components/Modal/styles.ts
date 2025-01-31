import styled from "styled-components";
import { IoMdClose } from "react-icons/io";

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 300px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 16px;
`;

export const ModalHeader = styled.div`
  display: flex;
  padding: 8px 16px;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const CloseButton = styled(IoMdClose)`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary.main};
  transition: all 0.35s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary.light};
    transform: translate(0, -2px) scale(1.1);
  }
`;
