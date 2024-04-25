import React from "react";
import "./Table.css";

function Table() {
    return (
        <div className="dash-table">
            <table>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Job Title</th>
                    <th>Department</th>
                    <th>Status</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>John Doe</td>
                    <td>Administrator</td>
                    <td>
                        <h4>Administration</h4>
                    </td>
                    <td>Present</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>John Doe</td>
                    <td>Administrator</td>
                    <td>
                        <h4>Administration</h4>
                    </td>
                    <td>Present</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>John Doe</td>
                    <td>Administrator</td>
                    <td>
                        <h4>Administration</h4>
                    </td>
                    <td>Present</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>John Doe</td>
                    <td>Administrator</td>
                    <td>
                        <h4>Administration</h4>
                    </td>
                    <td>Present</td>
                </tr>
            </table>
        </div>
    );
}

export default Table;
