import React, { useCallback, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import './Table.css';

const Table = ({data, selectedSort, onSetSelectedSort, onPageChange, hasMoreData, isLoading}) => {
  const columns = {
    title: 'Title',
    comments_count: 'Comments',
    user: 'User',
    type: 'Type',
    points: 'Points',
    time: 'Time',
    time_ago: 'Time ago',
  }

  const renderHeadCell = (key) => {
    if (selectedSort.key === key) {
      return selectedSort.order ? <span className='arrow'/> : <span className='arrow arrow-top'/>
    }
  }

  const observer = useRef();
  const lastElement = useCallback(node => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMoreData) {
        onPageChange()
      }
    });

    if (node) observer.current.observe(node);
  }, [isLoading, hasMoreData])

  const timestampToDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const dateValues = [
      date.getMonth() + 1,
      date.getDate(),
      date.getFullYear()
    ];

    return dateValues.join('/');
  }

  const navigate = useNavigate();

  return (
    <table className="table">
      <thead className="table__thead">
      <tr className="table__row">
        {
          Object.entries(columns).map(([key, value]) => {
            return (
              <th className="table__header" key={key}
                  onClick={() => onSetSelectedSort({order: !selectedSort.order, key})}
              >
                <div className='table-cell'>
                  {value}
                  {renderHeadCell(key)}
                </div>
              </th>
            )
          })
        }
      </tr>
      </thead>

      <tbody>
      {data.map((item) => {
        return (
          <tr className="table__row" key={item.id} onClick={() => navigate(`/details/${item.id}`)}>
            <td className="table__data">{item.title}</td>
            <td className="table__data">{item.comments_count}</td>
            <td className="table__data">{item.user}</td>
            <td className="table__data">{item.type}</td>
            <td className="table__data">{item.points}</td>
            <td className="table__data">{timestampToDate(item.time)}</td>
            <td className="table__data">{item.time_ago}</td>
          </tr>
        )
      })}
      </tbody>
      <div ref={lastElement}/>
    </table>
  )
}

export default Table;
