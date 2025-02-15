import RegisterPage from './pages/auth/Register';
import Dashboard from './pages/home/Dashboard';
import IndexPage from './pages/home/Index';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ForgotPasswordPage from './pages/auth//ForgotPassword';
import ResetPasswordPage from './pages/auth/ResetPassword';
import CreateTopicPage from './components/functions/CreateTopic';
import Post from './pages/home/Posts';
import TopicDashboard from './pages/home/TopicDashboard';
import Profile from './pages/home/Profile';

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
          <Route path='/createTopic' element={<CreateTopicPage />} />
          <Route path="/posts/:id" element={<Post />} />
          <Route path="/topic/:id" element={<TopicDashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
