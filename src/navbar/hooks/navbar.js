import { useState, useEffect, useRef } from "react";
import { getSearchResult, getIncludedSearchResult } from "../apis/navbar";
import useDebounce from "./debounce";
// import { useNavigate } from "react-router-dom";

export const useKeyword = () => {
  const [keyword, setKeyword] = useState("");
  // const navigate = useNavigate();

  const handleKeyword = (event) => {
    setKeyword(event.target.value);
  };

  const searchKeyword = async (event) => {
    event.preventDefault();
    const searchResult = await getSearchResult(keyword);
    if (searchResult.code === 404) {
      alert("해당 종목을 찾을 수 없습니다.");
      return;
    }
    console.log(searchResult.code);
    // navigate(`/detail?keyword=${searchResult.code}`); // 추후 router로 페이지 이동 작성
  };

  return { keyword, setKeyword, handleKeyword, searchKeyword };
};

export const useIncludedResults = (keyword) => {
  const [includedResults, setIncludedResults] = useState([]);
  const debouncedQuery = useDebounce(keyword, 500);

  async function fetchIncludedSearchResult() {
    const includedSearchResult = await getIncludedSearchResult(keyword);
    console.log(includedSearchResult);
    setIncludedResults(includedSearchResult || []);
  }

  useEffect(() => {
    fetchIncludedSearchResult();
  }, [debouncedQuery]);

  return includedResults;
};
