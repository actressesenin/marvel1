import { useCallback, useEffect, useState } from "react";
import { api } from "../../constants";
import style from "./Homepage.module.scss";
import { Button } from "../../components/Button";
import { HeroBlock } from "../../components/HeroBlock";
import { Input } from "../../components/Input";
import { Pagination } from "../../components/Pagination";

interface IResponse {
  results: IHero[];
  count: number;
  limit: number;
  offset: number;
  total: number;
}

export interface IHero {
  id: number;
  name: string;
  description?: string;
  thumbnail?: {
    path: string;
    extension: string;
  };
}

const baseUrl = `/v1/public/characters?limit=50`;

export const Homepage = () => {
  const [response, setResponse] = useState<IResponse>();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    const url = search ? `${baseUrl}&nameStartsWith=${search}` : baseUrl;
    api
      .get(url)
      .then(({ data }) => {
        setResponse(data.data);
      })
      .catch((err) => alert(`Произошла ошибка ${err}. Попробуйте позже`));
  }, [search]);

  const handlePageClick = useCallback(
    (e: number) => {
      api.get(`${baseUrl}&offset=${e * 50}`).then(({ data }) => setResponse(data.data));
      setPage(e);
    },
    [setPage],
  );

  if (!response) return <h1>Данных нет</h1>;

  const pages = Math.ceil(response?.total / 50);

  return (
    <div className={style.home}>
      <div className={style.header}>
        <h1>Список героев Marvel</h1>
        <div className={style.search}>
          <Input
            value={search}
            placeholder="Введите имя персонажа"
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && <Button text="Очистить" onClick={() => setSearch("")} />}
        </div>
      </div>
      <div>
        {response ? (
          response.results.map((el) => <HeroBlock key={el.id} {...el} image={el.thumbnail?.path} />)
        ) : (
          <h1>Данных нет</h1>
        )}
      </div>
      <Pagination page={page} pages={pages} handlePageClick={handlePageClick} />
    </div>
  );
};
