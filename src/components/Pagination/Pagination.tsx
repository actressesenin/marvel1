import { memo } from "react";
import { Button } from "../Button";
import style from "./Pagination.module.scss";

export const Pagination = memo(
  ({
    page,
    pages,
    handlePageClick,
  }: {
    page: number;
    pages: number;
    handlePageClick: (e: number) => void;
  }) => {
    return (
      <div className={style.pagination}>
        {Array.from(Array(pages).keys()).map((el) => (
          <div className={style.page} key={el}>
            <Button isActive={page === el} text={el + 1} onClick={() => handlePageClick(el)} />
          </div>
        ))}
      </div>
    );
  },
);
