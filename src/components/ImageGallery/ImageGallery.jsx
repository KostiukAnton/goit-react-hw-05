import css from "../ImageGallery/ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";

export default function ImageGallery({ images, onImageClick }) {
  return (
    <ul className={css.ul}>
      {images.map((image) => (
        <li key={image.id}>
          <ImageCard
            onImageClick={onImageClick}
            srcFull={image.urls.full}
            src={image.urls.small}
            alt={image.alt_description}
          />
        </li>
      ))}
    </ul>
  );
}
