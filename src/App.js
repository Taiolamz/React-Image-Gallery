import "./App.css";
import { Suspense, lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import debounce from "debounce";
import { getImages } from "./redux/images";

const ReactPaginate = lazy(() => import("react-paginate"));

function App() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { images, loading } = useSelector((state) => state.image);
  const [page, setPage] = useState(1);
  const [filteredImages, setFilteredImages] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState("");

  const handleGetImages = async () => {
    const obj = {
      page: page,
      limit: itemsPerPage,
    };
    await dispatch(getImages(obj));
  };

  useEffect(() => {
    handleGetImages();
  }, [page, itemsPerPage]);

  useEffect(() => {
    setFilteredImages(images);
  }, [images]);

  const debouncedSearch = debounce((value) => {
    const searchTerm = value.toLowerCase();
    const filtered = images.filter((img) =>
      img.title.toLowerCase().includes(searchTerm)
    );
    setFilteredImages(filtered);
  }, 300);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    debouncedSearch(value);
  };

  const handlePageChange = ({ selected }) => {
    setPage(selected + 1);
    setItemsPerPage(12);
  };

  return (
    <>
    <div className="images">
      <h1>Hassan's Gallery</h1>
      <div className="images--searchbar">
        <input
          type="text"
          name="search"
          id="search"
          className="images--searchbar__input"
          placeholder="Search images"
          value={search}
          onChange={handleSearch}
        />
        <FaSearch className="search-icon" />
      </div>

      <div className="images--display">
        {loading ? (
          <div className="loader">
            <ClipLoader color="#710267" />
          </div>
        ) : filteredImages.length > 0 ? (
          filteredImages.map((chi, idx) => {
            const { albumId, id, thumbnailUrl, title, url } = chi;
            return (
              <div key={idx || albumId || id}>
                <div
                  className="images---grid__wrap"
                  onClick={() => window.open(thumbnailUrl, "_blank")}
                >
                  <img src={url} alt={title} />
                </div>
                <p>{title}</p>
              </div>
            );
          })
        ) : (
          <p style={{ fontWeight: "800" }}>No Image Found!</p>
        )}
      </div>
    </div>
      <div className="paginate-wrap">
        <Suspense fallback={<div>Loading...</div>}>
          <ReactPaginate
            pageCount={50}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            onPageChange={handlePageChange}
            containerClassName="pagination"
            pageLinkClassName="page-num"
            previousLinkClassName="page-num"
            nextLinkClassName="page-num-next"
            activeClassName="active"
            nextClassName="next-btn"
            previousClassName="prev-btn"
          />
        </Suspense>
      </div>
      </>
  );
}

export default App;
