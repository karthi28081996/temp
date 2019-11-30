import * as React from "react";
import "./progress.css";
export interface progressProps {
  progress: string;
}

export interface progressState {}

class progress extends React.Component<progressProps, progressState> {
  render() {
    console.log(this.props.progress + "%");
    return (
      <div className="progressBar">
        <div
          className="progress"
          style={{ width: this.props.progress + "%" }}
        ></div>
      </div>
    );
  }
}

export default progress;
