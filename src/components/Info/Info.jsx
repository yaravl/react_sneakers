import { useContext } from "react";
import { AppContext } from "../../context";

const Info = ({ title, description, image }) => {
  const { setCartOpened } = useContext(AppContext);

  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
      <img className="mb-20" src={image} alt="empty-cart" width={120} />
      <h2>{title}</h2>
      <p className="opacity-6">{description}</p>
      <button
        onClick={() => setCartOpened(false)}
        className="greenButton mt-30"
      >
        <img src="/img/arrow.svg" alt="arrow" /> Вернуться назад
      </button>
    </div>
  );
};

export default Info;
