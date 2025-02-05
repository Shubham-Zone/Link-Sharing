import { useState } from "react";
import Spinner from '../helpers/Spinner';
import { createTopic } from "../../api/topic";
import Swal from "sweetalert2";

function CreateTopicPage() {
    const [visibility, setVisibility] = useState("Public");
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [msg, setMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            setError("Token not found");
            setMsg('');
            return;
        }
        if (!name || !visibility) {
            setMsg("Please enter all the fields");
            setError('');
            return;
        }
        try {
            setLoading(true);
            const response = await createTopic(name, visibility);
            if(response.status === 200) {
                Swal.fire({
                    title: "Good job!",
                    text: "Topic Created successfully!",
                    icon: "success"
                  });
                setMsg(response.data.msg || 'Topic created successfully');
                setError('');
                window.location.reload();
            } else {
                console.log(response);
                setError(response.data.msg || 'Something went wrong');
                setMsg('');
            }
        } catch (e) {
            setError(e.message);
            setMsg('');
            return;
        } finally {
            setLoading(false);
        }

    };

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="card p-4 w-100 shadow-lg border-0 rounded-4" style={{ maxWidth: "420px" }}>
                <h2 className="h4 text-center text-primary fw-bold mb-4">Create Topic</h2>
                {error && <p className="alert alert-danger text-center">{error}</p>}
                {msg && <p className="alert alert-success text-center">{msg}</p>}

                <form onSubmit={handleSubmit}>
                    {/* Topic Name Field */}
                    <div className="mb-3">
                        <label htmlFor="topicName" className="form-label fw-semibold">Topic Name*</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-control rounded-3"
                            id="topicName"
                            placeholder="Enter topic name"
                            required
                        />
                    </div>

                    {/* Visibility Dropdown */}
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Visibility*</label>
                        <div className="dropdown w-100">
                            <button
                                className="btn btn-secondary dropdown-toggle w-100 rounded-3"
                                type="button"
                                data-bs-toggle="dropdown"
                            >
                                {visibility}
                            </button>
                            <ul className="dropdown-menu w-100">
                                <li><button className="dropdown-item" onClick={() => setVisibility("Public")} type="button">Public</button></li>
                                <li><button className="dropdown-item" onClick={() => setVisibility("Private")} type="button">Private</button></li>
                            </ul>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="d-flex gap-2">
                        <button type="submit" className="btn btn-primary w-100 rounded-3">{loading ? <Spinner/> : "Save"}</button>
                        <button type="submit" className="btn btn-primary w-100 rounded-3">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateTopicPage;
