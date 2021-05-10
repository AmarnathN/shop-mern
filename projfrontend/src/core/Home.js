import React from "react";
import { API } from "../backend";
import "../style.css";
import Base from "./Base";

export default function Home() {
  return (
    <Base title="Homepage">
      <div className="row">
        <div className="col-4">
          <button className="btn btn-success">Test</button>
        </div>
        <div className="col-4">
          <button className="btn btn-success">Test2</button>
        </div>
        <div className="col-4">
          <button className="btn btn-success">Test3</button>
        </div>
      </div>
    </Base>
  );
}
