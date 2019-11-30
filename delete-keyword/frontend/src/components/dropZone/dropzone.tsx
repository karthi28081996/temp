import * as React from "react";
import "./dropzone.css";

import uploadImg from "./../../media/images/upload.png";
import alert from "./../alert/alert";

class dropzone extends React.Component<any, any> {
  fileInputRef: any;
  constructor(props: any) {
    super(props);
    this.state = { highlight: false };
    this.fileInputRef = React.createRef();
    this.openFileDailog = this.openFileDailog.bind(this);
    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
  }
  onDragOver(evt: any) {
    evt.preventDefault();
    if (this.props.disabled) return;
    this.setState({ highlight: true });
  }
  onDrop(evt: any) {
    evt.preventDefault();
    if (this.props.disabled) return;
    const files = evt.dataTransfer.files;
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files);
      this.props.onFilesAdded(array);
    }
    this.setState({ highlight: false });
  }
  onDragLeave() {
    this.setState({ highlight: false });
  }
  openFileDailog() {
    if (this.props.disabled) return;
    this.fileInputRef.current.click();
  }
  fileListToArray(files: any) {
    const array: any = [];
    for (var i = 0; i < files.length; i++) {
      array.push(files.item(i));
    }
    return array;
  }
  onFilesAdded(evt: any) {
    if (this.props.diabled) return;

    const files = evt.target.files;
    const fileSplit = files[0].name.split(".");
    const fileExtension = fileSplit[fileSplit.length - 1];
    console.log(fileExtension);
    if (
      fileExtension !== "xlsx" &&
      fileExtension !== "csv" &&
      fileExtension !== "xls"
    ) {
      alert.notifyError(
        "Please check the file as only csv,xlsx,xls file extension are allowes"
      );
      return false;
    }
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files);

      this.props.onFilesAdded(array);
    }
  }
  render() {
    return (
      <div
        className={`dropZone ${this.state.highlight ? "highlight" : ""}`}
        onClick={this.openFileDailog}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
        style={{ cursor: this.props.disabled ? "default" : "pointer" }}
      >
        <img alt="upload" className="icon" src={uploadImg}></img>
        <input
          type="file"
          ref={this.fileInputRef}
          className="fileInput"
          accept=".xls, .xlsx, .csv"
          onChange={this.onFilesAdded}
        ></input>
        <span>Upload Files</span>
      </div>
    );
  }
}

export default dropzone;
