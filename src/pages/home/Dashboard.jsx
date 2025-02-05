import DashboardNavbar from "../../components/navbars/DashboardNavbar";
import CreateTopicPage from "../../components/functions/CreateTopic";
import PostCard from "../../components/cards/PostCard";
import SubscribedTopicCard from "../../components/cards/SubscribedTopicCard";
import ShareLink from "../../components/functions/Sharelink";
import ShareDocument from "../../components/functions/Sharedocument";
import ProfileCard from "../../components/cards/ProfileCard";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchTopics, fetchSubscibedTopics } from "../../api/topic";
import { fetchPublicPosts } from "../../api/post";
import { Link } from "react-router-dom";

function Dashboard() {

    const [topics, setTopics] = useState([]);
    const [posts, setPosts] = useState(null);
    const [subscribedTopics, setsubscribedTopics] = useState([]);
    const [status, setStatus] = useState({
        shareLink: false,
        shareDocs: false,
        createTopic: false,
    });

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
                console.log(e);
            }
        };

        const handleFetchSubscibedTopics = async () => {
            try {
                const response = await fetchSubscibedTopics();

                if (response.status === 200) {
                    console.log(response.data.length);
                    setsubscribedTopics(response.data);
                    console.log(response.data);
                } else {
                    console.log(response);
                }
            } catch (e) {
                console.log(e);
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

        handleFetchPosts();
        handleFetchTopics();
        handleFetchSubscibedTopics();
    }, []);

    return (
        <>
            <div className="container-lg bg-light min-vh-100">
                <DashboardNavbar status={status} setStatus={setStatus} />
    
                <div className="container py-4">
                    <div className="row g-4">
    
                        {/* Left Section */}
                        {topics.length > 0 && (
                            <div className="col-12 col-lg-8">
                                <ProfileCard />
    
                                {/* Subscribed Topics */}
                                <div className="border border-2 rounded-3 shadow-sm bg-white p-3 mb-4">
                                    <h4 className="fw-bold text-primary">Subscriptions</h4>
                                    {subscribedTopics.map((topic) => (
                                        <SubscribedTopicCard key={topic._id} topic={topic} topics={subscribedTopics} setTopics={setsubscribedTopics} type="sub" />
                                    ))}
                                </div>
    
                                {/* Trending Topics */}
                                <div className="border border-2 rounded-3 shadow-sm bg-white p-3 mb-4">
                                    <h4 className="fw-bold text-danger">Trending Topics</h4>
                                    {topics.map((topic) => (
                                        <PostCard key={topic._id}
                                         topic={topic}
                                         topics={topics} 
                                         setTopics={setTopics}
                                         type="pub" />
                                    ))}
                                </div>
                            </div>
                        )}
    
                        {/* Right Section */}
                        <div className="col-12 col-lg-4">
                            {topics.length > 0 && (
                                <div className="border border-2 rounded-3 shadow-sm bg-white p-3 mb-4">
                                    <h4 className="fw-bold text-success">Inbox</h4>
                                    {posts &&
                                        posts.map((post) => (
                                            <div key={post._id} className="card w-100 border-0 shadow-sm rounded-3 overflow-hidden">
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
                                                        <Link to="#" className="btn btn-outline-success btn-sm">
                                                            <i className="bi bi-check-circle"></i> Mark as Read
                                                        </Link>
                                                        <Link to="#" className="btn btn-outline-info btn-sm">
                                                            <i className="bi bi-card-text"></i> View Post
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            )}
                            <div className="d-flex flex-column gap-3">
                                {status.shareLink && <ShareLink />}
                                {status.shareDocs && <ShareDocument />}
                                {status.createTopic && <CreateTopicPage />}
                            </div>
                        </div>
    
                    </div>
                </div>
            </div>
        </>
    );
    
}

export default Dashboard;