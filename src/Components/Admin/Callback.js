import { Spin } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setAuth } from "../../store/authSlice";
import { useCookies } from "react-cookie";

const Callback = () => {

    const dispatch = useDispatch();
    const search = useLocation().search;
    const navigate = useNavigate();
    const [,setCookie] = useCookies();

    useEffect(() => {
        (async () => {
            const code = new URLSearchParams(search).get("code");
            const url = process.env.REACT_APP_API_URL + `app/v1/auth/oauth/login`;
            console.log("CODE", code);
            await axios
                .post(url, {
                    code: code,
                })
                .then((res) => {
                    localStorage.setItem("authtoken", res.data.token);
                    setCookie("token", res.data.token);
                    dispatch(
                        setAuth({
                            user: res.data.data.user,
                        })
                    );
                    navigate("/dashboard");
                })
                .catch((err) => {
                    console.error(err);
                });
        })();
    }, []);

    return (
        <div>
            <Spin size="large" />
        </div>
    )
}

export default Callback;