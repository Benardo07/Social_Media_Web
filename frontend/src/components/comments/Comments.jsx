import { useContext, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";

const Comments = ({ postId }) => {
  const [desc, setDesc] = useState("");
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery({
    queryKey: ["comments", postId],  // include postId in the query key for unique identification
    queryFn: () => makeRequest.get(`/comments?postId=${postId}`).then(res => res.data)
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["comments", postId]);  // match the query key used in useQuery
    },
  });

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({ desc, postId });
    setDesc("");
  };

  return (
    <div className="comments">
      <div className="write">
        <img src={"/upload/" + (currentUser.profilePic && currentUser.profilePic !== "null" ? currentUser.profilePic : "defaultProfile.jpeg")} alt="" />
        <input
          type="text"
          placeholder="write a comment"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleClick}>Send</button>
      </div>
      {error ? (
        "Something went wrong"
      ) : isLoading ? (
        "Loading..."
      ) : (
        data && data.map((comment) => (
          <div key={comment.id} className="comment"> {/* Assuming each comment has a unique `id` */}
            <img src={"/upload/" + (comment.profilePic && comment.profilePic !== "null" ? comment.profilePic : "defaultProfile.jpeg")} alt="" />
            <div className="info">
              <span>{comment.name}</span>
              <p>{comment.desc}</p>
            </div>
            <span className="date">
              {moment(comment.createdAt).fromNow()}
            </span>
          </div>
        ))
      )}
    </div>
  );
};

export default Comments;
