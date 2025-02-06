import { useState, useEffect } from "react";
import { successAlert, errorAlert } from "../../components/helpers/Alert";
import { fetchTopic, fetchTopicUsers } from "../../api/topic";
import { useParams } from "react-router-dom";
import { ReadPost, fetchUnreadPosts } from "../../api/post";
import { countSubscriptions } from "../../api/topic";
import { countPosts } from "../../api/post";
import { fetchPosts } from "../../api/post";
import { fetchUserUsingUuid } from '../../api/user';
import TopicUserCard from "../../components/cards/TopicUserCard";

function TopicDashboard() {

    const [topic, setTopic] = useState({});
    const [posts, setPosts] = useState([]);
    const [topicUsers, setTopicUsers] = useState([]);
    const [subscriptionsCount, setsubscriptionsCount] = useState(0);
    const [postsCount, setPostsCount] = useState(0);
    const { id } = useParams();
    console.log('Id of topic from params is', id);

    useEffect(() => {
        const handleFetchTopic = async () => {
            try {
                const res = await fetchTopic(id);
                if (res.status === 200) {
                    console.log("Topic fetched successfully", res.data);
                }
                setTopic(res.data);
                console.log("Topic is", topic);
            } catch (e) {
                errorAlert(e.response.data.msg);
            }
        };
        const handleFetchPosts = async () => {
            try {
                const res = await fetchPosts(id);

                if (res.status === 200) {
                    setPosts(res.data);
                } else {
                    console.log("Error fetching posts:", res.data.msg);
                }
            } catch (e) {
                console.log("Error fetching posts:", e);
            }
        };
        const handleFetchTopicUsers = async () => {
            try {
                const res = await fetchTopicUsers(id);
                if (res.status === 200) {
                    const users = res.data;

                    // Fetch user details concurrently
                    const userDetails = await Promise.all(users.map(async (userId) => {
                        console.log("UserId is", userId);
                        const user = await fetchUserUsingUuid(userId);
                        console.log("User name is", user.name);
                        return user;
                    }));

                    // Update state correctly
                    setTopicUsers(userDetails);
                    console.log("Final list of users is", userDetails);
                } else {
                    console.log("Error while fetching users", res.data.msg);
                }
            } catch (e) {
                console.log("Error while fetching users", e.response?.data?.msg || e.message);
            }
        };
        const handleCountSubscriptions = async () => {
            try {
                const res = await countSubscriptions(id);
                if (res.status === 200) {
                    console.log("Count is:", res.data);
                    setsubscriptionsCount(res.data.cnt);
                } else {
                    console.log('Something went wrong', res.data);
                }
            } catch (e) {
                console.log(e);
            }
        };
        const handleCountPosts = async () => {
            try {
                const res = await countPosts(id);
                if (res.status === 200) {
                    console.log("Posts data fetched successfully", res.data);
                    setPostsCount(res.data.length);
                } else {
                    console.log("Error while fetching posts", res.data.msg);
                }
            } catch (e) {
                console.log("Error while fetching posts", e);
            }
        };
        handleCountPosts();
        handleCountSubscriptions();
        handleFetchTopic();
        handleFetchPosts();
        handleFetchTopicUsers();
    }, [id])

    return (
        <>
            <div className="container-lg bg-light min-vh-100">

                <div className="container py-4">
                    <div className="row g-4">

                        {/* Left Section */}
                        {topic && (
                            <div className="col-12 col-lg-8">

                                {/* Topic detail card*/}
                                <div className="card mb-4 mx-auto p-4 shadow-lg rounded">
                                    <div className="row g-3 align-items-center">
                                        <div className="col-md-12">
                                            {/* Topic Details */}
                                            {topic && (
                                                <div className="card-body text-center">
                                                    <h5 className="card-title fw-bold">Topic: "{topic.name}"</h5>
                                                    <hr />
                                                    <p className="card-text text-muted">
                                                        {topic.name} <span className="badge bg-secondary">{topic.visibility}</span>
                                                    </p>
                                                </div>
                                            )}

                                            {/* Stats Section */}
                                            <div className="d-flex justify-content-around mt-3">
                                                <div className="text-center">
                                                    <h6 className="fw-bold text-primary">Subscriptions</h6>
                                                    <p className="fs-5 fw-semibold">{subscriptionsCount}</p>
                                                </div>
                                                <div className="text-center">
                                                    <h6 className="fw-bold text-success">Posts</h6>
                                                    <p className="fs-5 fw-semibold">{postsCount}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                {/* Users of the topic */}
                                <div onClick={() => console.log(topic)} className="border border-2 rounded-3 shadow-sm bg-white p-3 mb-4">
                                    <h4 className="fw-bold text-primary">Users</h4>
                                    {topicUsers && (topicUsers.map((user) => <TopicUserCard topic_id={id} user={user.data} />
                                    ))}
                                    {/* {subscribedTopics.map((topic) => (
                                        <SubscribedTopicCard key={topic._id} topic={topic} topics={subscribedTopics} setTopics={setsubscribedTopics} type="sub" />
                                    ))} */}
                                </div>
                            </div>
                        )}

                        {/* Posts of the topic*/}
                        <div className="col-12 col-lg-4">
                            {topic && (
                                <div className="border border-2 rounded-3 shadow-sm bg-white p-3 mb-4">
                                    <h4 className="fw-bold text-success">Posts</h4>
                                    {posts &&
                                        posts.map((post) => (
                                            <div key={post._id} className="mb-2 card w-100 border-0 shadow-sm rounded-3 overflow-hidden">
                                                <div className="card-body">
                                                    <h5 className="fw-bold text-dark">{post.createrName} (@{post.createrUsername})</h5>
                                                    <h6 className="text-muted">{post.topicName}</h6>
                                                    <p className="text-wrap">{post.content}</p>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default TopicDashboard;