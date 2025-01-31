import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const ResetPasswordPage = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const id = searchParams.get("id");
    const token = searchParams.get("token");

    useEffect(() => {
        if (!id || !token) {
            setError("Invalid or missing token. Please try again.");
        }
    }, [id, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            const res = await axios.post(
                "http://localhost:8000/api/resetPassword",
                { id, token, password },
                {
                    headers: { "Content-Type": "application/json" }
                }
            );
            setMessage(res.data.msg);
            setTimeout(() => navigate("/"), 3000);
        } catch (err) {
            setError(err.response?.data?.msg || "Something went wrong!");
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100 bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="card shadow-lg p-4" style={{ maxWidth: "400px" }}>
                <h2 className="h3 text-center text-secondary mb-4">Reset Password</h2>
                {error && <div className="alert alert-danger mb-3">{error}</div>}
                {message && <div className="alert alert-success mb-3">{message}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">New Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100 mt-3"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
