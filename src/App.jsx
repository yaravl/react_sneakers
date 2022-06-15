import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Card, Header, Drawer } from "./components";
import axios from "axios";
import { Home, Favorites } from "./pages";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const cartResp = await axios.get(
        "https://62a63067430ba53411d2342d.mockapi.io/cart"
      );
      const favoritesResp = await axios.get(
        "https://62a63067430ba53411d2342d.mockapi.io/favorites"
      );
      const itemsResp = await axios.get(
        "https://62a63067430ba53411d2342d.mockapi.io/items"
      );

      setCartItems(cartResp.data);
      setFavorites(favoritesResp.data);
      setItems(itemsResp.data);

      setIsLoading(false);
    }

    fetchData();
  }, []);

  const onAddToCart = (obj) => {
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        axios.delete(
          `https://62a63067430ba53411d2342d.mockapi.io/cart/${obj.id}`
        );
        setCartItems((prevState) =>
          prevState.filter((_) => Number(_.id) !== Number(obj.id))
        );
      } else {
        axios.post("https://62a63067430ba53411d2342d.mockapi.io/cart", obj);
        setCartItems((prevState) => [...prevState, obj]);
      }
    } catch (e) {
      alert("Не удалосьт добавить в корзину");
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((item) => item.id === obj.id)) {
        axios.delete(
          `https://62a63067430ba53411d2342d.mockapi.io/favorites/${obj.id}`
        );
        setFavorites((prevState) => prevState.filter((_) => _.id !== obj.id));
      } else {
        const { data } = await axios.post(
          "https://62a63067430ba53411d2342d.mockapi.io/favorites",
          obj
        );
        setFavorites((prevState) => [...prevState, data]);
      }
    } catch (e) {
      alert("Не удалось добавить в избранное!");
    }
  };

  const onRemoveInCart = (id) => {
    axios.delete(`https://62a63067430ba53411d2342d.mockapi.io/cart/${id}`);
    setCartItems((prevState) => prevState.filter((_) => _.id !== id));
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
          onRemoveItem={onRemoveInCart}
        />
      )}

      <Header items={favorites} onClickCart={() => setCartOpened(true)} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              items={items}
              cartItems={cartItems}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
              isLoading={isLoading}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <Favorites items={favorites} onAddToFavorite={onAddToFavorite} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
