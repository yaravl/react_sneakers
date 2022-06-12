import { useEffect, useState } from "react";
import css from "./Card.module.scss";

function Card({ name, price, img, onPlus, onFavorite }) {
  const [isAdded, setIsAdded] = useState(false);

  const onClickPlus = () => {
    setIsAdded(!isAdded);
  };

  useEffect(() => {
    console.log("Переменная изменилась");
  }, [isAdded]);

  return (
    <div className={css.card}>
      <div className={css.favorite} onClick={onFavorite}>
        <img src="/img/heart-unliked.svg" alt="unliked" />
      </div>
      <img
        width={133}
        height={112}
        src={`/img/sneakers/${img}`}
        alt="Sneakers"
      />
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
