import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Estimator from './components/estimator/Estimator';
import EstimateHistory from './components/history/EstimateHistory';
import OwnerPanel from './OwnerPanel';

function Home() {
  return (
    <div className="app">

      <header className="header">
        <div className="logo">
          Northline Roofing
        </div>

        <div className="header-subtitle">
          Roofing & Exteriors
        </div>
      </header>


      <main className="hero">

        <div className="hero-content">

          <p className="eyebrow">
            NORTHLINE ROOFING & EXTERIORS
          </p>

          <h1>
            Get your roofing
            <br />
            estimate in a few steps.
          </h1>

          <p className="description">
            Tell us a little about your roof and we'll provide
            an estimated cost range for your project.
          </p>


          <a href="/estimate">
            <button className="start-button">
              Start Your Estimate
            </button>
          </a>


          <a href="/history">
            <button className="history-button">
              Estimate History
            </button>
          </a>


          <a href="/owner">
            <button className="history-button">
              Owner Panel
            </button>
          </a>


          <p className="small-text">
            Takes about 2 minutes · No obligation
          </p>

        </div>

      </main>


      <footer className="footer">
        Serving Columbus, OH
      </footer>

    </div>
  );
}


function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route 
          path="/estimate" 
          element={<Estimator onBack={() => window.history.back()} />} 
        />

        <Route 
          path="/history" 
          element={<EstimateHistory onBack={() => window.history.back()} />} 
        />

        <Route 
          path="/owner" 
          element={<OwnerPanel />} 
        />

      </Routes>

    </BrowserRouter>
  );
}


export default App;