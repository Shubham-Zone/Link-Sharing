import { useState, useEffect } from "react";
import { fetchTopics, fetchSubscibedTopics } from "../../api/topic";
import { fetchUser } from "../../api/user";
import { fetchUserTopics } from "../../api/topic";

function TopicUserCard({ topic_id, user }) {

    const [topics, setTopics] = useState(0);
    const [subscribed, setSubscribed] = useState(0);
    const [base64String, setbase64String] = useState('');

    useEffect(() => {
        console.log("user is", user);
        const handleFetchTopics = async () => {
            try {
                const response = await fetchUserTopics(user.uuid);
                if (response.status === 200) {
                    console.log('Topics of user is', response.data);

                    const topicsArray = Array.isArray(response.data) ? response.data : [response.data];

                    setTopics(topicsArray.length);
                } else {
                    console.log(response);
                }
            } catch (e) {
                console.log(e);
            }
        };


        const handleFetchSubscibedTopics = async () => {
            try {
                const response = await fetchSubscibedTopics(user.uuid);

                if (response.status === 200) {
                    console.log("Subscribed topics length");
                    console.log(response.data.length);
                    setSubscribed(response.data.length);
                } else {
                    console.log(response);
                }
            } catch (e) {
                console.log(e);
            }
        };

        setbase64String(user.profilePhoto);
        handleFetchTopics();
        handleFetchSubscibedTopics();
    }, [base64String]);

    return (
        <div className="card mb-4 mx-auto p-4 shadow-lg rounded" style={{ maxWidth: "600px" }}>
            <div className="row g-3 align-items-center">
                {/* Profile Image */}
                <div className="col-md-4 d-flex justify-content-center">
                    {base64String ? (
                        <img
                            src={`data:image/png;base64,${base64String}`}
                            alt="Profile"
                            className="rounded-circle border"
                            style={{ width: "120px", height: "120px", objectFit: "cover" }}
                        />
                    ) : (
                        <p>Loading image...</p>
                    )}
                </div>
    
                {/* User Details */}
                <div className="col-md-8">
                    {user && (
                        <div className="card-body text-center">
                            <h5 className="card-title fw-bold">{user.firstName} {user.lastName}</h5>
                            <p className="card-text text-muted">{user.email}</p>
                        </div>
                    )}
                    
                    {/* Stats Section */}
                    <div className="d-flex justify-content-around mt-3">
                        <div className="text-center">
                            <h6 className="fw-bold text-primary">Subscriptions</h6>
                            <p className="fs-5 fw-semibold">{subscribed}</p>
                        </div>
                        <div className="text-center">
                            <h6 className="fw-bold text-success">Topics</h6>
                            <p className="fs-5 fw-semibold">{topics}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    
}

export default TopicUserCard;