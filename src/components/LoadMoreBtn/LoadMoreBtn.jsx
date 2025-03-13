import css from "../LoadMoreBtn/LoadMoreBtn.module.css";

export default function LoadMoreBtn({ handleLoadMore, loadMore }) {
  if (!loadMore) return null;
  return (
    <button className={css.button} onClick={handleLoadMore}>
      Load more
    </button>
  );
}
