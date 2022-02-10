import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  retrieveBlogs,
  findBlogsByTitle,
  deleteAllBlogs,
} from "../actions/blogs";
const BlogsList = () => {
  const [currentBlog, setCurrentBlog] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");
  const blogs = useSelector(state => state.blogs);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(retrieveBlogs());
  }, []);
  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };
  const refreshData = () => {
    setCurrentBlog(null);
    setCurrentIndex(-1);
  };
  const setActiveBlog = (Blog, index) => {
    setCurrentBlog(Blog);
    setCurrentIndex(index);
  };
  const removeAllBlogs = () => {
    dispatch(deleteAllBlogs())
      .then(response => {
        console.log(response);
        refreshData();
      })
      .catch(e => {
        console.log(e);
      });
  };
  const findByTitle = () => {
    refreshData();
    dispatch(findBlogsByTitle(searchTitle));
  };
  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Blogs List</h4>
        <ul className="list-group">
          {blogs &&
            blogs.map((Blog, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveBlog(Blog, index)}
                key={index}
              >
                {Blog.title}
              </li>
            ))}
        </ul>
        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllBlogs}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentBlog ? (
          <div>
            <h4>Blog</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentBlog.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentBlog.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentBlog.published ? "Published" : "Pending"}
            </div>
            <Link
              to={"/blogs/" + currentBlog.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Blog...</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default BlogsList;