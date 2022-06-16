import { useEffect, useState } from "react";
import ContentLoader from "react-content-loader";
import css from "./Card.module.scss";
import { useContext } from "react";
import AppContext from "../../context";

function Card({ id, idCart, idFav, name, price, img, loading = false }) {
  const { isItemAdded, onAddToFavorite, favorites, onAddToCart } =
    useContext(AppContext);

  const onClickPlus = () => {
    isItemAdded(id);
    onAddToCart({ idCart, id, name, price, img });
  };

  const onClickFavorite = () => {
    onAddToFavorite({ id, name, price, img });
  };

  return (
    <div className={css.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={150}
          height={190}
          viewBox="0 0 160 190"
          backgroundColor="#f2f2f2"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="150" height="91" />
          <rect x="0" y="100" rx="3" ry="3" width="150" height="16" />
          <rect x="0" y="124" rx="3" ry="3" width="93" height="15" />
          <rect x="0" y="160" rx="8" ry="8" width="80" height="24" />
          <rect x="121" y="155" rx="8" ry="8" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          <div className={css.favorite} onClick={onClickFavorite}>
            <img
              src={
                favorites.some((item) => Number(item.id) === Number(id))
                  ? "/img/heart-liked.svg"
                  : "/img/heart-unliked.svg"
              }
              alt="favorite"
            />
          </div>

          <img width={133} height={112} src={img} alt="Sneakers" />
          <h5>{name}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            <img
              src={
                isItemAdded(id)
                  ? "/img/button-checked.svg"
                  : "/img/button-plus.svg"
              }
              onClick={onClickPlus}
              className={css.plus}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
