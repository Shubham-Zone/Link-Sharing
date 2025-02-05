import { useState } from "react";
import Spinner from '../components/helpers/Spinner';
import { requestPasswordReset } from "../api/auth";

function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleResetPassword = async () => {
        try {
            setLoading(true);
            if (!email) {
                setMsg("Please enter your email");
                setError('');
                return;
            }
            const response = await requestPasswordReset(email);
            if (response.status === 200) {
                setMsg(response.data.msg || 'Password reset email sent successfully.');
                setError('');
            } else {
                console.log(response.data);
                setMsg(response.data.msg || 'Something went wrong');
                setError('');
            }
        } catch (e) {
            console.log(e);
            setError('Something went wrong');
            setMsg('');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100 bg-gradient-to-br from-blue-400 to-purple-600">
            <div className="card shadow-lg p-4" style={{ maxWidth: "400px" }}>
                <h2 className="h3 mb-3 text-center text-secondary">Reset Password</h2>
                <p className="text-center text-muted mb-4">Enter your email to reset your password.</p>
                
                {error && <div className="alert alert-danger mb-3">{error}</div>}
                {msg && <div className="alert alert-success mb-3">{msg}</div>}

                <div className="mb-3">
                    <label htmlFor="emailinput" className="form-label">Email / Username*</label>
                    <input
                        type="email"
                        id="emailinput"
                        name="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <button
                    onClick={() => handleResetPassword()}
                    className="btn btn-primary w-100"
                >
                    {loading ? <Spinner /> : "Reset Password"}
                </button>

                <p className="mt-3 text-center text-muted">
                    Remember your password?
                    <a href="/" className="text-primary">Login</a>
                </p>
            </div>
        </div>
    );
}

export default ForgotPasswordPage;
