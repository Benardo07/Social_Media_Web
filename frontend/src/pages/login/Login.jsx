import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import Dialog from "../../components/Dialog/Dialog";
import "./login.scss";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState("");
  const [dialog, setDialog] = useState({ show: false, type: "", message: "" });

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();  // This prevents the default form submission
    try {
      await login(inputs);
      setDialog({ show: true, type: "success", message: "Registration successful!" });
      setTimeout(() => {
        setDialog({ show: false, type: "", message: "" });
      }, 3000);
      navigate("/");
    } catch (err) {
      // Ensure the error is in a readable format, possibly not directly err.response.data
      setErr(err.response?.data || "An unexpected error occurred");
      setDialog({ show: true, type: "error", message: err.response.data || "Registration failed!" });
      setTimeout(() => {
        setDialog({ show: false, type: "", message: "" });
      }, 3000); 
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello, Welocome.</h1>
          <p>
            Come and join us to explore your new world !!
          </p>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            {err && <div className="error">{err}</div>}
            <button type="submit">Login</button>
            
            <div className="haveaccount">
              <span>Don't you have an account?</span>
              <Link to="/register">
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
      {dialog.show && (
        <Dialog type={dialog.type} message={dialog.message} onClose={() => setDialog({ ...dialog, show: false })} />
      )}
    </div>
  );
};

export default Login;
