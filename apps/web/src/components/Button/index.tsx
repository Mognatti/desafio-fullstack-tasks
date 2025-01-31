import * as S from "./styles";

type ButtonProps = {
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (...args: any[]) => void;
  variant: "outline" | "text";
  type?: "button" | "submit" | "reset";
  customStyle?: React.CSSProperties;
  disabled?: boolean;
};
export default function Button({ children, onClick, customStyle, variant, type, disabled }: ButtonProps) {
  return (
    <S.ButtonContainer onClick={onClick} style={customStyle ?? {}} variant={variant} type={type} disabled={disabled}>
      {children}
    </S.ButtonContainer>
  );
}
