import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom';

function DashboardNavbar() {
    const navigate = useNavigate();
    const user = localStorage.getItem('user');


    const logout = () => {
        localStorage.clear();
        navigate('/');
    }

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
                            <i onClick={() => navigate('/createTopic')} className="bi bi-chat-fill me-3 fs-4 text-dark"></i>
                            <i className="bi bi-envelope me-3 fs-4 text-dark"></i>
                            <i className="bi bi-link me-3 fs-4 text-dark"></i>
                            <i className="bi bi-file-earmark-plus-fill me-3 fs-4 text-dark"></i>
                            <i className="bi bi-person-fill fs-4 text-dark"></i>
                            <div className="btn-group ml-3">
                                <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                    {user}
                                </button>
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
