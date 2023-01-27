import './App.css';
import { useEffect, useState } from "react";
import { useSortedData } from "./hooks/useSortedData";
import { useFetching } from "./hooks/useFetching";
import TablePage from "./pages/TablePage";
import DataService from "./api/DataService";
import { flushSync } from "react-dom";

function App() {
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
    <div className="app">
      <TablePage data={sortedData}
                 resourceType={category}
                 selectedSort={selectedSort}
                 isLoading={isLoading}
                 dataError={dataError}
                 hasMoreData={hasMoreData}
                 onPageChange={onPageUpdate}
                 onResourceTypeChange={onChangeCategory}
                 onSetSelectedSort={setSelectedSort}/>
    </div>
  );
}

export default App;
