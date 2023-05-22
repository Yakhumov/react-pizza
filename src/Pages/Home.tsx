import { useCallback, useRef } from "react";
import React, { useEffect } from "react";
import Sort from "../components/Sort";
import { list } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/Index";
import Catigories from "../components/Catigories";
import Pagination from "../components/Pagination";
import {  useSelector } from "react-redux";
import {
  setCategoryId,
  setPageCount,
  setFilters,
} from "../Redux/Slices/FilterSlice";
import qs from "qs";
import { Link, useNavigate } from "react-router-dom";
import { fetchPizza } from "../Redux/Slices/pizzaSlice"; 
import { SearchContext } from "../App";
import { useAppDispatch } from "../Redux/Slices/store";

const   Home: React.FC = ()=> {
  const navigate = useNavigate();
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const pageCount = useSelector((state) => state.filter.pageCount);
  const items = useSelector((state) => state.pizza.items); 
  const dispatch = useAppDispatch();
  const { searchValue } = React.useContext(SearchContext);    

  const isSearch = useRef(false);
  const isMount = useRef(false);

  const onClickCategory = useCallback((index: number) => {   
    dispatch(setCategoryId(index));
  }, []);

  const onChangePage = (number: number) => {
    dispatch(setPageCount(number));   
  };

  const Pizzas = () => {
    const sortBy = sortType.replace("-", "");
    const order = sortType.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `&category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";         

    dispatch(
      fetchPizza({
        sortBy,
        order,
        category,
        search,
        pageCount,      
      })
    );
  };

  useEffect(() => {
    if (isMount.current) {
      const queryString = qs.stringify({
        sortType,
        categoryId,
        pageCount,
      });
      navigate(`?${queryString}`);
    }

    isMount.current = true;
  }, [categoryId, sortType, pageCount]);

  useEffect(() => {
    if (!isSearch.current) {
       Pizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, pageCount]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      

      const sort = list.find((obj) => obj.sortType === params.sortProperty);
      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Catigories
          value={categoryId}
          onClickCategory={(id) => dispatch(setCategoryId(id))}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {items.filter((obj: any) => {   
            return obj.title.toLowerCase().includes(searchValue.toLowerCase());
          })
          .map((obj) => (
         <PizzaBlock {...obj} /> 
          ))}
      </div>
      <Pagination value={pageCount} onChangePage={onChangePage} />
    </div>
  );
}

export default Home;
