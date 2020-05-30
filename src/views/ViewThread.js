import React from "react";

import {getThreadInfo} from '../api';
import {LoadingIndicator} from '../components/LoadingIndicator';
import {Thread} from '../components/Thread';

export function ViewThread(props) {
  const [thread, setThread] = React.useState();
  const loading = thread === undefined;

  React.useEffect(refreshThread, [props.match.params.threadId]);

  function refreshThread() {
    getThreadInfo(props.match.params.threadId).then(setThread);
  }

  if (loading) {
      return <LoadingIndicator/>
  } else {
      return <Thread topic={thread.topic} author={thread.author} posts={thread.posts} id={thread.id} refreshThread={refreshThread}></Thread>
  }
}