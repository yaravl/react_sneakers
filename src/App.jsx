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
    axios
      .get("https://62a63067430ba53411d2342d.mockapi.io/cart")
      .then((resp) => setCartItems(resp.data));
  }, []);

  const onAddToCart = (obj) => {
    axios.post("https://62a63067430ba53411d2342d.mockapi.io/cart", obj);
    setCartItems((prevState) => [...prevState, obj]);
  };

  const onRemoveInCart = (id) => {
    console.log(id);
    axios.delete(`https://62a63067430ba53411d2342d.mockapi.io/cart/${id}`);
    setCartItems((prevState) => prevState.filter((_) => _.id !== id));
  };

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value);
  };
 //TODO: 5(104)
  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemoveItem={onRemoveInCart}
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
                // onRemove={(obj) => onRemoveInCart(obj)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
