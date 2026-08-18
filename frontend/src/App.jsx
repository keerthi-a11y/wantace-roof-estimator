import { useState } from 'react';
import './App.css';

import Estimator from './components/estimator/Estimator';
import EstimateHistory from './components/history/EstimateHistory';
import OwnerPanel from './OwnerPanel';

function App() {

  const [showEstimator, setShowEstimator] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showOwnerPanel, setShowOwnerPanel] = useState(false);


  // Estimator page
  if (showEstimator) {
    return (
      <Estimator
        onBack={() => setShowEstimator(false)}
      />
    );
  }


  // Estimate History page
  if (showHistory) {
    return (
      <EstimateHistory
        onBack={() => setShowHistory(false)}
      />
    );
  }


  // Owner Panel page
  if (showOwnerPanel) {
    return (
      <OwnerPanel />
    );
  }


  // Home page
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


          <button
            className="start-button"
            onClick={() => setShowEstimator(true)}
          >
            Start Your Estimate
          </button>


          <button
            className="history-button"
            onClick={() => setShowHistory(true)}
          >
            Estimate History
          </button>


          <button
            className="history-button"
            onClick={() => setShowOwnerPanel(true)}
          >
            Owner Panel
          </button>


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

export default App;