import { useNavigate } from "react-router-dom";
import style from "./HeroBlock.module.scss";
import { FC, memo } from "react";

interface IHeroBlockProps {
  id: number;
  name: string;
  description?: string;
  image?: string;
}
export const HeroBlock: FC<IHeroBlockProps> = memo(({ id, name, description, image }) => {
  const navigate = useNavigate();

  return (
    <div className={style.container} onClick={() => navigate(`/character/${id}`)}>
      <img src={image} alt="Photo of hero" />
      <h1>Герой: {name}</h1>
      <div>{description}</div>
    </div>
  );
});
