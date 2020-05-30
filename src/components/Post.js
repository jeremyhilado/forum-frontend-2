import React from "react";

export function Post(props) {
  return (
    <div className="post">
      <span className="post-author">{props.author}</span>
      <span className="post-content">{props.content}</span>
      <i className="far fa-thumbs-up" />
      {/* This is a sample icon.  Change "far" to "fas" to get a filled in thumb, and "up" to "down" to get a down thumb https://fontawesome.com/icons/thumbs-up?style=regular */}
    </div>
  );
}
