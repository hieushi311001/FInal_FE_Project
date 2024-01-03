// import "./Test.css";
import React, { useState } from "react";
function Test() {
  return (
    <div className="row">
      <div className="col-lg-9 right">
        <div className="box shadow-sm rounded bg-white mb-3">
          <div className="box-title border-bottom p-3">
            <h6 className="m-0">Recent</h6>
          </div>
          <div className="box-body p-0">
            <div className="p-3 d-flex align-items-center bg-light border-bottom osahan-post-header">
              <div className="dropdown-list-image mr-3">
                <img
                  className="rounded-circle"
                  src="https://bootdey.com/img/Content/avatar/avatar3.png"
                  alt=""
                />
              </div>
              <div className="font-weight-bold mr-3">
                <div className="text-truncate">DAILY RUNDOWN: WEDNESDAY</div>
                <div className="small">
                  Income tax sops on the cards, The bias in VC funding, and
                  other top news for you
                </div>
              </div>
              <span className="ml-auto mb-auto">
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-light btn-sm rounded"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="mdi mdi-dots-vertical" />
                  </button>
                  <div className="dropdown-menu dropdown-menu-right">
                    <button className="dropdown-item" type="button">
                      <i className="mdi mdi-delete" /> Delete
                    </button>
                    <button className="dropdown-item" type="button">
                      <i className="mdi mdi-close" /> Turn Off
                    </button>
                  </div>
                </div>
                <br />
                <div className="text-right text-muted pt-1">3d</div>
              </span>
            </div>
          </div>
        </div>
        <div className="box shadow-sm rounded bg-white mb-3">
          <div className="box-title border-bottom p-3">
            <h6 className="m-0">Earlier</h6>
          </div>
          <div className="box-body p-0">
            <div className="p-3 d-flex align-items-center border-bottom osahan-post-header">
              <div className="dropdown-list-image mr-3 d-flex align-items-center bg-danger justify-content-center rounded-circle text-white">
                DRM
              </div>
              <div className="font-weight-bold mr-3">
                <div className="text-truncate">DAILY RUNDOWN: MONDAY</div>
                <div className="small">
                  Nunc purus metus, aliquam vitae venenatis sit amet, porta non
                  est.
                </div>
              </div>
              <span className="ml-auto mb-auto">
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-light btn-sm rounded"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="mdi mdi-dots-vertical" />
                  </button>
                  <div className="dropdown-menu dropdown-menu-right" style={{}}>
                    <button className="dropdown-item" type="button">
                      <i className="mdi mdi-delete" /> Delete
                    </button>
                    <button className="dropdown-item" type="button">
                      <i className="mdi mdi-close" /> Turn Off
                    </button>
                  </div>
                </div>
                <br />
                <div className="text-right text-muted pt-1">3d</div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Test;
