type InputProps = {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};
export default function Input({ type, placeholder, value, onChange, required }: InputProps) {
  return <input type={type} placeholder={placeholder} value={value} onChange={onChange} required={required} />;
}
