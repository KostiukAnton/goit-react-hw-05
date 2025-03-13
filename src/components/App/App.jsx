import "../App/App.css";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageModal from "../ImageModal/ImageModal";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function App() {
  const API_KEY = "7ge4fZ0BcVp1WFSFUeB6BLKpagDibNn44MlAaDw8PSs";
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  console.log("images :>> ", images);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(false);
  };

  const handleSearchSubmit = (newQuery) => {
    if (newQuery === query) return;
    setQuery(newQuery);
    setImages([]);
    setPage(1);
    setLoadMore(false);
    setErrorMessage(false);
  };

  const handleLoadMore = () => {
    setPage((prevPages) => prevPages + 1);
  };

  useEffect(() => {
    if (page > 1 && images.length > 0) {
      setTimeout(() => {
        window.scrollBy({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
    }
  }, [page, images]);

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://api.unsplash.com/search/photos",
          {
            params: {
              query,
              client_id: API_KEY,
              per_page: 16,
              page,
            },
          }
        );
        console.log("response.data.results :>> ", response.data.results);

        if (response.data.results.length === 0) {
          setLoadMore(false);
          toast.error("Зображення не знайдені!");
        } else {
          setImages((prev) => [...prev, ...response.data.results]);
          setLoadMore(page < response.data.total_pages);
        }
      } catch (error) {
        setErrorMessage(true);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [query, page]);

  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} />
      <Loader loading={loading} />
      <ImageGallery onImageClick={openModal} images={images} />
      <LoadMoreBtn handleLoadMore={handleLoadMore} loadMore={loadMore} />
      <ErrorMessage errorMessage={errorMessage} />
      <ImageModal
        isOpen={selectedImage}
        imageUrl={selectedImage}
        onClose={closeModal}
      />
    </div>
  );
}
