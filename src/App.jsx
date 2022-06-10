function App() {
  return (
    <div className="wrapper clear">
      <header className="header d-flex justify-between align-center p-40">
        <div className="d-flex align-center">
          <img width={40} height={40} src="/img/logo.png" alt="logo" />
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p>Магазин лучших кроссовок</p>
          </div>
        </div>
        <ul className="d-flex">
          <li className="mr-30">
            <img width={18} height={18} src="/img/cart.svg" alt="cart" />
            <span>1205 руб.</span>
          </li>
          <li>
            <img width={18} height={18} src="/img/user.svg" alt="user" />
          </li>
        </ul>
      </header>
      <div className="content p-40">
        <h1 className="">Все кроссовки</h1>
        <div className="card">
          <img src="/img/sneakers/1.jpg" alt="Sneakers" />
          <p>Мужские Кроссовки Nike Blazer Mid Suede</p>
          <div>
            <div>
              <span>Цена:</span>
              <b>12 999 руб.</b>
            </div>
            <button>
              <img
                width={11}
                height={11}
                src="/img/plus.svg"
                alt="button add"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
