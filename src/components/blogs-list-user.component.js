import React, { Component } from "react";
import BlogDataService from "../services/blog.service";
// import { Link } from "react-router-dom";
export default class BlogsListUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveBlogs = this.retrieveBlogs.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveBlog = this.setActiveBlog.bind(this);
    this.removeAllBlogs = this.removeAllBlogs.bind(this);
    // this.searchTitle = this.searchTitle.bind(this);
    this.state = {
      blogs: [],
      currentBlog: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }
  componentDidMount() {
    this.retrieveBlogs();
  }
  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;
    this.setState({
      searchTitle: searchTitle
    });
  }
  retrieveBlogs() {
    BlogDataService.getAll()
      .then(response => {
        this.setState({
          blogs: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  refreshList() {
    this.retrieveBlogs();
    this.setState({
      currentBlog: null,
      currentIndex: -1
    });
  }
  setActiveBlog(blog, index) {
    this.setState({
      currentBlog: blog,
      currentIndex: index
    });
  }
  removeAllBlogs() {
    BlogDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }
//   searchTitle() {
//     BlogDataService.findByTitle(this.state.searchTitle)
//       .then(response => {
//         this.setState({
//           blogs: response.data
//         });
//         console.log(response.data);
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   }
  render() {
    const {  blogs, currentBlog, currentIndex } = this.state;
    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            {/* <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            /> */}
            {/* <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div> */}
          </div>
        </div>
        <div className="col-md-6">
          <h4>Blogs List</h4>
          <ul className="list-group">
            {blogs &&
              blogs.map((blog, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveBlog(blog, index)}
                  key={index}
                >
                  {blog.title}
                </li>
              ))}
          </ul>
          {/* <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllBlogs}
          >
            Remove All
          </button> */}
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
              {/* <Link
                to={"/blog/" + currentBlog.id}
                className="badge badge-warning"
              >
                Edit
              </Link> */}
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
  }

}