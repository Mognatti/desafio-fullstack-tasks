import * as S from "./styles";

export default function Snackbar({ message, type }: { message: string; type: "success" | "error" }) {
  return <S.SnackbarContainer type={type}>{message}</S.SnackbarContainer>;
}
