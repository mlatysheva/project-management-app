import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store } from './store/store';
import Home from './components/Home/Home';
import ErrorPage from './components/ErrorPage';
import ErrorBoundary from './components/ErrorBoundary';
import Footer from './components/Footer';
import { Provider } from 'react-redux';
import CreateBoard from './components/Home/CreateBoard';
import Header from './components/Header';

function App() {
  return (
    <div className="App">      
      <ErrorBoundary>
        <Router>
          <Provider store={store}>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<CreateBoard /> } />                  
                <Route path="error" element={<ErrorPage />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
              <Footer />
          </Provider>
          </Router>
      </ErrorBoundary>
    </div>
  );
}

export default App;
