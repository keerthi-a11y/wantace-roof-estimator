
import { useState } from 'react';
import './App.css';
import Estimator from './components/estimator/Estimator';
import EstimateHistory from './components/history/EstimateHistory';

function App() {
  const [showEstimator, setShowEstimator] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  // Show Estimator page
  if (showEstimator) {
    return (
      <Estimator
        onBack={() => setShowEstimator(false)}
      />
    );
  }

  // Show Estimate History page
  if (showHistory) {
    return (
      <EstimateHistory
        onBack={() => setShowHistory(false)}
      />
    );
  }

  // Home page
  return (
    <div className="app">

      {/* Header */}
      <header className="header">
        <div className="logo">
          Northline Roofing
        </div>

        <div className="header-subtitle">
          Roofing & Exteriors
        </div>
      </header>

      {/* Hero Section */}
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

          {/* Start Estimate */}
          <button
            className="start-button"
            onClick={() => setShowEstimator(true)}
          >
            Start Your Estimate
          </button>

          {/* Estimate History */}
          <button
            className="history-button"
            onClick={() => setShowHistory(true)}
          >
            Estimate History
          </button>

          <p className="small-text">
            Takes about 2 minutes · No obligation
          </p>

        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        Serving Columbus, OH
      </footer>

    </div>
  );
}

export default App;

