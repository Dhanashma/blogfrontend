import React, { Component } from "react";
import BlogDataService from "../services/blog.service";
export default class Blog extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getBlog = this.getBlog.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateBlog = this.updateBlog.bind(this);
    this.deleteBlog = this.deleteBlog.bind(this);
    this.state = {
      currentBlog: {
        id: null,
        name:"",
        title: "",
        description: "",
        published: false
      },
      message: ""
    };
  }
  componentDidMount() {
    this.getBlog(this.props.match.params.id);
  }
  onChangeTitle(e) {
    const title = e.target.value;
    this.setState(function(prevState) {
      return {
        currentBlog: {
          ...prevState.currentBlog,
          title: title
        }
      };
    });
  }
  onChangeName(e) {
    const name = e.target.value;
    this.setState(function(prevState) {
      return {
        currentBlog: {
          ...prevState.currentBlog,
          name: name
        }
      };
    });
  }
  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentBlog: {
        ...prevState.currentBlog,
        description: description
      }
    }));
  }
  getBlog(id) {
    BlogDataService.get(id)
      .then(response => {
        this.setState({
          currentBlog: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  updatePublished(status) {
    var data = {
      id: this.state.currentBlog._id,
      name: this.state.currentBlog.name,
      title: this.state.currentBlog.title,
      description: this.state.currentBlog.description,
      published: status
    };
    BlogDataService.update(this.state.currentBlog._id, data)
      .then(response => {
        this.setState(prevState => ({
          currentBlog: {
            ...prevState.currentBlog,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  updateBlog() {
    BlogDataService.update(
      this.state.currentBlog._id,
      this.state.currentBlog
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The blog was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }
  deleteBlog() {    
    BlogDataService.delete(this.state.currentBlog._id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/blogs')
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    const { currentBlog } = this.state;
    return (
      <div>
        {currentBlog ? (
          <div className="edit-form">
            <h4>Blog</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentBlog.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
            <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentBlog.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentBlog.published ? "Published" : "Pending"}
              </div>
            </form>
            {currentBlog.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}
            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteBlog}
            >
              Delete
            </button>
            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateBlog}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Blog...</p>
          </div>
        )}
      </div>
    );
  }
}
