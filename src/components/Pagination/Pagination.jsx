import React, { useContext } from "react";
import "./Pagination.scss";
import { AppContext } from "../../context";
import axios from "axios";
import { useState } from "react";

const Pagination = () => {
  const [page, setPage] = useState(1);
  const { itemsLength, setItems } = useContext(AppContext);

  const pages = itemsLength / 4;

  const changePaginationPage = async (p) => {
    try {
      if (p !== page) {
        const itemsResp = await axios.get(
          `https://62a63067430ba53411d2342d.mockapi.io/items?page=${p}&limit=4`
        );
        setItems(itemsResp.data);
        setPage(p);
      }
    } catch (e) {
      alert("Пагинация не работает");
    }
  };

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {page > 1 && (
          <li
            className="pagination__item"
            onClick={() => changePaginationPage(page - 1)}
          >
            {"<"}
          </li>
        )}

        {Array(pages)
          .fill(0)
          .map((n, i) => (
            <li
              className="pagination__item"
              key={i}
              onClick={() => changePaginationPage(i + 1)}
            >
              {i + 1}
            </li>
          ))}
        {page < pages && (
          <li
            className="pagination__item"
            onClick={() => changePaginationPage(page + 1)}
          >
            {">"}
          </li>
        )}
      </ul>
    </div>
  );
};

export default Pagination;
