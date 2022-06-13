import { Card } from "../components";

const Home = ({
  items,
  setSearchValue,
  searchValue,
  onChangeSearchInput,
  onAddToCart,
  onAddToFavorite,
}) => {
  return (
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
              onFavorite={(obj) => onAddToFavorite(obj)}
              onPlus={(obj) => onAddToCart(obj)}
              {...item}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
