import { useState } from 'react';

const API_URL = 'https://wantace-roof-estimator-2.onrender.com/api';

function OwnerPanel() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(localStorage.getItem('ownerToken'));
  const [pricing, setPricing] = useState([]);
  const [message, setMessage] = useState('');

  const login = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || 'Login failed');
        return;
      }

      localStorage.setItem('ownerToken', data.token);
      setToken(data.token);
      setMessage('Login successful');
      loadPricing(data.token);
    } catch (error) {
      setMessage('Unable to connect to server');
    }
  };

  const loadPricing = async (authToken = token) => {
    try {
      const response = await fetch(`${API_URL}/owner/pricing`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || 'Failed to load pricing');
        return;
      }

      setPricing(data.pricing || []);
    } catch (error) {
      setMessage('Unable to load pricing');
    }
  };

  const updatePricing = async (item) => {
    try {
      const response = await fetch(
        `${API_URL}/owner/pricing/${item._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            value: Number(item.value),
            unit: item.unit,
            active: item.active,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || 'Update failed');
        return;
      }

      setMessage(`${item.name} updated successfully`);
      loadPricing();
    } catch (error) {
      setMessage('Unable to update pricing');
    }
  };

  const logout = () => {
    localStorage.removeItem('ownerToken');
    setToken(null);
    setPricing([]);
    setMessage('');
  };

  if (!token) {
    return (
      <div style={{ maxWidth: 400, margin: '60px auto', padding: 20 }}>
        <h1>Owner Login</h1>

        <form onSubmit={login}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ display: 'block', width: '100%', marginBottom: 12, padding: 10 }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ display: 'block', width: '100%', marginBottom: 12, padding: 10 }}
          />

          <button type="submit">Login</button>
        </form>

        {message && <p>{message}</p>}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: '40px auto', padding: 20 }}>
      <h1>Owner Pricing Panel</h1>

      <button onClick={logout}>Logout</button>

      <button onClick={() => loadPricing()} style={{ marginLeft: 10 }}>
        Load Pricing
      </button>

      {message && <p>{message}</p>}

      {pricing.map((item) => (
        <div
          key={item._id}
          style={{
            border: '1px solid #ddd',
            padding: 16,
            marginTop: 16,
            borderRadius: 8,
          }}
        >
          <h3>{item.name}</h3>

          <input
            type="number"
            step="0.01"
            value={item.value}
            onChange={(e) =>
              setPricing((current) =>
                current.map((p) =>
                  p._id === item._id
                    ? { ...p, value: e.target.value }
                    : p
                )
              )
            }
          />

          <span style={{ marginLeft: 8 }}>{item.unit}</span>

          <button
            onClick={() => updatePricing(item)}
            style={{ marginLeft: 12 }}
          >
            Save
          </button>
        </div>
      ))}
    </div>
  );
}

export default OwnerPanel;