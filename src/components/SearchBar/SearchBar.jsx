import { useState } from "react";
import css from "../SearchBar/SearchBar.module.css";
import toast, { Toaster } from "react-hot-toast";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ onSubmit }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (inputValue.trim() === "") {
      toast.error("Заповніть поле пошуку!");
      return;
    }
    onSubmit(inputValue);
    setInputValue("");
  };

  const handelChenge = (evt) => {
    setInputValue(evt.target.value);
  };

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          value={inputValue}
          autoFocus
          placeholder="Search images and photos"
          onChange={handelChenge}
        />
        <FaSearch className={css.iconSearch} onClick={handleSubmit} />
      </form>
      <Toaster />
    </header>
  );
}
