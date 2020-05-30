import React from "react";
import { getAllThreads, useGlobalLoginState, newThread } from "../api";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { Link, useHistory } from "react-router-dom";

export function ThreadList(props) {
  const [allThreads, setAllThreads] = React.useState();
  const [{ username, loggedIn }] = useGlobalLoginState();
  const loading = allThreads === undefined;
  const [newThreadTitle, setNewTopic] = React.useState("");
  const history = useHistory();

  React.useEffect(() => {
    getAllThreads().then(setAllThreads);
  }, []);
  if (loading) {
    return <LoadingIndicator />;
  } else {
    return (
      <React.Fragment>
        <div className="threads">
          {allThreads.map((thread, index) => (
            <div className="individual-thread" key={index}>
              <span className="individual-thread-author">{thread.author}</span>
              <Link to={`thread/${thread.id}`}>
                <span className="individual-thread-topic">{thread.topic}</span>
              </Link>
            </div>
          ))}
        </div>
        
        {loggedIn && (
          <form onSubmit={(e) => {
              e.preventDefault();
              newThread(newThreadTitle, username).then(result => {
                  history.push(`/thread/${result.id}`);
              });
          }}>
            <div style={{ display: "flex" }}>
              <input
                value={newThreadTitle}
                onChange={e => {
                  e.preventDefault();
                  setNewTopic(e.target.value);
                }}
                style={{ flexGrow: 1, marginRight: 10 }}
              />
              <input
                type="submit"
                value="Create New Topic Thread"
              />
            </div>
          </form>
        )}
      </React.Fragment>
    );
  }
}
