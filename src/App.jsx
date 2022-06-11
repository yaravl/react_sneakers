import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";

const arr = [
    { name: 'Мужские Кроссовки Nike Blazer Mid Suede', price: 12999, img: '1.jpg' },
    { name: 'Мужские Кроссовки Nike Air Max 270', price: 15600, img: '2.jpg' },
];

function App() {
  return (
    <div className="wrapper clear">

      <Drawer />

      <Header />

      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1 className="">Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="search" />
            <input type="text" placeholder="Поиск ..." />
          </div>
        </div>
        //TODO: 124
        <div className="d-flex flex-wrap">
            {arr.map(item => <Card name={item.name} price={item.price} img={item.img} />)}
        </div>
      </div>
    </div>
  );
}

export default App;
