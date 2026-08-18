
import { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import './Estimator.css';

const API_URL = 'https://wantace-roof-estimator-2.onrender.com/api/questions';
const ESTIMATE_API_URL = 'https://wantace-roof-estimator-2.onrender.com/api/estimate';

function Estimator({ onBack }) {
  const [step, setStep] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [calculating, setCalculating] = useState(false);
  const [error, setError] = useState('');
  const [estimate, setEstimate] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }

        const data = await response.json();

        if (data.success) {
          setQuestions(data.questions);
        } else {
          throw new Error('Questions could not be loaded');
        }
      } catch (err) {
        console.error('Error fetching questions:', err);
        setError('Unable to load questions. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const updateAnswer = (key, value) => {
    setAnswers((previous) => ({
      ...previous,
      [key]: value,
    }));

    setError('');
  };

  const handleContinue = async () => {
    const currentQuestion = questions[step - 1];

    if (!currentQuestion) {
      return;
    }

    const currentAnswer = answers[currentQuestion.key];

    if (currentQuestion.required && !currentAnswer) {
      alert('Please select an answer.');
      return;
    }

    if (step < questions.length) {
      setStep(step + 1);
      return;
    }

    try {
      setCalculating(true);
      setError('');

      const response = await fetch(ESTIMATE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(answers),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || 'Failed to calculate estimate'
        );
      }

      setEstimate(data.estimate);
    } catch (err) {
      console.error('Estimate error:', err);

      setError(
        'Unable to calculate your estimate. Please try again.'
      );
    } finally {
      setCalculating(false);
    }
  };

  const handleBack = () => {
    if (estimate) {
      setEstimate(null);
      return;
    }

    if (step === 1) {
      onBack();
    } else {
      setStep(step - 1);
    }
  };

  const handleStartAgain = () => {
    setEstimate(null);
    setStep(1);
    setAnswers({});
    setError('');
  };

  const handleDownloadEstimate = () => {
    if (!estimate) {
      return;
    }

    const pdf = new jsPDF();

    pdf.setFontSize(22);
    pdf.text('Northline Roofing', 20, 25);

    pdf.setFontSize(18);
    pdf.text('Roofing Estimate', 20, 40);

    pdf.setFontSize(12);
    pdf.text('ESTIMATED PROJECT COST', 20, 58);

    pdf.setFontSize(24);
    pdf.text(
      `$${estimate.estimatedCost.toLocaleString()}`,
      20,
      72
    );

    pdf.setFontSize(14);
    pdf.text('Project Summary', 20, 95);

    pdf.setFontSize(12);

    pdf.text(
      `Roof Type: ${estimate.roofType}`,
      20,
      110
    );

    pdf.text(
      `Roof Size: ${estimate.roofSize}`,
      20,
      122
    );

    pdf.text(
      `Roofing Material: ${estimate.roofingMaterial}`,
      20,
      134
    );

    pdf.text(
      `Roof Condition: ${estimate.roofCondition}`,
      20,
      146
    );

    pdf.text(
      `Project Timeline: ${estimate.projectTimeline}`,
      20,
      158
    );

    pdf.setFontSize(10);

    pdf.text(
      'This is an estimated project cost based on the',
      20,
      180
    );

    pdf.text(
      'information provided. Final pricing may vary depending',
      20,
      190
    );

    pdf.text(
      'on the actual roof inspection and project requirements.',
      20,
      200
    );

    pdf.save('roofing-estimate.pdf');
  };

  if (loading) {
    return (
      <div className="estimator-page">
        <div className="estimator-card loading-card">
          <div className="loading-spinner"></div>
          <p>Loading questions...</p>
        </div>
      </div>
    );
  }

  if (error && !estimate && questions.length === 0) {
    return (
      <div className="estimator-page">
        <div className="estimator-card error-card">
          <div className="error-icon">!</div>

          <h2>Something went wrong</h2>

          <p>{error}</p>

          <button
            className="back-button"
            onClick={onBack}
          >
            ← Back
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="estimator-page">
        <div className="estimator-card">
          <p>No questions available.</p>

          <button
            className="back-button"
            onClick={onBack}
          >
            ← Back
          </button>
        </div>
      </div>
    );
  }

  if (estimate) {
    return (
      <div className="estimator-page">
        <div className="estimator-card result-card">

          <button
            className="back-button"
            onClick={handleBack}
          >
            ← Back
          </button>

          <div className="result-header">
            <p className="step-label">
              ESTIMATE RESULT
            </p>

            <h1>Your Roofing Estimate</h1>

            <p className="question-description">
              Based on the information you provided, your estimated roofing project cost is:
            </p>
          </div>

          <div className="estimate-result">
            <p className="estimate-label">
              ESTIMATED PROJECT COST
            </p>

            <h2>
              ${estimate.estimatedCost.toLocaleString()}
            </h2>

            <p className="estimate-subtitle">
              Estimated Project Cost
            </p>
          </div>

          <div className="cost-breakdown">
            <h3>Project Summary</h3>

            <div className="cost-row">
              <span>Roof Type</span>
              <strong>{estimate.roofType}</strong>
            </div>

            <div className="cost-row">
              <span>Roof Size</span>
              <strong>{estimate.roofSize}</strong>
            </div>

            <div className="cost-row">
              <span>Roofing Material</span>
              <strong>{estimate.roofingMaterial}</strong>
            </div>

            <div className="cost-row">
              <span>Roof Condition</span>
              <strong>{estimate.roofCondition}</strong>
            </div>

            <div className="cost-row">
              <span>Project Timeline</span>
              <strong>{estimate.projectTimeline}</strong>
            </div>
          </div>

          <div className="estimate-note">
            <div className="note-icon">i</div>

            <p>
              This is an estimated project cost based on the information provided. Final pricing may vary depending on the actual roof inspection and project requirements.
            </p>
          </div>

          <button
            className="download-button"
            onClick={handleDownloadEstimate}
          >
            Download Estimate
          </button>

          <button
            className="continue-button"
            onClick={handleStartAgain}
          >
            Start Again
          </button>

        </div>
      </div>
    );
  }

  const currentQuestion = questions[step - 1];

  return (
    <div className="estimator-page">
      <div className="estimator-card">

        <button
          className="back-button"
          onClick={handleBack}
        >
          ← Back
        </button>

        <div className="progress-section">

          <div className="step-row">

            <p className="step-label">
              STEP {step} OF {questions.length}
            </p>

            <p className="progress-percent">
              {Math.round(
                (step / questions.length) * 100
              )}
              %
            </p>

          </div>

          <div className="progress-bar">

            <div
              className="progress-fill"
              style={{
                width: `${(step / questions.length) * 100}%`,
              }}
            ></div>

          </div>

        </div>

        <h1>{currentQuestion.label}</h1>

        <p className="question-description">
          Select the option that best matches your roofing project.
        </p>

        {currentQuestion.type === 'select' && (
          <div className="options">

            {currentQuestion.options.map((option) => (
              <button
                key={option}
                className={`option ${
                  answers[currentQuestion.key] === option
                    ? 'selected'
                    : ''
                }`}
                onClick={() =>
                  updateAnswer(
                    currentQuestion.key,
                    option
                  )
                }
              >

                <span>{option}</span>

                {answers[currentQuestion.key] === option && (
                  <span className="check-mark">
                    ✓
                  </span>
                )}

              </button>
            ))}

          </div>
        )}

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        <button
          className="continue-button"
          onClick={handleContinue}
          disabled={calculating}
        >
          {calculating
            ? 'Calculating...'
            : step === questions.length
              ? 'Get Estimate'
              : 'Continue'}
        </button>

      </div>
    </div>
  );
}

export default Estimator;
