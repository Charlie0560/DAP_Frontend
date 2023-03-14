import React from "react";
import "./boxes.css";

function Boxes({ title, url, length }) {
  return (
    <>
      <div className="content_box">
        <a href={url}>
          <p>{title}</p>
        </a>
        {length > 0 && <div className="lengthc">{length}</div>}
      </div>
    </>
  );
}

export default Boxes;
