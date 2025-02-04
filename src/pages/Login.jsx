import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from '../components/helpers/Spinner';
import { login } from "../api/auth";

const LoginPage = () => {
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "email") {
            setEmail(value);
        } else {
            setPassword(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert("Please enter all the details.");
            return;
        }
        try {
            setLoading(true);
            const res = await login(email, password);
            setMsg(res.data);
            localStorage.setItem('user', email);
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.msg || "An error occurred!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center mb-4 bg-light">
            <form className="card p-4 w-100 shadow border-0" style={{ maxWidth: "400px" }} onSubmit={handleSubmit}>
                <h2 className="mb-3 text-center text-primary">Login</h2>

                {error && <p className="alert alert-danger text-center">{error}</p>}
                {msg && <p className="alert alert-success text-center">{msg}</p>}

                {/* Email Input */}
                <div className="form-floating mb-3">
                    <input
                        type="email"
                        className="form-control"
                        id="emailinput"
                        name="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleChange}
                    />
                    <label htmlFor="emailinput">Email/Username*</label>
                </div>

                {/* Password Input */}
                <div className="form-floating mb-3">
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={handleChange}
                    />
                    <label htmlFor="exampleInputPassword1">Password*</label>
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-100 mt-2">
                    {loading ? <Spinner /> : "Login"}
                </button>

                {/* Forgot Password & Register Links */}
                <div className="text-center mt-3">
                    <button
                        type="button"
                        onClick={() => navigate("/forgot-password")}
                        className="btn btn-link"
                    >
                        Forgot password?
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
