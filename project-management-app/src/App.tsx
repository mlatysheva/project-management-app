import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import ErrorPage from './components/ErrorPage';
import ErrorBoundary from './components/ErrorBoundary';
import Footer from './components/Footer';
import CreateBoard from './components/Board/CreateBoard';
import Header from './components/Header';

function App() {
  return (
    <div className="App">      
      <ErrorBoundary>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project-management-app" element={<Home />} />
            <Route path="/create" element={<CreateBoard /> } />                  
            <Route path="error" element={<ErrorPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <Footer />
        </Router>
      </ErrorBoundary>
    </div>
  );
}

export default App;
