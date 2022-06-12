import { useState } from "react";
import { Card, Header, Drawer } from "./components";

const arr = [
  {
    name: "Мужские Кроссовки Nike Blazer Mid Suede",
    price: 12999,
    img: "1.jpg",
  },
  { name: "Мужские Кроссовки Nike Air Max 270", price: 15600, img: "2.jpg" },
];

function App() {
  const [cartOpened, setCartOpened] = useState(false);

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer onClose={() => setCartOpened(false)} />}
      //TODO: 4(136)
      <Header onClickCart={() => setCartOpened(true)} />
      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1 className="">Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="search" />
            <input type="text" placeholder="Поиск ..." />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {arr.map((item) => (
            <Card
              key={item.name}
              name={item.name}
              price={item.price}
              img={item.img}
              onFavorite={() => console.log("Добавили в закладки")}
              onPlus={() => console.log("Добавили в карзину")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
