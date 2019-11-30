import * as React from "react";
import "./upload.css";
import Dropzone from "./../dropZone/dropzone";
import Progress from "./../progress/progress";

export interface uploadProps {
  showTableParent: any;
}

export interface uploadState {
  uploading: any;
  successfullUploaded: any;
  files: any;
  uploadProgress: any;
  showTable: boolean;
  tableData: [];
}

class upload extends React.Component<uploadProps, uploadState> {
  constructor(props: any) {
    super(props);
    this.state = {
      showTable: false,
      tableData: [],
      uploading: false,
      successfullUploaded: false,
      files: [],
      uploadProgress: {}
    };

    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
  }
  onFilesAdded(files: any) {
    this.setState({ files });
  }

  renderProgress(files: any) {
    const uploadProgress: any = this.state.uploadProgress[files.name];
    if (this.state.uploading || this.state.successfullUploaded) {
      return (
        <div className="progressWrapper">
          <Progress
            progress={uploadProgress ? uploadProgress.percentage : 0}
          ></Progress>
          <img
            className="checkIcon"
            alt="done"
            src="https://png.pngtree.com/element_our/sm/20180515/sm_5afb099d307d3.jpg"
            style={{
              opacity:
                uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
            }}
          ></img>
        </div>
      );
    }
  }

  renderActions() {
    if (this.state.successfullUploaded) {
      return (
        <button
          onClick={() =>
            this.setState({ files: [], successfullUploaded: false })
          }
        >
          Clear
        </button>
      );
    } else {
      return (
        <button
          disabled={this.state.files.length <= 0 || this.state.uploading}
          onClick={this.uploadFiles}
        >
          {this.state.files.length <= 0 || this.state.uploading
            ? "click above to choose file"
            : "Click here to upload"}
        </button>
      );
    }
  }

  sendRequest(file: any) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();
      req.upload.addEventListener("progress", event => {
        if (event.lengthComputable) {
          const copy = { ...this.state.uploadProgress };
          copy[file.name] = {
            state: "pending",
            percentage: (event.loaded / event.total) * 100
          };
          this.setState({
            uploadProgress: copy
          });
        }
      });

      req.upload.addEventListener("load", event => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "done", percentage: 100 };
        this.setState({ uploadProgress: copy });
        resolve(req.response);
      });

      req.upload.addEventListener("error", event => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = {
          state: "error",
          percentage: 0
        };
        this.setState({ uploadProgress: copy });
        reject(req.response);
      });

      const formData = new FormData();
      formData.append("file", file, file.name);
      req.open("POST", "http://localhost:4000/upload/excel/deleteKeyword");
      req.send(formData);

      req.onreadystatechange = () => {
        if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
          const { showTableParent } = this.props;

          showTableParent(JSON.parse(req.response));

          this.showTableFn(JSON.parse(req.response));
        }
      };
    });
  }

  showTableFn(value: any) {
    this.setState({
      showTable: true,
      tableData: value
    });
  }

  async uploadFiles() {
    this.setState({
      uploadProgress: {},
      uploading: true
    });
    const promises: any = [];
    this.state.files.forEach((element: any) => {
      promises.push(this.sendRequest(element));
    });
    try {
      await Promise.all(promises);
      this.setState({ successfullUploaded: true, uploading: false });
    } catch (e) {}
  }

  render() {
    return (
      <div className="upload">
        <div className="title">Upload excel file to delete </div>
        <div className="content">
          <Dropzone
            onFilesAdded={this.onFilesAdded}
            disabled={this.state.uploading || this.state.successfullUploaded}
          ></Dropzone>
          <div className="files">
            {this.state.files.map((file: any) => {
              return (
                <div key={file.name} className="row">
                  <span className="fileName">{file.name}</span>
                  {this.renderProgress(file)}
                </div>
              );
            })}
          </div>
        </div>
        <div className="action">{this.renderActions()}</div>
      </div>
    );
  }
}

export default upload;
