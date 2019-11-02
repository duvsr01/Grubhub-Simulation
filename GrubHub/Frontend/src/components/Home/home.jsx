import React, { Component } from "react";

class Home extends Component {
  state = {};
  render() {
    return (
      <div className="card mb-3">
        <div className="row no-gutters">
          <div className="col">
            <img
              src="https://media-cdn.grubhub.com/image/upload/c_scale,w_1650/q_50,dpr_auto,f_auto,fl_lossy,c_crop,e_vibrance:20,g_center,h_900,w_800/v1534256595/Onboarding/Burger.jpg"
              className="card-img"
              alt="..."
            />
            <div className="carousel-caption">
              <h1 className="float-left">
                <span
                  style={{ fontfamily: "Courier New" }}
                  className="badge badge-danger,font-weight-bold"
                >
                  GrubHub
                </span>
              </h1>
            </div>
          </div>
          <div className="col">
            <div className="card-body">
              <div className="row no-gutters">
                <div className="col-sm-8">
                  <span
                    style={{ fontfamily: "BlinkMacSystemFont" }}
                    className="badge badge-danger"
                  >
                    <h1 className="card-title">GH</h1>
                  </span>
                  <div className="card-text">
                    <h5>Online food delivery</h5>
                  </div>
                </div>
                <div className="col-sm-4">
                  <a
                    href="/login"
                    style={{ fontfamily: "BlinkMacSystemFont" }}
                    className="ont-weight-bold"
                  >
                    <h4>SignIn</h4>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
