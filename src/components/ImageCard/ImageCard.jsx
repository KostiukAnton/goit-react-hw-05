import css from "../ImageCard/ImageCard.module.css";

export default function ImageCard({ src, alt, srcFull, onImageClick }) {
  return (
    <div className={css.imgcontainer}>
      <img
        className={css.img}
        src={src}
        alt={alt}
        onClick={() => onImageClick(srcFull)}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
}
