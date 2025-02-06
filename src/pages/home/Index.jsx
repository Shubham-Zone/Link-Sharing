import LoginPage from '../auth/Login';
import RegisterPage from '../auth/Register';
import Navbar from '../../components/navbars/NavBar';
import { useEffect, useState } from 'react';
import { fetchTopics } from '../../api/topic';
import PostCard from '../../components/cards/PostCard';
import { fetchPublicPosts } from '../../api/post';
import { Link } from 'react-router-dom';

function IndexPage() {

    const [topics, setTopics] = useState([]);
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        const handleFetchTopics = async () => {

            try {
                const response = await fetchTopics();

                if (response.status === 200) {
                    setTopics(response.data);
                } else {
                    console.log(response);
                }
            } catch (e) {
                console.log(e.response.data.msg);
            }
        };
        const handleFetchPosts = async () => {
            try {
                const res = await fetchPublicPosts();

                if (res.status === 200) {
                    setPosts(res.data);
                } else {
                    console.log("Error fetching posts:", res.data.msg);
                }
            } catch (e) {
                console.log("Error fetching posts:", e);
            }
        };
        handleFetchTopics();
        handleFetchPosts();
    }, [])

    return (
        <div className="container-fluid bg-white min-vh-100">
            <Navbar />

            <div className="container py-2 mt-4">
                <div className="row d-flex flex-row align-items-start justify-items-start">

                    {/* Left Section (Recent-shares + top posts) */}
                    <div className="col-lg-8 gap-10">

                        <div className="d-flex border border-3 border-secondary flex-column gap-3 mx-auto p-10">
                            <h4 className="fw-bold text-success">Recent shares</h4>
                            {topics.map((topic) => (
                                <PostCard key={topic._id}
                                    topic={topic}
                                    topics={topics}
                                    setTopics={setTopics}
                                    type="pub" />
                            ))}
                        </div>
                        <br /> <br />
                        <div className="d-flex border border-3 border-secondary flex-column gap-3 mx-auto p-10">
                            <h4 className="fw-bold text-success">Top posts</h4>
                            {posts &&
                                posts.map((post) => (
                                    <div key={post._id} className="mb-2 card w-100 border-0 shadow-sm rounded-3 overflow-hidden">
                                        <div className="card-body">
                                            <h5 className="fw-bold text-dark">{post.createrName} (@{post.createrUsername})</h5>
                                            <h6 className="text-muted">{post.topicName}</h6>
                                            <p className="text-wrap">{post.content}</p>

                                            <div className="d-flex flex-wrap gap-2 mt-3">
                                                <Link to="#" className="btn btn-outline-primary btn-sm">
                                                    <i className="bi bi-download"></i> Download
                                                </Link>
                                                <Link to="#" className="btn btn-outline-secondary btn-sm">
                                                    <i className="bi bi-eye"></i> View Full Site
                                                </Link>
                                                <Link to="#" className="btn btn-outline-info btn-sm">
                                                    <i className="bi bi-card-text"></i> View Post
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>

                    </div>

                    {/* Right Section (Login + Register) */}
                    <div className="col-lg-4">
                        <div className="d-flex flex-column gap-3">
                            <LoginPage />
                            <RegisterPage />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default IndexPage;
