import "./Drawer.scss";
import { useContext, useState } from "react";
import { AppContext } from "../../context";
import { Info } from "../index";
import axios from "axios";

function Drawer() {
  const {
    cartItems,
    onRemoveInCart,
    totalPrice,
    numFormat,
    setCartOpened,
    setCartItems,
    cartOpened,
  } = useContext(AppContext);

  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://62a63067430ba53411d2342d.mockapi.io/orders",
        { items: cartItems }
      );
      setOrderId(data.idOrder);
      setIsOrderComplete(true);
      setCartItems([]);
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await onRemoveInCart(item.idCart);
        await delay(500);
      }
    } catch (e) {
      alert("Не удалось создать заказ!");
    }
    setIsLoading(false);
  };

  return (
    <div className={`overlay ${cartOpened && "overlay-visible"}`}>
      <div
        className={`drawer d-flex flex-column ${
          cartOpened && "drawer-visible"
        }`}
      >
        <h2 className="mb-30 d-flex justify-between">
          Корзина
          <img
            onClick={() => setCartOpened(false)}
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
                      <b>{numFormat(price)} руб.</b>
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
                  <b>{numFormat(totalPrice) + " руб."}</b>
                </li>
                <li className="d-flex">
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>
                    {numFormat(((totalPrice / 100) * 5).toFixed()) + " руб."}
                  </b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className="greenButton"
              >
                Оформить заказ <img src="/img/arrow.svg" alt="arrow" />
              </button>
            </div>
          </>
        ) : (
          <>
            {isOrderComplete ? (
              <Info
                title="Заказ оформлен!"
                description={`Ваш заказ #${orderId} скоро будет передан курьерской доставке`}
                image="/img/complete-order.jpg"
              />
            ) : (
              <Info
                title="Корзина пустая"
                description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
                image="/img/empty-cart.jpg"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Drawer;
