import { useEffect, useState } from "react";
import axios from "axios";

function ShareLink() {

    const [topic, setTopic] = useState('Topics');
    const [error, setError] = useState('');
    const [msg, setMsg] = useState('');
    const [topics, setTopics] = useState(null);
    const token = localStorage.getItem('token');

    const handleSubmit = () => {

    };

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const res = await axios.get(`${import.meta.env?.VITE_BASE_URL}/topics`, {
                    headers: {
                        "x-auth-token": token
                    }
                });

                if(res.status === 200) {
                    console.log('Topics fetched successfully', res);
                    setTopics(res.data);
                } else {
                    setError(res.data.msg || 'Something went wrong while fetching topics');
                    setMsg('');
                }
            } catch(e) {
                setError(e.message);
                setMsg('');
            }
        };
        fetchTopics();
    }, []);

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
                                    {
                                        topics && topics.map((topic) => 
                                            <li><button className="dropdown-item" onClick={() => setTopic(topic.name)} type="button">{topic.name}</button></li>
                                        )
                                    }
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