import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUser } from '../../api/user';

function DashboardNavbar({ status, setStatus }) {
    const navigate = useNavigate();
    const [curUser, setcurUser] = useState(null);

    const logout = () => {
        localStorage.clear();
        navigate('/');
    }

    useEffect(() => {
        const handleFetchUser = async () => {
            try {
                const res = await fetchUser();
                if (res.status === 201) {
                    setcurUser(res.data);
                    console.log("User data fetched successfully at dashboard", res.data);
                } else {
                    console.log("Something went wrong while fetching user data at dashboard", res.data);
                }
            } catch (e) {
                console.log(e);
            }
        };
        handleFetchUser();
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand text-decoration-underline text-primary" href="#">
                    Link Sharing
                </a>

                {/* Toggler for Mobile View */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar Items (Right-Aligned Search Bar and Icons) */}
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <form className="d-flex ms-auto align-items-center">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <button className="btn btn-outline-success" type="submit">
                            Search
                        </button>

                        {/* Icons */}
                        <div className="d-flex ms-3">
                            <i onClick={() => setStatus(prev => ({ ...prev, createTopic: !prev.createTopic }))} className={`bi bi-chat-fill me-3 fs-4 ${status.createTopic ? 'text-success' : 'text-dark'}`}></i>
                            <i className="bi bi-envelope me-3 fs-4 text-dark"></i>
                            <i onClick={() => setStatus(prev => ({ ...prev, shareLink: !prev.shareLink }))} className={`bi bi-link me-3 fs-4 ${status.shareLink ? 'text-success' : 'text-dark'}`}></i>
                            <i onClick={() => setStatus(prev => ({ ...prev, shareDocs: !prev.shareDocs }))} className={`bi bi-file-earmark-plus-fill me-3 fs-4 ${status.shareDocs ? 'text-success' : 'text-dark'}`}></i>
                            <i className="bi bi-person-fill fs-4 text-dark"></i>
                            <div className="btn-group ml-3">
                                {curUser && (<button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                    {curUser.firstName + ' ' + curUser.lastName}
                                </button>)}
                                <ul class="dropdown-menu dropdown-menu-end">
                                    <li><button class="dropdown-item" type="button">Profile</button></li>
                                    <li><button class="dropdown-item" type="button">Users</button></li>
                                    <li><button class="dropdown-item" type="button">Topics</button></li>
                                    <li><button class="dropdown-item" type="button">Posts</button></li>
                                    <li><button onClick={() => logout()} class="dropdown-item" type="button">Logout</button></li>
                                </ul>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default DashboardNavbar;
