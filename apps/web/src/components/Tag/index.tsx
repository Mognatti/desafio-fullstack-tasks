import * as S from "./styles";
import { toTitle } from "../../utils/title";
type TagProps = {
  variant: "pendente" | "concluida";
};

export default function Tag({ variant }: TagProps) {
  return <S.TagContainer variant={variant}>{toTitle(variant)}</S.TagContainer>;
}
