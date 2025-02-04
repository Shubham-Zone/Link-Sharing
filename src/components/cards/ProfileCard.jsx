import axios from "axios";
import { useState, useEffect } from "react";

function ProfileCard() {

    const username = localStorage.getItem('user');

    const [topics, setTopics] = useState(0);
    const [subscribed, setSubscribed] = useState(0);
    const [user, setUser] = useState(null);
    const [base64String, setbase64String] = useState('');

    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchTopics = async () => {
            try {
                const response = await axios.get(`${import.meta.env?.VITE_BASE_URL}/topics`, {
                    headers: {
                        "x-auth-token": token,
                    },
                });

                if (response.status === 200) {
                    console.log(response.data.length);
                    setTopics(response.data.length);
                } else {
                    console.log(response);
                }
            } catch (e) {
                console.log(e);
            }
        };

        const fetchSubscibedTopics = async () => {
            try {
                const response = await axios.get(`${import.meta.env?.VITE_BASE_URL}/subscribed-topics`, {
                    headers: {
                        "x-auth-token": token,
                        "user": username
                    },
                });

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

        const fetchUser = async () => {
            try {
                const res = await axios.get(`${import.meta.env?.VITE_BASE_URL}/user`, {
                    headers: {
                        "email": username,
                        "x-auth-token": token
                    }
                });
                if (res.status === 201) {
                    setUser(res.data);
                    if (res.data.profilePhoto && res.data.profilePhoto) {
                        setbase64String(res.data.profilePhoto);
                    }
                    console.log('Base url is', base64String);
                    console.log(res.data.profilePhoto);
                    console.log("User data fetched successfully", res.data);
                } else {
                    console.log("Something went wrong while fetching user data", res.data);
                }
            } catch (e) {
                console.log(e);
            } finally {
                console.log('Image fetched successfully', base64String.substring(20));
            }
        };

        fetchTopics();
        fetchSubscibedTopics();
        fetchUser();
    }, [base64String]);

    return (
        <div className="card mb-3 mx-8 p-10" style={{ maxWidth: "540px", overflow: "hidden" }}>
            <div className="row no-gutters">
                <div className="col-md-4">
                    {base64String ? (
                        <img
                            src={`data:image/png;base64,${base64String}`}
                            alt="Profile"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    ) : (
                        <p>Loading image...</p>
                    )}

                </div>
                <div className="col-md-8">
                    {user && (<div className="card-body">
                        <h5 className="card-title">{user.firstName + ' ' + user.lastName}</h5>
                        <p className="card-text">{user.email}</p>
                    </div>)}
                    <div className="m-auto d-flex gap-3">

                        <div className="ml-3">
                            <h5 className="subscription">Subscriptions</h5>
                            <p className="subtotal">{subscribed}</p>
                        </div>
                        <div>
                            <h5 className="topics">Topics</h5>
                            <p className="topicstotal">{topics}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileCard;