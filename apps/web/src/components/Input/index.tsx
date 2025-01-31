import * as S from "./styles";
type InputProps = {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  id?: string;
};

export default function Input({ type, placeholder, value, onChange, required, id }: InputProps) {
  return (
    <S.StyledInput
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      id={id}
    />
  );
}
