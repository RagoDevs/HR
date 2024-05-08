import React from "react";
import './Card.css'
import Total from '../../../../Assets/dash img/total em.png'
import present from '../../../../Assets/dash img/present.png'
import onleave from '../../../../Assets/dash img/onleave.png'

function Card() {
    return (
        <div className="dscards-wrapper">
            <div className="dscard-item">
                <div className="dscard-text">
                    <h4>
                        Total <br />
                        Employees
                    </h4>
                    <h3>200</h3>
                </div>
                <div className="dscard-icon">
                    <img src={Total} alt="" />
                </div>
            </div>
            <div className="dscard-item">
                <div className="dscard-text">
                    <h4>
                        Present <br />
                        Employees
                    </h4>
                    <h3>168</h3>
                </div>
                <div className="dscard-icon">
                    <img src={present} alt="" />
                </div>
            </div>
            <div className="dscard-item">
                <div className="dscard-text">
                    <h4>
                        Employees <br />
                        On Leave
                    </h4>
                    <h3>32</h3>
                </div>
                <div className="dscard-icon">
                    <img src={onleave} alt="" />
                </div>
            </div>
        </div>
    );
}

export default Card;
