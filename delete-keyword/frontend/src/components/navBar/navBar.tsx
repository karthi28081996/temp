import * as React from "react";
import "./navBar.css";
export interface navBarProps {}

export interface navBarState {}

class navBar extends React.Component<navBarProps, navBarState> {
  render() {
    return (
      <div className="navBar">
        <h3>Growisto</h3>
      </div>
    );
  }
}

export default navBar;
