import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { token } from "../../utils/localstore";
import { useParams } from "react-router-dom";
import { fetchPosts } from "../../api/post";

const Post = () => {
    const { id } = useParams();
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        const handleFetchPosts = async () => {
            try {
                const res = await fetchPosts();

                if (res.status === 200) {
                    setPosts(res.data);
                } else {
                    console.log("Error fetching posts:", res.data.msg);
                }
            } catch (e) {
                console.log("Error fetching posts:", e);
            }
        };
        handleFetchPosts();
    }, [id, token]);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4 fw-bold text-primary">Post Details</h2>

            {posts === null ? (
                <div className="text-center mt-4">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2 text-muted">Fetching posts...</p>
                </div>
            ) : posts.length === 0 ? (
                <div className="text-center mt-4">
                    <p className="text-muted">No posts available at the moment.</p>
                </div>
            ) : (
                posts.map((post) => (
                    <div key={post._id} className="card mb-4 border rounded shadow-sm">
                        <div className="card-body">
                            {/* Creator Details */}
                            <h5 className="fw-bold text-dark">{post.createrName} (@{post.createrUsername})</h5>
                            <h6 className="text-secondary">{post.topicName}</h6>
                            <p className="card-text text-muted">{post.content}</p>

                            {/* Action Buttons */}
                            <div className="d-flex gap-3 mt-3">
                                <Link to="#" className="btn btn-outline-primary">
                                    <i className="bi bi-download"></i> Download
                                </Link>
                                <Link to="#" className="btn btn-outline-secondary">
                                    <i className="bi bi-eye"></i> View Full Site
                                </Link>
                                <Link to="#" className="btn btn-outline-success">
                                    <i className="bi bi-check-circle"></i> Mark as Read
                                </Link>
                                <Link to="#" className="btn btn-outline-info">
                                    <i className="bi bi-card-text"></i> View Post
                                </Link>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Post;
