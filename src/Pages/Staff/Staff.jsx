import React, { useState, useEffect } from "react";
import logo from "../../Assets/images/logo.png";
import person from "../../Assets/employee/person.jpg";
import down from "../../Assets/images/download.png";
import out from '../../Assets/images/exit.png'
import wave from '../../Assets/staff/wave.png'
import check from '../../Assets/staff/check.png'
import "./staff.css";
import { useAuth} from '../../RoutesAuth/AuthProvider'


function Staff() {
  const { employeeId } = useAuth();
  const token = localStorage.getItem('siteToken')

  const [staff, setStaff] = useState('')

  useEffect(() => {
    fetch(`https://hrbe.eadevs.com/auth/employees/${employeeId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log('fetched', data)
        setStaff(data);
      })

      .catch(error => console.error('error fetching details', error));

}, [employeeId, token]);

return (
  <div className="staff">
    <div className="staff-header">
      <div className="header-mid">
        <div className="staff-logo">
          <img src={logo} alt="" />
          <div className="logo-title">
            <h3>SJUT</h3>
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
          <h3>Welcome {staff.employee_name}</h3>
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
        <div className="staff-announce">
          <h4>Announcements</h4>
          <div className="st-announce-list">
            <div className="st-ann-wrapper"></div>
            <div className="st-ann-wrapper"></div>
          </div>
        </div>

        <div className="staff-leave">
          <div className="sflv-header">
            <h4>Manage Leaves</h4>
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
          <div className="see-history">
            <h5>See history</h5>
          </div>
          <div className="st-lv-button">
            <button><h4>Request Leave</h4></button>
            <button><h4>Status</h4></button>
          </div>

        </div>
      </div>
    </div>
  </div>
);
}

export default Staff;
