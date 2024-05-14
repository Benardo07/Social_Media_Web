import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.scss";
import axios from "axios";
import Dialog from "../../components/Dialog/Dialog";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  const [dialog, setDialog] = useState({ show: false, type: "", message: "" });

  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8800/api/auth/register", inputs);
      setDialog({ show: true, type: "success", message: "Registration successful!" });
      setTimeout(() => {
        setDialog({ show: false, type: "", message: "" });
      }, 3000);
    } catch (err) {
      setErr(err.response.data);
      setDialog({ show: true, type: "error", message: err.response.data || "Registration failed!" });
      setTimeout(() => {
        setDialog({ show: false, type: "", message: "" });
      }, 3000); 
    }
  };

  console.log(err)

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>BenSola.</h1>
          <p>
            Place you connected with your friend forever
          </p>
          
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />
            {err && err}
            <button onClick={handleClick}>Register</button>

            <div className="noaccount">
              <span>Do you have an account?</span>
              <Link to="/login">
                Login
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

export default Register;
