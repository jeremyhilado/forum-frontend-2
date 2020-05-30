import React, { useEffect } from "react";

import { Post } from "./Post";
import { useGlobalLoginState, newPost, getThreadInfo } from "../api";

export function Thread(props) {
  const [{ username, loggedIn }] = useGlobalLoginState();
  const [newPostContent, setNewPostContent] = React.useState("");
  const [threadInfo, setThreadInfo] = React.useState([])

  console.log('Thread - props', props)

  useEffect(() => {
    const makeApiCall = async () => {
      const res = await getThreadInfo(props.id)
      setThreadInfo(res)
    }
    makeApiCall()
  }, [])

  console.log('Thread - threadInfo', threadInfo)

  return (
    <div className="thread">
      <div className="thread-header">
        <span className="thread-author">{props.author}</span>
        <span className="thread-topic">{props.topic}</span>
      </div>
      <div className="thread-posts">
        {props.posts.map((post, i) => (
          <Post
            key={i}
            content={post.content}
            author={post.author}
            id={post.id}
            myVote={post.myVote}
            likeCount={post.likeCount}
            refreshThread={props.refreshThread}
            dislikeCount={post.dislikeCount}
          />
        ))}
      </div>
      {loggedIn && (
        <form
          onSubmit={e => {
            e.preventDefault();
            newPost(props.id, newPostContent, username).then(props.refreshThread);
          }}
        >
          <div style={{ display: "flex" }}>
            <input
              value={newPostContent}
              onChange={e => {
                e.preventDefault();
                setNewPostContent(e.target.value);
              }}
              style={{ flexGrow: 1, marginRight: 10 }}
            />
            <input type="submit" value="Reply" />
          </div>
        </form>
      )}
    </div>
  );
}
