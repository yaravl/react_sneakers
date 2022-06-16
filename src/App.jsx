import { createContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Card, Header, Drawer } from "./components";
import axios from "axios";
import { Home, Favorites } from "./pages";

import AppContext from "./context";

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

      setIsLoading(false);

      setCartItems(cartResp.data);
      setFavorites(favoritesResp.data);
      setItems(itemsResp.data);
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
        return false;
      } else {
        const { data } = await axios.post(
          "https://62a63067430ba53411d2342d.mockapi.io/favorites",
          obj
        );
        setFavorites((prevState) => [...prevState, data]);
        return true;
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

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  };
  //TODO: 6(229)
  return (
    <AppContext.Provider
      value={{ items, cartItems, favorites, isItemAdded, onAddToFavorite }}
    >
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
            element={<Favorites onAddToFavorite={onAddToFavorite} />}
          />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
