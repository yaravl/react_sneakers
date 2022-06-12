import { useEffect, useState } from "react";
import { Card, Header, Drawer } from "./components";
import axios from "axios";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartOpened, setCartOpened] = useState(false);

  useEffect(() => {
    axios
      .get("https://62a63067430ba53411d2342d.mockapi.io/items")
      .then((resp) => setItems(resp.data));
  }, []);

  const onAddToCart = (obj) => {
    setCartItems((prevState) => [...prevState, obj]);
  };

  const onRemoveInCart = (obj) => {
    setCartItems((prevState) => prevState.filter((_) => _.img !== obj.img));
  };

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemoveItem={(obj) => onRemoveInCart(obj)}
        />
      )}
      <Header onClickCart={() => setCartOpened(true)} />
      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1 className="">
            {!searchValue ? "Все кроссовки" : "Поиск: " + searchValue}
          </h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="search" />
            {searchValue && (
              <div onClick={() => setSearchValue("")} className="cu-p">
                X
              </div>
            )}
            <input
              type="text"
              placeholder="Поиск ..."
              onChange={onChangeSearchInput}
              value={searchValue}
            />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {items
            .filter((item) =>
              item.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((item) => (
              <Card
                key={item.img}
                name={item.name}
                price={item.price}
                img={item.img}
                onFavorite={() => console.log("Добавили в закладки")}
                onPlus={(obj) => onAddToCart(obj)}
                onRemove={(obj) => onRemoveInCart(obj)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
