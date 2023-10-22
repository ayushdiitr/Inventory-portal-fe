import React, { useState } from "react";
import styles from "./Admin.module.css";
import user from "./assets/user.png";
import tl_logo from "./assets/tl_logo.png";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router";
import api from "../../https/api";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { setAuth } from "../../store/authSlice";
import Loader from "../../HelperComponents/Loader/Loader";

const Admin = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [, setCookie] = useCookies();
  const dispach = useDispatch();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = await api.post("/app/v1/auth/login", {
        email,
        password,
      });
      setCookie("token", data.data.token);
      dispach(
        setAuth({
          user: data.data.data,
        })
      );
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <div>
      <div className={styles.background}>
        <div className={styles.logo}>
          <img src={tl_logo} alt="" />
        </div>
        <div className={styles.container}>
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className={styles.userlogo}>
                <img src={user} alt="" />
              </div>
              <h2>ACCOUNT LOGIN</h2>
              <div className={styles.forms}>
                <form>
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="EMAIL" autoComplete="on"
                  />
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="PASSWORD" autoComplete="on"
                  />
                </form>
              </div>
              <button className={styles.loginbtn} onClick={handleSubmit}>
                Log In
              </button>
            </>
          )}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Admin;
