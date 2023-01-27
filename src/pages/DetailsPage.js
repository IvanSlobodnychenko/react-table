import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './DetailsPage.css';
import { useFetching } from "../hooks/useFetching";
import DataService from "../api/DataService";
import Loader from "../components/UI/Loader/Loader";

const DetailsPage = () => {
  const [data, setData] = useState({});
  const {id} = useParams();

  const [getData, isLoading, dataError] = useFetching(async () => {
    const response = await DataService.getDetails(id);
    setData(response.data);
  });

  useEffect(() => {
    getData();
  }, [])

  const timestampToDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const dateValues = [
      date.getMonth() + 1,
      date.getDate(),
      date.getFullYear()
    ];

    return dateValues.join('/');
  }

  const renderComment = (comment) => {
    return (
      <div className="comment">
        <div className="comment-inner">
          <p>User name: {comment.name}</p>
          {comment?.content &&
            <>
              <p>Content: </p>
              <div dangerouslySetInnerHTML={{__html: comment.content}}/>
            </>
          }
          <p>Time: {timestampToDate(data?.time)}</p>
          <p>Last visit: {data?.time_ago}</p>

          {comment?.comments && renderComments(comment?.comments)}
        </div>
      </div>
    )
  }

  const renderComments = (comments) => {
    if (comments?.length) {
      return comments.map((comment) => renderComment(comment));
    }
  }

  return (
    <div className='container'>
      {dataError && <div>Something is wrong: ${dataError}</div>}

      {!isLoading &&
        <div>
          <div className="text-center">
            <h1 className='title'>{data?.title}</h1>
          </div>
          <h2>User name: {data?.user}</h2>
          <p>Time: {timestampToDate(data?.time)}</p>
          <p>Last visit: {data?.time_ago}</p>

          {data?.content &&
            <>
              <p>Description: </p>
              <div dangerouslySetInnerHTML={{__html: data.content}}/>
            </>
          }

          {data?.comments &&
            <div>
              <h3>Comments: </h3>
              {renderComments(data?.comments)}
            </div>
          }
        </div>
      }

      {isLoading && <div className="flex-center"><Loader/></div>}
    </div>
  )
}

export default DetailsPage;
