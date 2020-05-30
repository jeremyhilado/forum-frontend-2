import React from "react";
import {like, cancelLike, dislike} from '../api'

export function Post(props) {

  console.log('Post - props', props)

  function likeClick(vote) {
    if(props.myVote === vote) {
      cancelLike(props.id).then(props.refreshThread)
    } else if (vote === 1) {
      like(props.id).then(props.refreshThread)
    } else {
      dislike(props.id).then(props.refreshThread)
    }
  }

  let totalLikes = props.likeCount - props.dislikeCount

  return (
    <div className="post">
      <span className="post-author">{props.author}</span>
      <span className="post-content">{props.content}</span>
      <i 
        className={[props.myVote === 1 ? 'fas' : 'far', 'fa-thumbs-up'].join(' ')}
        onClick={e => {e.preventDefault(); likeClick(1)}}
      />
      <i 
        className={[props.myVote === -1 ? 'fas' : 'far', 'fa-thumbs-down'].join(' ')}
        onClick={e => {e.preventDefault(); likeClick(-1)}}
      />
      {totalLikes}
      {/* This is a sample icon.  Change "far" to "fas" to get a filled in thumb, and "up" to "down" to get a down thumb https://fontawesome.com/icons/thumbs-up?style=regular */}
    </div>
  );
}
