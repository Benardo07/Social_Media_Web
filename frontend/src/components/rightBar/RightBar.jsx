import "./rightBar.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
const RightBar = () => {

  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["userSuggestions", currentUser.id],
    queryFn: () => makeRequest.get(`/users/suggestions/${currentUser.id}`).then(res => res.data),
    enabled: !!currentUser.id
  });

  const { isLoading: friendsLoading, error: friendsError, data: friendsData } = useQuery({
    queryKey: ["userFriends", currentUser.id],
    queryFn: () => makeRequest.get(`/users/friends/${currentUser.id}`).then(res => res.data),
    enabled: !!currentUser.id
  });

  const mutation = useMutation({
    mutationFn: (newID) => {
      return makeRequest.post("/relationships", {userId : newID});
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["userSuggestions", currentUser.id]);
        queryClient.invalidateQueries(["userFriends", currentUser.id]);  // match the query key used in useQuery
    },
  });

  const handleFollow = (newUserId) => {
    console.log("halo")
    mutation.mutate(newUserId)
    
  };

  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
          {error && <div>Something went wrong</div>}
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            data?.map((user) => (
              <div className="user" key={user.id}>
                <div className="userInfo">
                  <img src={"/upload/" + (currentUser.profilePic && currentUser.profilePic !== "null" ? currentUser.profilePic : "defaultProfile.jpeg")} alt={user.name} />
                  <span>{user.name}</span>
                </div>
                <div className="buttons">
                  <button onClick={() => handleFollow(user.id)}>follow</button>
                  <button>dismiss</button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="item">
          <span>Latest Activities</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <p>
                <span>Jane Doe</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <p>
                <span>Jane Doe</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <p>
                <span>Jane Doe</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <p>
                <span>Jane Doe</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="item">
          <span>Online Friends</span>
          {friendsError && <div>Something went wrong</div>}
          {friendsLoading ? (
            <div>Loading...</div>
          ) : (
            friendsData?.map((user) => (
              <div className="user" key={user.id}>
                <div className="userInfo">
                  <img
                    src={"/upload/" + (user.profilePic && user.profilePic !== "null" ? user.profilePic : "defaultProfile.jpeg")}
                    alt={user.name}
                  />
                  <div className="online" />
                  <span>{user.name}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RightBar;
