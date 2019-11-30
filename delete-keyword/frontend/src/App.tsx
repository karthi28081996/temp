import React, { Component } from "react";
import "./App.css";

import Upload from "./components/upload/upload";
import Navbar from "./components/navBar/navBar";
import Table from "./components/tableContent/table";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component<any, any> {
  state = {
    showTable: false,
    tableData: [],
    hideAlertMessage: false
  };

  showTableFnParent = (value: any) => {
    this.setState({
      showTable: true,
      tableData: value
    });
  };
  render() {
    return (
      <div>
        <Navbar />
        <div className="App">
          <div className="card">
            <Upload {...this.state} showTableParent={this.showTableFnParent} />
          </div>
          {this.state.showTable && (
            <div className="card">
              <Table value={this.state.tableData} />
            </div>
          )}
        </div>
        <ToastContainer
          position="top-right"
          hideProgressBar={false}
          autoClose={7000}
          newestOnTop={true}
          closeOnClick={false}
          draggable={false}
          rtl={false}
        />
      </div>
    );
  }
}

export default App;
