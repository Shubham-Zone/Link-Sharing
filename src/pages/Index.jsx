import LoginPage from './Login';
import RegisterPage from './Register';
import Post from '../components/PostCard';
import Navbar from '../components/NavBar';

function IndexPage() {
    return (
        <div className="container-fluid bg-white min-vh-100">
            <Navbar />

            <div className="container py-2 mt-4">
                <div className="row d-flex flex-row align-items-start justify-items-start">

                    {/* Left Section (Recent-shares + top posts) */}
                    <div className="col-lg-8 gap-10">

                        <div className="d-flex border border-3 border-secondary flex-column gap-3 mx-auto p-10">
                            <label className='fs-3' htmlFor="">Recent shares</label>
                            <Post img={''} title={'Post 1'} desc={'This is a demo post.'} />
                            <Post img={''} title={'Post 2'} desc={'This is a demo post.'} />
                            <Post img={''} title={'Post 3'} desc={'This is a demo post.'} />
                            <Post img={''} title={'Post 4'} desc={'This is a demo post.'} />
                        </div>
                        <br /> <br />

                        <div className="d-flex border border-3 border-secondary flex-column gap-3">
                            <label className='fs-3' htmlFor="">Top posts</label>
                            <Post img={''} title={'Post 1'} desc={'This is a demo post.'} />
                            <Post img={''} title={'Post 2'} desc={'This is a demo post.'} />
                            <Post img={''} title={'Post 3'} desc={'This is a demo post.'} />
                            <Post img={''} title={'Post 4'} desc={'This is a demo post.'} />
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
