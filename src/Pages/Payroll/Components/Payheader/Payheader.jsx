import React from 'react'
import './Payheader.css'

function Payheader() {
    return (
        <>
            <div class="form-container">
                <select id="station" name="station">
                    <option value="" disabled selected>please select</option>
                    <option value="station1">Station 1</option>
                    <option value="station2">Station 2</option>
                    <option value="station3">Station 3</option>
                </select>

                <select id="payroll-period" name="payroll-period">
                    <option value="" disabled selected>please select</option>
                    <option value="period1">Payroll Period 1</option>
                    <option value="period2">Payroll Period 2</option>
                    <option value="period3">Payroll Period 3</option>
                </select>

                <input type="text" id="salary-slip-title" name="salary-slip-title" placeholder="Salary Slip Title" />
            </div>

        </>
    )
}

export default Payheader
