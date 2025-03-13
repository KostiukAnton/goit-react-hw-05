import css from "../ErrorMessage/ErrorMessage.module.css";

export default function ErrorMessage({ errorMessage }) {
  if (errorMessage) {
    return <h2>Помилка при завантаженні зображення.</h2>;
  }
}
