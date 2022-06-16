import { Link } from "react-router-dom";
import "./Header.scss";
import { useContext } from "react";
import AppContext from "../../context";

function Header() {
  const { cartItems, favorites, totalPrice, numFormat, setCartOpened } =
    useContext(AppContext);
  return (
    <header className="header d-flex justify-between align-center p-40">
      <Link to="/">
        <div className="d-flex align-center">
          <img width={40} height={40} src="/img/logo.png" alt="logo" />

          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className="d-flex">
        <li className="mr-30 cu-p" onClick={() => setCartOpened(true)}>
          <img width={18} height={18} src="/img/cart.svg" alt="cart" />
          {cartItems.length > 0 && (
            <span className="header__count">{cartItems.length}</span>
          )}
          <span>{numFormat(totalPrice)} руб.</span>
        </li>
        <li className="mr-20 cu-p">
          <Link to="/favorites">
            <img width={18} height={18} src="/img/heart.svg" alt="heart" />
            {favorites.length > 0 && (
              <span className="header__count">{favorites.length}</span>
            )}
          </Link>
        </li>
        <li>
          <img width={18} height={18} src="/img/user.svg" alt="user" />
        </li>
      </ul>
    </header>
  );
}

export default Header;
