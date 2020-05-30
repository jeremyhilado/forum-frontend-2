import React from "react";

export function Post(props) {
  return (
    <div className="post">
      <span className="post-author">{props.author}</span>
      <span className="post-content">{props.content}</span>
    </div>
  );
}
