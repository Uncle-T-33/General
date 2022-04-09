import { useEffect, useReducer } from "react";
import useHttpReducer from "./useHttpReducer";

const initialState = {
  posts: [],
};

const postReducer = (curState, action) => {
  switch (action.type) {
    case "GET_POSTS":
      return {
        ...curState,
        posts: action.posts,
      };
    case "CLEAR":
      return initialState;
    default:
      throw new Error("Should not be reached!");
  }
};

function DemoHttpReducer() {
  const [postsState, dispatchPosts] = useReducer(postReducer, initialState);
  const { isLoading, data, error, sendRequest: fetchPosts } = useHttpReducer();

  useEffect(() => {
    fetchPosts({ url: "https://animechan.vercel.app/api/quotes" });
  }, [fetchPosts]);

  useEffect(() => {
    if (!isLoading && !error && data) {
      dispatchPosts({ type: "GET_POSTS", posts: data });
    }
  }, [data, error, isLoading]);

  return (
    <div className="col-md-12">
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        postsState.posts &&
        postsState.posts.map((el) => (
          <div key={el.quote} className="shadow  border border-light mb-4">
            <div className="card-body">
              <h5 className="card-title">{el.character}</h5>
              <p className="card-text">{el.quote}</p>
              <div className="badge badge-secondary p-2">{el.anime}</div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default DemoHttpReducer;
