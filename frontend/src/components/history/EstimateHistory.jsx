import { useEffect, useState } from 'react';
import './EstimateHistory.css';

const HISTORY_API_URL = 'http://localhost:5000/api/estimate';

function EstimateHistory({ onBack }) {
  const [estimates, setEstimates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEstimates = async () => {
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
            data.message || 'Could not load estimate history'
          );
        }
      } catch (err) {
        console.error('History error:', err);
        setError('Unable to load estimate history.');
      } finally {
        setLoading(false);
      }
    };

    fetchEstimates();
  }, []);

  if (loading) {
    return (
      <div className="history-page">
        <div className="history-card">
          <div className="loading-spinner"></div>
          <p>Loading estimate history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="history-page">
      <div className="history-card">

        <button
          className="back-button"
          onClick={onBack}
        >
          ← Back
        </button>

        <p className="history-label">
          NORTHLINE ROOFING
        </p>

        <h1>Estimate History</h1>

        <p className="history-description">
          View your previous roofing estimates.
        </p>

        {error && (
          <div className="history-error">
            {error}
          </div>
        )}

        {!error && estimates.length === 0 && (
          <div className="empty-history">
            <h2>No estimates yet</h2>
            <p>
              Complete a roofing estimate and it will appear here.
            </p>
          </div>
        )}

        {!error && estimates.length > 0 && (
          <div className="estimate-list">
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
                    {estimate.createdAt
                      ? new Date(
                          estimate.createdAt
                        ).toLocaleDateString()
                      : ''}
                  </span>
                </div>

                <div className="history-details">
                  <div>
                    <span>Roof Type</span>
                    <strong>{estimate.roof_type}</strong>
                  </div>

                  <div>
                    <span>Roof Size</span>
                    <strong>{estimate.roof_size}</strong>
                  </div>

                  <div>
                    <span>Material</span>
                    <strong>
                      {estimate.roofing_material}
                    </strong>
                  </div>

                  <div>
                    <span>Condition</span>
                    <strong>
                      {estimate.roof_condition}
                    </strong>
                  </div>

                  <div>
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