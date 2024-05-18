import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { EmailProvider } from './Context/EmailContext';
import UserLogin from './UserLogin';
import UserRegistrationForm from './Registration';
import HomePage from './Home';
import PredictionPage from './Prediction';
import PastImagesPage from './PastCaptions';
import NoPath from './NoPath';

function App() {
  return (
    <EmailProvider>
    <Router>
      <Routes>
        <Route exact path="/login" element={<UserLogin />} />
        <Route path="/registration" element={<UserRegistrationForm />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/generate" element={<PredictionPage />} />
        <Route path="/pastCaptions" element={<PastImagesPage />} />
        <Route path="*" element={<NoPath />} />
      </Routes>
    </Router>
    </EmailProvider>
  );
}

export default App;