import DashboardNavbar from "../components/DashboardNavbar";
import CreateTopicPage from "../components/CreateTopic";
import Post from "../components/PostCard";
import ShareLink from "../components/Sharelink";
import ShareDocument from "../components/Sharedocument";
import ProfileCard from "../components/ProfileCard";
import axios from "axios";
import { useEffect, useState } from "react";

function Dashboard() {

    const [topics, setTopics] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log('token is: ', token);
        const fetchTopics = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/topics", {
                    headers: {
                        "x-auth-token": token,
                    },
                });

                if (response.status === 200) {
                    console.log(response.data);
                    setTopics(response.data);
                } else {
                    console.log(response);
                }
            } catch (e) {
                console.log(e);
            }
        };

        fetchTopics();
    }, []);

    return (
        <>
            <div className="container-fluid bg-white min-vh-100">
                <DashboardNavbar />

                <div className="container py-2 mt-4">
                    <div className="row d-flex flex-row align-items-start justify-items-start">

                        {/* Left Section (Recent-shares + top posts) */}
                        <div className="col-lg-8 gap-10">

                            <ProfileCard img={''} title={'Shubham Kumar'} desc={'demo'} />

                            <div className="d-flex border border-3 border-secondary flex-column gap-3 mx-auto p-10 mb-3">
                                <label className='fs-3' htmlFor="">Subscriptions</label>
                                <Post img={''} title={'Post 1'} desc={'This is a demo post.'} />
                                <Post img={''} title={'Post 2'} desc={'This is a demo post.'} />
                                <Post img={''} title={'Post 3'} desc={'This is a demo post.'} />
                                <Post img={''} title={'Post 4'} desc={'This is a demo post.'} />
                            </div>

                            <div className="d-flex border border-3 border-secondary flex-column gap-3 mx-auto p-10 mb-3">
                                <label className='fs-3' htmlFor="">Trending topics</label>
                                {
                                    topics.map((topic) => 
                                        <Post img={''} name={topic.name} createdBy={topic.createdBy} visibility={topic.visibility} />
                                    )
                                }
                                {/* <Post img={''} title={'Post 1'} desc={'This is a demo post.'} />
                                <Post img={''} title={'Post 2'} desc={'This is a demo post.'} />
                                <Post img={''} title={'Post 3'} desc={'This is a demo post.'} />
                                <Post img={''} title={'Post 4'} desc={'This is a demo post.'} /> */}
                            </div>

                            <br /> <br />
                            <CreateTopicPage />
                        </div>

                        {/* Right Section (Login + Register) */}
                        <div className="col-lg-4">
                            <div className="d-flex border border-3 border-secondary flex-column gap-3 mx-auto p-10 mb-3">
                                <label className='fs-3' htmlFor="">Inbox</label>
                                <Post img={''} title={'Post 1'} desc={'This is a demo post.'} />
                                <Post img={''} title={'Post 2'} desc={'This is a demo post.'} />
                                <Post img={''} title={'Post 3'} desc={'This is a demo post.'} />
                                <Post img={''} title={'Post 4'} desc={'This is a demo post.'} />
                            </div>
                            <div className="d-flex flex-column gap-3">
                                <ShareLink />
                                <ShareDocument />
                                <CreateTopicPage />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;