import { useEffect, useState } from 'react';
import './EstimateHistory.css';

const HISTORY_API_URL = 'http://localhost:5000/api/estimate';

function EstimateHistory({ onBack }) {
  const [estimates, setEstimates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch(HISTORY_API_URL);

        if (!response.ok) {
          throw new Error('Failed to fetch estimate history');
        }

        const data = await response.json();

        if (data.success) {
          setEstimates(data.estimates || []);
        } else {
          throw new Error(
            data.message || 'Failed to load estimate history'
          );
        }
      } catch (err) {
        console.error('History error:', err);
        setError('Unable to load estimate history.');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const formatDate = (date) => {
    if (!date) return 'Date unavailable';

    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="history-page">
        <div className="history-card loading-history">
          <div className="loading-spinner"></div>
          <p>Loading estimate history...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="history-page">
        <div className="history-card error-history">
          <div className="error-icon">!</div>

          <h2>Something went wrong</h2>

          <p>{error}</p>

          <button
            className="history-back-button"
            onClick={onBack}
          >
            ← Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="history-page">
      <div className="history-card">

        <button
          className="history-back-button"
          onClick={onBack}
        >
          ← Back
        </button>

        <div className="history-header">
          <p className="history-label">
            NORTHLINE ROOFING
          </p>

          <h1>Estimate History</h1>

          <p>
            View your previous roofing estimates.
          </p>
        </div>

        {estimates.length === 0 ? (
          <div className="empty-history">
            <div className="empty-icon">⌂</div>

            <h2>No Estimates Yet</h2>

            <p>
              Your completed roofing estimates will appear here.
            </p>
          </div>
        ) : (
          <div className="history-list">

            {estimates.map((estimate) => (
              <div
                className="history-item"
                key={estimate._id}
              >

                <div className="history-item-top">
                  <div>
                    <p className="history-item-label">
                      ESTIMATED PROJECT COST
                    </p>

                    <h2>
                      $
                      {Number(
                        estimate.estimatedCost || 0
                      ).toLocaleString()}
                    </h2>
                  </div>

                  <span className="history-date">
                    {formatDate(estimate.createdAt)}
                  </span>
                </div>

                <div className="history-details">

                  <div className="history-detail">
                    <span>Roof Type</span>
                    <strong>
                      {estimate.roof_type}
                    </strong>
                  </div>

                  <div className="history-detail">
                    <span>Roof Size</span>
                    <strong>
                      {estimate.roof_size}
                    </strong>
                  </div>

                  <div className="history-detail">
                    <span>Material</span>
                    <strong>
                      {estimate.roofing_material}
                    </strong>
                  </div>

                  <div className="history-detail">
                    <span>Condition</span>
                    <strong>
                      {estimate.roof_condition}
                    </strong>
                  </div>

                  <div className="history-detail">
                    <span>Timeline</span>
                    <strong>
                      {estimate.project_timeline}
                    </strong>
                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default EstimateHistory;