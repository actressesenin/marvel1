import { useNavigate, useParams } from "react-router-dom";
import style from "./Hero.module.scss";
import { useEffect, useState } from "react";
import { api } from "../../constants";
import { Button } from "../../components/Button";
import { IHero } from "../Homepage/Homepage";

interface ISeries {
  id: number;
  title: string;
  description?: string;
  startYear: number;
  endYear: number;
}

export const Hero = () => {
  const { id } = useParams();
  const [hero, setHero] = useState<IHero>();
  const [series, setSeries] = useState<ISeries[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/v1/public/characters/${id}`)
      .then(({ data }) => {
        setHero(data.data.results[0]);
      })
      .catch((err) => console.log(err));
    api
      .get(`/v1/public/characters/${id}/series`)
      .then(({ data }) => {
        setSeries(data.data.results);
      })
      .catch((err) => alert(`Произошла ошибка ${err}. Попробуйте позже`));
  }, [id]);

  if (!hero) return <h1>Данных нет</h1>;

  return (
    <div className={style.hero}>
      <Button text="На главную" className={style.back} onClick={() => navigate("/")} />
      <div className={style.hero_header}>
        <img src={hero.thumbnail?.path} alt="Photo of hero" />
        <h1>Герой: {hero.name}</h1>
        <div>{hero.description}</div>
      </div>
      {series.length > 0 && (
        <div className={style.hero_info}>
          <div>
            <h2>Сериалы:</h2>
            {series ? (
              series.length > 10 ? (
                series.slice(0, 10).map((el) => (
                  <div key={el.id}>
                    <h3>{el.title}</h3>
                    <p>{el.description}</p>
                    <p>
                      Период: {el.startYear} - {el.endYear}
                    </p>
                  </div>
                ))
              ) : (
                series.map((el) => (
                  <div key={el.id}>
                    <h3>{el.title}</h3>
                    <p>{el.description}</p>
                    <p>
                      Период: {el.startYear} - {el.endYear}
                    </p>
                  </div>
                ))
              )
            ) : (
              <p>Нет сериалов</p>
            )}
            {series.length > 10 && <h3>Полный список ищите на сайте Marvel</h3>}
          </div>
        </div>
      )}
    </div>
  );
};
