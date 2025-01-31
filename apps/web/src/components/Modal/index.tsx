import * as S from "./styles";

type ModalProps = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  children: React.ReactNode;
};
export default function Modal({ setShowModal, title, children }: ModalProps) {
  return (
    <S.ModalContainer>
      <S.ModalContent>
        <S.ModalHeader>
          {title}
          <S.CloseButton size={18} onClick={() => setShowModal(false)} />
        </S.ModalHeader>
        {children}
      </S.ModalContent>
    </S.ModalContainer>
  );
}
