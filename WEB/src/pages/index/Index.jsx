import { memo, useCallback, useEffect, useRef, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Header } from "../../components/Header";
import { Filter } from "./components/Filter";
import { Main } from "./components/Main";
import dataDe from "../../utils/data/data.json";
import { Select } from "../../components/Select";
import { TextField, Button } from "@mui/material";

import { getAllPost, getFindPost, getSearchPost } from "../../store/slice/postSlice";
import { useDispatch, useSelector } from "react-redux";

export const Index = memo(() => {
  const dispatch = useDispatch();
  const [dataFilter, setDataFilter] = useState({
    title: "",
    price: { min: 0, max: 0 },
    square: { min: 0, max: 0 },
    direct: "",
    province: "",
  });
  const [title, setTitle] = useState("2");
  const [text, setText] = useState("");

  // Track whether the user is in search mode
  const [isSearching, setIsSearching] = useState(false);
  // Use a ref to always have the latest dataFilter in handlePage
  const dataFilterRef = useRef(dataFilter);
  dataFilterRef.current = dataFilter;

  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
    handlePage(value);
  };

  const data = useSelector((state) => state.post.listItem);
  const totalPages = useSelector((state) => state.post.totalPages);
  // const pageNumber = useSelector((state) => state.post.pageNumber);

  // const pages = Array(totalPages);

  const handlePage = useCallback((value) => {
    if (isSearching) {
      // When in search mode, paginate with the same search filters
      const currentFilter = dataFilterRef.current;
      const pf = currentFilter.price;
      const sf = currentFilter.square;
      dispatch(
        getSearchPost({
          title: currentFilter.title || "",
          province: currentFilter.province || "",
          direct: currentFilter.direct || "",
          minPrice: pf && pf.min > 0 ? pf.min : null,
          maxPrice: pf && pf.max ? pf.max : null,
          minSquare: sf && sf.min > 0 ? sf.min : null,
          maxSquare: sf && sf.max ? sf.max : null,
          page: value - 1,
          limit: 10,
        })
      );
    } else {
      // Normal mode: fetch all posts
      dispatch(
        getAllPost({
          page: value - 1,
          limit: 10,
        })
      );
    }
  }, [isSearching, dispatch]);

  const handleChangeDataFilter = useCallback((keyName, value) => {
    setDataFilter((state) => {
      return {
        ...state,
        [keyName]: value,
      };
    });
    console.log(dataFilter);
  });

  const searchPost = async () => {
    console.log("search with filters:", dataFilter);

    // Mark as searching and reset to page 1
    setIsSearching(true);
    setPage(1);

    // price dropdown value is the minimum in tỷ (e.g. 1.5 → minPrice=1.5, maxPrice=2)
    // square dropdown value is the minimum in m² (e.g. 50 → minSquare=50)
    const pf = dataFilter.price;
    const sf = dataFilter.square;
    dispatch(
      getSearchPost({
        title: dataFilter.title || "",
        province: dataFilter.province || "",
        direct: dataFilter.direct || "",
        minPrice: pf && pf.min > 0 ? pf.min : null,
        maxPrice: pf && pf.max ? pf.max : null,
        minSquare: sf && sf.min > 0 ? sf.min : null,
        maxSquare: sf && sf.max ? sf.max : null,
        page: 0,
        limit: 10,
      })
    );
  };

  useEffect(() => {
    dispatch(
      getAllPost({
        page: 0,
        limit: 10,
      })
    );
  }, []);

  return (
    <div className="index">
      <Header />
      <Filter
        dataFilter={dataFilter}
        handleChangeDataFilter={handleChangeDataFilter}
        handleSubmit={searchPost}
      />

      <div className="content">
        <Main data={data} />
      </div>
      <div className="foooter my-5">
        <nav aria-label="..." className="d-flex justify-content-center">
          <Stack spacing={2}>
            {/* <Typography>Page: {page}</Typography> */}
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChange}
            />
          </Stack>
          {/* <ul className="pagination">
            <li className="page-item">
              <button
                className={"page-link" + (pageNumber == 1 ? " disabled" : "")}
                onClick={handlePreviousPage}
              >
                Previous
              </button>
            </li>
            {pageNumber > 1 && (
              <li className="page-item">
                <button className="page-link" onClick={handleNavigatePage(1)}>
                  1
                </button>
              </li>
            )}

            {pageNumber > 2 && (
              <>
                {pageNumber > 3 && (
                  <li className="page-item">
                    <button className="page-link">...</button>
                  </li>
                )}
                <li className="page-item ">
                  <button
                    className="page-link"
                    onClick={handleNavigatePage(pageNumber - 1)}
                  >
                    {pageNumber - 1}
                  </button>
                </li>
              </>
            )}
            <li className="page-item active">
              <button
                className="page-link"
                onClick={handleNavigatePage(pageNumber)}
              >
                {pageNumber}
              </button>
            </li>

            {pageNumber < totalPages - 1 && (
              <>
                <li className="page-item">
                  <button
                    className="page-link"
                    onClick={handleNavigatePage(pageNumber + 1)}
                  >
                    {pageNumber + 1}
                  </button>
                </li>
                {pageNumber < totalPages - 2 && (
                  <li className="page-item ">
                    <button className="page-link">...</button>
                  </li>
                )}
              </>
            )}

            {pageNumber < totalPages && (
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={handleNavigatePage(totalPages)}
                >
                  {totalPages}
                </button>
              </li>
            )}

            <li className="page-item">
              <button
                className={
                  "page-link" + (pageNumber == totalPages ? " disabled" : "")
                }
                onClick={handleNextPage}
              >
                Next
              </button>
            </li>
          </ul> */}
        </nav>
      </div>
    </div>
  );
});
