import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Table from "../components/Table";
import Loader from "../components/UI/Loader/Loader";
import './TablePage.css';
import { flushSync } from "react-dom";
import DataService from "../api/DataService";
import { useFetching } from "../hooks/useFetching";
import { useSortedData } from "../hooks/useSortedData";

const TablePage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("news");
  const [selectedSort, setSelectedSort] = useState({order: true, key: ''});
  const [hasMoreData, setHasMoreData] = useState(true);

  const sortedData = useSortedData(data, selectedSort.order, selectedSort.key);

  const [getData, isLoading, dataError] = useFetching(async () => {
    if (hasMoreData) {
      console.log('category:', category, '; page:', page);
      const response = await DataService.getAll(category, page);

      if (!response.data.length) {
        setHasMoreData(false);
      }

      if (page === 1) {
        setData(response.data);
      } else {
        setData([...data, ...response.data]);
      }
    }
  });

  useEffect(() => {
    console.log('category effect');
    getData();
  }, [category])

  useEffect(() => {
    if (page !== 1) {
      getData();
    }
  }, [page])

  const onChangeCategory = (category) => {
    flushSync(() => {
      setPage(1);
      setData([]);
      setHasMoreData(true);
      setSelectedSort({order: true, key: ''});
    });
    setCategory(category)
  };

  const onPageUpdate = () => {
    console.log('onPageUpdate');
    setPage(prevState => prevState + 1);
  }

  return (
    <>
      <Header resourceType={category} onResourceTypeChange={onChangeCategory}/>

      {dataError && <div>Something is wrong: ${dataError}</div>}

      {sortedData.length > 0 &&
        <Table data={sortedData} selectedSort={selectedSort} onSetSelectedSort={setSelectedSort}
               onPageChange={onPageUpdate}
               hasMoreData={hasMoreData} isLoading={isLoading}/>}

      {isLoading && <div className="flex-center"><Loader/></div>}
      {!hasMoreData && <div className="flex-center">No more data</div>}
    </>
  );
};

export default TablePage;
