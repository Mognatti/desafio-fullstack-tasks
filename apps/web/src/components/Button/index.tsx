import * as S from "./styles";

type ButtonProps = {
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (...args: any[]) => void;
};
export default function Button({ children, onClick }: ButtonProps) {
  return <S.ButtonContainer onClick={onClick}>{children}</S.ButtonContainer>;
}
