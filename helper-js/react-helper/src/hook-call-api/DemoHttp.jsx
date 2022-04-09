import { useEffect, useState } from "react";
import useHttp from "./useHttp";

function DemoHttp() {
  const [posts, setPosts] = useState([]);

  const { isLoading, sendRequest: fetchPosts } = useHttp();

  useEffect(() => {
    const handleData = (posts) => {
      setPosts(posts);
    };

    fetchPosts({ url: "https://animechan.vercel.app/api/quotes" }, handleData);
  }, [fetchPosts]);

  return (
    <div className="col-md-12">
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        posts &&
        posts.map((el) => (
          <div key={el.quote} className="shadow  border border-light mb-4">
            <div className="card-body">
              <h5 className="card-title">{el.anime}</h5>
              <p className="card-text">{el.quote}</p>
              <span className="badge badge-secondary p-2">{el.anime}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default DemoHttp;
