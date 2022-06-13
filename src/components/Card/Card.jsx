import { useEffect, useState } from "react";
import css from "./Card.module.scss";

function Card({
  id,
  name,
  price,
  img,
  onPlus,
  onRemove,
  onFavorite,
  onRemoveFavorite,
  favorited = false,
}) {
  const [isAdded, setIsAdded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(favorited);

  const onClickPlus = () => {
    setIsAdded(!isAdded);
    if (!isAdded) {
      onPlus({ name, price, img });
    } else {
      onRemove({ name, price, img });
    }
  };

  const onClickFavorite = () => {
    setIsFavorite(!isFavorite);
    onFavorite({ name, price, img, id });
  };

  return (
    <div className={css.card}>
      <div className={css.favorite} onClick={onClickFavorite}>
        <img
          src={isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"}
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
          src={isAdded ? "/img/button-checked.svg" : "/img/button-plus.svg"}
          onClick={onClickPlus}
          className={css.plus}
        />
      </div>
    </div>
  );
}

export default Card;
