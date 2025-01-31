import * as S from "./styles";

type ButtonProps = {
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (...args: any[]) => void;
  variant: "outline" | "text";
  customStyle?: React.CSSProperties;
};
export default function Button({ children, onClick, customStyle, variant }: ButtonProps) {
  return (
    <S.ButtonContainer onClick={onClick} style={customStyle ?? {}} variant={variant}>
      {children}
    </S.ButtonContainer>
  );
}
