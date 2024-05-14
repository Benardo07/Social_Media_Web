import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  const [ err, setErr] = useState(null);
  
  const { setCurrentUser } = useContext(AuthContext);  // Correctly placed at the top level
  const navigate = useNavigate();  // Correctly placed at the top level

  const handleLogout = async (e) => {
    e.preventDefault();  // Prevent the default action of the event (e.g., form submission)

    try {
      const response = await axios.post("http://localhost:8800/api/auth/logout");
      setCurrentUser(null);  // Clear the current user
      navigate('/login', { replace: true });  // Redirect to login page
      console.log("Logged out successfully:", response.data);
    } catch (err) {
      console.error("Error during logout:", err.message);
      // More detailed error handling can be implemented here
    }
  };
  

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>BenSola.</span>
        </Link>
        <Link to="/"><HomeOutlinedIcon /></Link>
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        <GridViewOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <button onClick={handleLogout} className="logout">Log Out</button>
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <Link to={`/profile/${currentUser.id}`} style={{ textDecoration: "none", color: "inherit" }}>
          <div className="user">
            <img
              src={"/upload/" + (currentUser.profilePic && currentUser.profilePic !== "null" ? currentUser.profilePic : "defaultProfile.jpeg")}
              alt=""
            />
            <span>{currentUser.name}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
