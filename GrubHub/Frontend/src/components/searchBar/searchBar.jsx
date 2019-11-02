import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import axios from "axios";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    //maintain the state required for this component
    this.state = {
      current: 1,
      noOfOptions: 4,
      ResultObj: [],
      data: {
        Search: "",
        Cuisine: ""
      }
    };
    //Bind the handlers to this class
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleCuisineChange = this.handleCuisineChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    //make a post request with the user data
    axios
      .get("http://localhost:3500/api/restaurants/getRst")
      .then(response => {
        console.log(response);
        this.setState({
          ResultObj: this.state.ResultObj.concat(response.data.msg)
        });

        console.log("ResultObj is" + JSON.stringify(this.state.ResultObj));
      })
      .catch(error => {
        console.log("Error Occured", error);
      });
  }

  PageChangeHandler = e => {
    this.setState({
      current: Number(e.target.id)
    });
  };

  handleSearchChange = e => {
    this.setState({
      Search: e.target.value
    });
  };

  handleCuisineChange = e => {
    this.setState({
      Cuisine: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();

    console.log("Search data");
    const data = {
      Search: this.state.Search,
      Cuisine: this.state.Cuisine
    };
    console.log("data is" + JSON.stringify(data));

    axios
      .post("http://localhost:3500/api/restaurants/searchItem", data)
      .then(response => {
        this.setState({
          ResultObj: []
        });
        this.setState({
          ResultObj: this.state.ResultObj.concat(response.data)
        });
      });
    console.log(this.state.ResultObj);
  };

  render() {
    const { ResultObj, current, noOfOptions } = this.state;
    const lastIndex = current * noOfOptions;
    const firstIndex = lastIndex - noOfOptions;
    const currentOption = ResultObj.slice(firstIndex, lastIndex);
    console.log("currentOption" + currentOption);
    let currentO = this.state.current;
    let noOfOption = this.state.noOfOptions;

    // if (!this.state.logged) {
    //   return <Redirect to="/welcomePage" />;
    // }

    let details = currentOption.map((ResultObj, i) => {
      console.log("ResultObj" + ResultObj.res_name);
      return (
        <div
          key={i}
          className="row"
          style={{ margin: "50px", height: "200px", width: "700px" }}
        >
          <div
            style={{
              height: "200px",
              width: "200px",
              border: "solid 1px lightgrey"
            }}
          ></div>

          <Link
            to={{
              pathname: "/searchDetails",
              state: {
                resID: ResultObj._id,
                resName: ResultObj.res_name
              },
              target: "_blank"
            }}
          >
            <div
              style={{
                height: "200px",
                width: "500px",
                border: "solid 1px lightgrey"
              }}
            >
              <div style={{ height: "150px" }}>
                <span
                  style={{
                    height: "20px",
                    width: "100%",
                    color: "#353e44",
                    fontSize: "20px",
                    fontWeight: "700",
                    padding: "20px 10px"
                  }}
                >
                  {ResultObj.res_name}
                </span>
                <br />
                <span
                  style={{
                    height: "20px",
                    width: "10px",
                    color: "#353e44",
                    fontSize: "16px",
                    fontWeight: "600",
                    padding: "20px 5px"
                  }}
                >
                  {ResultObj.phone}
                </span>
                <span
                  style={{
                    height: "20px",
                    width: "10px",
                    color: "#353e44",
                    fontSize: "16px",
                    fontWeight: "500",
                    padding: "20px 5px"
                  }}
                ></span>
              </div>
            </div>
          </Link>
        </div>
      );
    });

    const pageNo = [];
    for (let i = 1; i <= Math.ceil(ResultObj.length / noOfOptions); i++) {
      pageNo.push(i);
    }

    return (
      <div>
        <ul className="list-group  border-white">
          <li className="list-group-item border border-white">
            <form className="form-inline my-4 my-lg-0 justify-content-center">
              <input
                onChange={this.handleSearchChange}
                value={this.state.search}
                className="form-control mr-md-4 SearchBar-input"
                type="search"
                placeholder="Pizza,Sushi...."
                aria-label="Search"
                style={{
                  borderradius: "4px",
                  height: "56px",
                  margin: "5px",
                  width: "230px"
                }}
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
                onClick={this.handleSubmit}
                style={{
                  height: "60px",
                  margin: "5px",
                  width: "150px",
                  borderradius: "40px",
                  backgroundColor: "#0067db",
                  borderColor: "#0067db",
                  color: "white"
                }}
              >
                Search
              </button>
              <div>
                <br />
              </div>
              <input
                onChange={this.handleCuisineChange}
                value={this.state.Cuisine}
                className="form-control mr-md-4 SearchBar-input"
                type="search"
                placeholder="Cuisine...."
                aria-label="Cusine"
                style={{
                  borderradius: "4px",
                  height: "56px",
                  margin: "5px",
                  width: "230px"
                }}
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
                onClick={this.handleSubmit}
                style={{
                  height: "60px",
                  margin: "5px",
                  width: "150px",
                  borderradius: "40px",
                  backgroundColor: "#0067db",
                  borderColor: "#0067db",
                  color: "white"
                }}
              >
                Filter
              </button>
            </form>
          </li>
        </ul>
        <ul></ul>
        {details}
        Pages
        <nav>
          <ul className="pagination">
            {pageNo.map(number => (
              <li key={number} className="page-item">
                <a
                  className="page-link"
                  key={number}
                  id={number}
                  onClick={this.PageChangeHandler}
                >
                  {number}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    );
  }
}

export default SearchBar;
