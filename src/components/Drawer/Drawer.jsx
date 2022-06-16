import "./Drawer.scss";
import { useContext } from "react";
import AppContext from "../../context";

function Drawer({ onClose }) {
  const { cartItems, onRemoveInCart } = useContext(AppContext);
  return (
    <div className="overlay">
      <div className="drawer d-flex flex-column">
        <h2 className="mb-30 d-flex justify-between">
          Корзина
          <img
            onClick={onClose}
            className="removeBtn cu-p"
            src="/img/button-remove.svg"
            alt="remove"
          />
        </h2>

        {cartItems.length > 0 ? (
          <>
            <div className="items flex">
              {cartItems.map(({ name, price, img, id, idCart }, index) => {
                return (
                  <div
                    key={index}
                    className="cartItem d-flex align-center mb-20"
                  >
                    <div
                      style={{ backgroundImage: `url(${img})` }}
                      className="cartItemImg"
                    ></div>
                    <div className="mr-20 flex">
                      <p className="mb-5">{name}</p>
                      <b>{price} руб.</b>
                    </div>
                    <img
                      className="removeBtn"
                      src="/img/button-remove.svg"
                      alt="remove"
                      onClick={() => onRemoveInCart(idCart)}
                    />
                  </div>
                );
              })}
            </div>

            <div className="cartTotalBlock">
              <ul>
                <li className="d-flex">
                  <span>Итого:</span>
                  <div></div>
                  <b>21 498 руб.</b>
                </li>
                <li className="d-flex">
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>107 руб.</b>
                </li>
              </ul>
              <button className="greenButton">
                Оформить заказ <img src="/img/arrow.svg" alt="arrow" />
              </button>
            </div>
          </>
        ) : (
          <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img
              className="mb-20"
              src="/img/empty-cart.jpg"
              alt="empty-cart"
              width={120}
              height={120}
            />
            <h2>Корзина пустая</h2>
            <p className="opacity-6">
              Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.
            </p>
            <button onClick={onClose} className="greenButton mt-30">
              <img src="/img/arrow.svg" alt="arrow" /> Вернуться назад
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Drawer;
