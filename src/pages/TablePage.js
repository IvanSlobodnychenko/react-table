import React from "react";
import Header from "../components/Header";
import Table from "../components/Table";
import Loader from "../components/UI/Loader/Loader";
import './TablePage.css';

const TablePage = ({
                     data,
                     resourceType,
                     selectedSort,
                     isLoading,
                     dataError,
                     hasMoreData,
                     onPageChange,
                     onResourceTypeChange,
                     onSetSelectedSort
                   }) => {

  return (
    <>
      <Header resourceType={resourceType} onResourceTypeChange={onResourceTypeChange}/>

      {dataError && <div>Something is wrong: ${dataError}</div>}

      {data.length === 0 && !isLoading && !dataError && <div className="information">No data</div>}

      {data.length > 0 && <Table data={data} selectedSort={selectedSort} onSetSelectedSort={onSetSelectedSort} onPageChange={onPageChange} hasMoreData={hasMoreData} isLoading={isLoading}/>}
      {isLoading &&  <div className="flex-center"><Loader/></div>}
      {!hasMoreData && <div className="flex-center">No more data</div>}
    </>
  );
};

export default TablePage;
