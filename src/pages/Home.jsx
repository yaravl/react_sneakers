import { Card } from "../components";

const Home = ({
  items,
  cartItems,
  setSearchValue,
  searchValue,
  onChangeSearchInput,
  onAddToCart,
  onAddToFavorite,
  isLoading,
}) => {
  const renderItems = () => {
    const filteredItems = items.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    //TODO: 6(142)
    return (isLoading ? [...Array(12)] : filteredItems).map((item, index) => (
      <Card
        key={index}
        onFavorite={(obj) => onAddToFavorite(obj)}
        onPlus={(obj) => onAddToCart(obj)}
        added={cartItems.some((obj) => Number(obj.id) === Number(item.id))}
        loading={isLoading}
        {...item}
      />
    ));
  };

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
      <div className="d-flex flex-wrap">{renderItems()}</div>
    </div>
  );
};

export default Home;
