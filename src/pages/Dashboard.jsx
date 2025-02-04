import DashboardNavbar from "../components/navbars/DashboardNavbar";
import CreateTopicPage from "../components/functions/CreateTopic";
import PostCard from "../components/cards/PostCard";
import SubscribedTopicCard from "../components/cards/SubscribedTopicCard";
import ShareLink from "../components/functions/Sharelink";
import ShareDocument from "../components/functions/Sharedocument";
import ProfileCard from "../components/cards/ProfileCard";
import axios from "axios";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Dashboard() {

    const [topics, setTopics] = useState([]);
    const [subscribedTopics, setsubscribedTopics] = useState([]);
    const username = localStorage.getItem('user');
    const [status, setStatus] = useState({
        shareLink: false,
        shareDocs: false,
        createTopic: false,
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log('token is: ', token);
        const fetchTopics = async () => {

            try {
                const response = await axios.get(`${import.meta.env?.VITE_BASE_URL}/topics`, {
                    headers: {
                        "x-auth-token": token,
                    },
                });

                if (response.status === 200) {
                    // console.log(response.data);
                    setTopics(response.data);
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
                    console.log(response.data.length);
                    setsubscribedTopics(response.data);
                    console.log(response.data);
                } else {
                    console.log(response);
                }
            } catch (e) {
                console.log(e);
            }
        }

        fetchTopics();
        fetchSubscibedTopics();
    }, []);

    return (
        <>
            <div className="container-fluid bg-white min-vh-100">
                <DashboardNavbar status={status} setStatus={setStatus} />

                <div className="container py-2 mt-4">
                    <div className="row d-flex flex-row align-items-start justify-items-start">

                        {/* Left Section (Recent-shares + top posts) */}
                        {topics.length > 0 && (<div className="col-lg-8 gap-10">

                            <ProfileCard />

                            {/*Subscribed Topics*/}
                            <div className="d-flex border border-3 border-secondary flex-column gap-3 mx-auto p-10 mb-3">
                                <label className='fs-3' htmlFor="">Subscriptions</label>
                                {
                                    subscribedTopics.map((topic) =>

                                        <SubscribedTopicCard
                                            topic={topic}
                                            type={'sub'}
                                        />
                                    )
                                }
                            </div>

                            {/*Trending Topics*/}
                            <div className="d-flex border border-3 border-secondary flex-column gap-3 mx-auto p-10 mb-3">
                                <label className='fs-3' htmlFor="">Trending topics</label>
                                {
                                    topics.map((topic) =>
                                        <PostCard key={topic._id} topic={topic} type={'pub'} />
                                    )
                                }
                            </div>

                            <br /> <br />
                            <CreateTopicPage />
                        </div>
                        )}

                        {/* Right Section (Login + Register) */}
                        <div className="col-lg-4">
                            {topics.length > 0 && (<div className="d-flex border border-3 border-secondary flex-column gap-3 mx-auto p-10 mb-3">
                                <label className='fs-3' htmlFor="">Inbox</label>
                                {/* <Post img={''} title={'Post 1'} desc={'This is a demo post.'} />
                                <Post img={''} title={'Post 2'} desc={'This is a demo post.'} />
                                <Post img={''} title={'Post 3'} desc={'This is a demo post.'} />
                                <Post img={''} title={'Post 4'} desc={'This is a demo post.'} /> */}
                            </div>)}
                            <div className="d-flex flex-column gap-3">
                                {status.shareLink && (<ShareLink />)}
                                {status.shareDocs && (<ShareDocument />)}
                                {status.createTopic && (<CreateTopicPage />)}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    );
}

export default Dashboard;