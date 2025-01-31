import { useState } from "react";

function ShareLink() {

    const [topic, setTopic] = useState('Topics');

    const handleSubmit = () => {

    };

    return (
        <>
            <div className="d-flex justify-content-center align-items-center">
                <div className="card p-4 w-100 shadow-lg border-0 rounded-4" style={{ maxWidth: "420px" }}>
                    <h2 className="h4 text-center text-primary fw-bold mb-4">Share link (Pop up)</h2>

                    <form onSubmit={handleSubmit}>
                        {/* Link */}
                        <div className="mb-3">
                            <label htmlFor="link" className="form-label fw-semibold">Link*</label>
                            <input
                                type="text"
                                className="form-control rounded-3"
                                id="link"
                                placeholder="Enter link"
                                required
                            />
                        </div>

                        {/* Desc */}
                        <div className="mb-3">
                            <label htmlFor="desc" className="form-label fw-semibold">Link*</label>
                            <textarea
                                type="text"
                                className="form-control rounded-3"
                                id="desc"
                                placeholder="Enter description"
                                required
                            />
                        </div>

                        {/* Topic Dropdown */}
                        <div className="mb-3">
                            <label className="form-label fw-semibold">Topic*</label>
                            <div className="dropdown w-100">
                                <button
                                    className="btn btn-secondary dropdown-toggle w-100 rounded-3"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                >
                                    {topic}
                                </button>
                                <ul className="dropdown-menu w-100">
                                    <li><button className="dropdown-item" onClick={() => setTopic("Topic1")} type="button">Topic1</button></li>
                                    <li><button className="dropdown-item" onClick={() => setTopic("Topic2")} type="button">Topic2</button></li>
                                </ul>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="d-flex gap-2">
                            <button type="submit" className="btn btn-primary w-100 rounded-3">Share</button>
                            <button type="submit" className="btn btn-primary w-100 rounded-3">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ShareLink;