import { useContext } from "react";
import "./stories.scss";
import { AuthContext } from "../../context/authContext";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Stories = () => {
  const { currentUser } = useContext(AuthContext);
  const { isLoading, error, data } = useQuery({
    queryKey: ["stories"],
    queryFn: () => makeRequest.get("/stories").then((res) => res.data)
  });
  console.log(data)
  return (
    <div className="stories">
      <div className="story">
        <img src={"/upload/" + (currentUser.profilePic && currentUser.profilePic !== "null" ? currentUser.profilePic : "defaultProfile.jpeg")} alt="" />
        <span>{currentUser.name}</span>
        <button>+</button>
      </div>
      {error ? "Something went wrong" :
       isLoading ? "loading" :
       data.map((story) => (
          <div className="story" key={story.id}>
            <img src={"/upload/" + (story.img && story.img !== "null" ? story.img : "default_image.jpeg")} alt="" />
            <span>{story.name}</span>
          </div>
        ))
      }
    </div>
  );
};

export default Stories;
