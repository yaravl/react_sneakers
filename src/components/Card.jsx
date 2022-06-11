

function Card({ name, price, img }) {
    return (
        <div className="card">
            <div className="favorite">
                <img src="/img/heart-unliked.svg" alt="unliked" />
            </div>
            <img
                width={133}
                height={112}
                src={`/img/sneakers/${img}`}
                alt="Sneakers"
            />
            <h5>{name}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b>{price} руб.</b>
                </div>
                <button className="button">
                    <img
                        width={11}
                        height={11}
                        src="/img/plus.svg"
                        alt="button add"
                    />
                </button>
            </div>
        </div>
    )
}

export default Card;