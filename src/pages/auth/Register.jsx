import { useState } from "react";
import { register } from "../../api/auth";

const RegisterPage = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        userName: "",
        password: "",
        confirmPassword: "",
        profilePhoto: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "profilePhoto") {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const data = new FormData();
        for (let key in formData) {
            data.append(key, formData[key]);
        }

        try {
            setLoading(true);
            const res = await register(data);
            alert(res.data.msg);
            localStorage.setItem('username', formData.userName);
            localStorage.setItem('name', formData.firstName + ' ' + formData.lastName);
        } catch (err) {
            alert(err.response?.data?.msg || "An error occurred!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow p-4 w-100" style={{ maxWidth: "400px" }}>
                <h2 className="text-center mb-4">Register</h2>
                <form onSubmit={handleSubmit}>
                    
                    <div className="mb-3">
                        <label htmlFor="firstnameinput" className="form-label">First Name*</label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstnameinput"
                            name="firstName"
                            placeholder="Enter your first name"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="lastnameinput" className="form-label">Last Name*</label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastnameinput"
                            name="lastName"
                            placeholder="Enter your last name"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="emailinput" className="form-label">Email*</label>
                        <input
                            type="email"
                            className="form-control"
                            id="emailinput"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="userName" className="form-label">Username*</label>
                        <input
                            type="text"
                            className="form-control"
                            id="userName"
                            name="userName"
                            placeholder="Enter your username"
                            value={formData.userName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password*</label>
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            name="password"
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="confirmPassword1" className="form-label">Confirm Password*</label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword1"
                            name="confirmPassword"
                            placeholder="Confirm password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="profilePhoto" className="form-label">Profile Photo</label>
                        <input
                            type="file"
                            name="profilePhoto"
                            className="form-control"
                            id="profilePhoto"
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
