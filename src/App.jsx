import RegisterPage from './pages/Register';
import Dashboard from './pages/Dashboard';
import IndexPage from './pages/Index';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ForgotPasswordPage from './pages/ForgotPassword';
import ResetPasswordPage from './pages/ResetPassword';
import CreateTopicPage from './components/CreateTopic';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path='/' element={<IndexPage />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/resetpassword" element={<ResetPasswordPage />} />
          <Route path='/createTopic' element={<CreateTopicPage/>} />
          {/* <Route index element={<Home />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NoPage />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
