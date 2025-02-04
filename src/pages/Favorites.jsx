import { Card } from "../components";
import { useContext } from "react";
import { AppContext } from "../context";

const Favorites = () => {
  const { favorites } = useContext(AppContext);

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1 className="">Избранное</h1>
      </div>

      <div className="d-flex flex-wrap">
        {favorites.map((item, index) => (
          <Card key={index} {...item} favorited />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
