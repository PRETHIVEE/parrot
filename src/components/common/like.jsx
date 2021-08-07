import React from "react";

const Like = (props) => {
  let classes = props.liked ? "fa fa-heart" : "fa fa-heart-o";
  return (
    <i
      style={{ cursor: "pointer" }}
      onClick={props.onClick}
      className={classes}
      aria-hidden="true"
    ></i>
  );
};

export default Like;
