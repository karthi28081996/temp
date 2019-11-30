import * as React from "react";
import ReactCollapsingTable from "react-collapsing-table";
import "./table.css";

import alert from "./../alert/alert";

class table extends React.Component {
  state = {
    showTable: true
  };
  alertSuccess() {
    alert.notifySuccess("Deleted successfully");
  }

  render() {
    let keys = Object.keys(this.props.value.data[0]);
    let columns = [];
    let rows = this.props.value.data;

    keys.forEach(element => {
      let tempObj = {
        accessor: element,
        label: element,
        priorityLevel: 1,
        position: 1
      };
      columns.push(tempObj);
    });

    if (keys.length > 2) {
      alert.notifyError(
        "please provide excel file with exactly two parameters"
      );
      return (
        <div>
          <h1>
            Table can't be loaded as this excel file contains more than 2
            columns or irrelavent column names.Please upload correct formatted
            excel !!!!
          </h1>
        </div>
      );
    } else {
      return (
        <div className="content">
          <ReactCollapsingTable
            rows={rows}
            columns={columns}
            rowSize="4000"
          ></ReactCollapsingTable>
          <button className="delete" onClick={this.alertSuccess}>
            Delete data from database
          </button>
        </div>
      );
    }
  }
}

export default table;
