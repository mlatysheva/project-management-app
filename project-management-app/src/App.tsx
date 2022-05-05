import './App.css';
import { Routes, Route } from 'react-router-dom';
import { store } from './store/store';
import Home from './components/Home/Home';
import Projects from './components/Projects/Projects';
import ErrorPage from './components/ErrorPage';
import Header from './components/Header';
import ErrorBoundary from './components/ErrorBoundary';
import Footer from './components/Footer';
import { Provider } from 'react-redux';

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Provider store={store}>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="projects" element={<Projects />} />
              <Route path="error" element={<ErrorPage />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
            <Footer />
        </Provider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
