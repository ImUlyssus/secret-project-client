import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

// import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Award from './pages/Award';
import BuyTicket from './pages/BuyTicket';
import Notification from './pages/Notification';
import Profile from './pages/Profile';
import OtherProfile from './pages/OtherProfile';
import Countdown from './pages/Countdown';
import SignUp from './pages/SignUp';
import Layout from './Layout'
import PrivacyPolicy from './pages/PrivacyPolicy';
import SignIn from './pages/SignIn';
import Unauthorized from './pages/Unauthorized';
import RequireAuth from './components/RequireAuth';
import AdminDashboard from './pages/AdminDashboard';
import OrderHistory from './pages/OrderHistory';
import Setting from './pages/SettingPage';
import FAQ from './pages/FAQPage';
import ChangeProfilePicturePage from './pages/ChangeProfilePicturePage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import PersistLogin from './components/PersistLogin';
import ContactUs from './pages/ContactUs';
import UserAgreement from './pages/UserAgreement';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Layout><SignIn /></Layout>} />
        <Route path="/register" element={<Layout><SignUp /></Layout>} />
        <Route path="/forgotpassword" element={<Layout><ForgotPasswordPage /></Layout>} />
        <Route element={<PersistLogin />}>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/contactus" element={<Layout><ContactUs /></Layout>} />
        <Route path="/award" element={<Layout><Award /></Layout>} />
        <Route path="/countdown" element={<Layout><Countdown /></Layout>} />
        <Route path="/otherprofile" element={<Layout><OtherProfile /></Layout>} />
        <Route path="/privacypolicy" element={<Layout><PrivacyPolicy /></Layout>} />
        <Route path="/useragreement" element={<Layout><UserAgreement /></Layout>} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        {/* Private Routes */}
        <Route path='' element={<RequireAuth allowedRoles={[0,1]}/>}>
          <Route path="/changeprofilepicture" element={<Layout><ChangeProfilePicturePage /></Layout>} />
          <Route path="/setting" element={<Layout><Setting /></Layout>} />
          <Route path="/faq" element={<Layout><FAQ /></Layout>} />
          <Route path="/notification" element={<Layout><Notification /></Layout>} />
          <Route path="/orderhistory" element={<Layout><OrderHistory /></Layout>} />
          <Route path="/profile/:id" element={<Layout><Profile /></Layout>} />
          <Route path="/otherprofile/:userId" element={<Layout><OtherProfile /></Layout>} />
        </Route>
        <Route path='' element={<RequireAuth allowedRoles={[1]}/>}>
          <Route path="/admindashboard" element={<Layout><AdminDashboard /></Layout>} />
        </Route>
        </Route>
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
      </Router>
  );
}

export default App;
