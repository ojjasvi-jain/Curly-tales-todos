import { useState } from "react";
import "./App.css";

const Header = () => {
  return (
    <div>
      <header>
        <h1 className="heading">💁‍♀️ Curly Tales 🛫</h1>
      </header>
    </div>
  );
};

const Form = ({ itemList, setItemList }) => {
  let [inputItem, setInputItem] = useState("");

  const onChangeHandler = (e) => {
    setInputItem(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (inputItem) {
      let newList = [
        ...itemList,
        { id: itemList.length, item: inputItem, isSelected: false },
      ];

      setItemList(newList);
      setInputItem("");
    }
  };

  const clickHandler = () => {
    setItemList([]);
  };

  return (
    <div className="form-wrapper">
      <h3>What do you need for your trip 🚗 ?</h3>
      <form onSubmit={onSubmitHandler}>
        <input
          value={inputItem}
          onChange={onChangeHandler}
          className="item-input"
        ></input>
        <button className="btn" type="submit">
          ADD
        </button>
      </form>
      <button className="btn" onClick={clickHandler} type="btn">
        CLEAR ALL
      </button>
    </div>
  );
};

const TripItemList = ({ itemList, setItemList }) => {
  const onChangeHandler = (id) => {
    let newList = itemList.map((i) => {
      if (i.id === id) return { ...i, isSelected: !i.isSelected };
      return i;
    });

    setItemList(newList);
  };

  const onClickHandler = (id) => {
    let newList = itemList.filter((i) => i.id !== id);

    setItemList(newList);
  };

  return (
    <div className="item-list-wrapper">
      <ul className="item-list">
        {itemList.map((i, index) => (
          <li className="item" key={index}>
            <input
              type="checkbox"
              checked={i.isSelected}
              onChange={() => onChangeHandler(i.id)}
            />
            <p className={`item-value ${i.isSelected ? "selected" : ""}`}>
              {i.item}
            </p>
            <div className="del-btn" onClick={() => onClickHandler(i.id)}>
              X
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Footer = ({ itemList }) => {
  let selectedItem = itemList.filter((i) => i.isSelected);

  return (
    <footer className="footer">
      {itemList.length === 0 ? (
        <p>start adding some item to your list </p>
      ) : (
        <p>
          ✈ you have <span>{itemList.length - selectedItem.length}</span> item
          on your list, and you already packed{" "}
          <span>{selectedItem.length}</span>
        </p>
      )}
    </footer>
  );
};

function App() {
  let [itemList, setItemList] = useState([
    {
      id: 22,
      item: "charger",
      isSelected: false,
    },
  ]);

  return (
    <div className="container">
      <Header />
      <Form itemList={itemList} setItemList={setItemList} />
      <TripItemList itemList={itemList} setItemList={setItemList} />
      <Footer itemList={itemList} />
    </div>
  );
}

export default App;
