import "./Drawer.scss";

function Drawer({ onClose, items = [], onRemoveItem }) {
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

        <div className="items flex">
          {items.map(({ name, price, img, id }, index) => {
            return (
              <div key={index} className="cartItem d-flex align-center mb-20">
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
                  onClick={() => onRemoveItem(id)}
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
      </div>
    </div>
  );
}

export default Drawer;
