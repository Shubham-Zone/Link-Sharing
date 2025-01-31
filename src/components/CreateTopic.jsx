import { useState } from "react";

function CreateTopicPage() {
    const [visibility, setVisibility] = useState("Public");

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="card p-4 w-100 shadow-lg border-0 rounded-4" style={{ maxWidth: "420px" }}>
                <h2 className="h4 text-center text-primary fw-bold mb-4">Create Topic</h2>

                <form onSubmit={handleSubmit}>
                    {/* Topic Name Field */}
                    <div className="mb-3">
                        <label htmlFor="topicName" className="form-label fw-semibold">Topic Name*</label>
                        <input 
                            type="text" 
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
                            <button type="submit" className="btn btn-primary w-100 rounded-3">Save</button>
                            <button type="submit" className="btn btn-primary w-100 rounded-3">Cancel</button>
                        </div>
                </form>
            </div>
        </div>
    );
}

export default CreateTopicPage;
