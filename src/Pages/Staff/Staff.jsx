import React from "react";
import logo from "../../Assets/images/logo.png";
import person from "../../Assets/employee/person.jpg";
import down from "../../Assets/images/download.png";
import out from '../../Assets/images/exit.png'
import wave from '../../Assets/staff/wave.png'
import check from '../../Assets/staff/check.png'
import "./staff.css";

function Staff() {
  return (
    <div className="staff">
      <div className="staff-header">
        <div className="header-mid">
          <div className="staff-logo">
            <img src={logo} alt="" />
            <div className="logo-title">
              <h3>SJUI</h3>
              <p>Staff</p>
            </div>
          </div>
          <div className="staff-logout">
            <img src={out} alt="" />
            <h4>LOGOUT</h4>
          </div>
        </div>
      </div>
      <div className="staff-main">
        <div className="staff-container">
          <div className="title-wrapper">
            <img src={wave} alt="" />
            <h3>Welcome John</h3>
          </div>
          <div className="staff-profile">
            <div className="profile-header">
              <img src={person} alt="" />
              <div className="profile-title">
                <h3>John Doe</h3>
                <h5>Administrator</h5>
              </div>
            </div>
            <div className="staff-contacts">
              <div className="contact-wrapper">
                <div className="wr-min">
                  <h4>Phone Number</h4>
                  <p>0712345678</p>
                </div>
                <div className="wr-min">
                  <h4>Email </h4>
                  <p>johndoe@email.com</p>
                </div>
              </div>
              <div className="contact-wrapper">
                <div className="wr-min">
                  <h4>Address</h4>
                  <p>House 1, Kikuyu, Dodoma</p>
                </div>
              </div>
            </div>
            <div className="staff-contract">
              <div className="contract-header">
                <h4>
                  Looking for your contract?
                  <span>Here is the stored pdf of your contract</span>
                </h4>
              </div>
              <button>
                <img src={down} alt="" />
                <h4>View Contract</h4>
              </button>
            </div>
          </div>
        </div>
        <div className="staff-container">
          <div className="staff-leave">
            <div className="sflv-header">
              <h4>Leave Requests</h4>
            </div>
            <div className="lv-history">
              <table>
                <tr>
                  <td>
                    <h5>Jun 1, 2023 - Jun 3, 2023</h5>
                    <p>Annual leave</p>
                  </td>
                  <td>
                    <img src={check} alt="" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <h5>Jun 1, 2023 - Jun 3, 2023</h5>
                    <p>Annual leave</p>
                  </td>
                  <td>
                    <img src={check} alt="" />
                  </td>
                </tr>
              </table>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Staff;
