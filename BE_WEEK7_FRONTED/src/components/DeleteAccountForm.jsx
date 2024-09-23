import React, { useState } from 'react';
import './DeleteAccountForm.css'; // CSS file for styling

const DeleteAccountForm = ({ onDeleteAccount }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch("http://localhost:5000/api/auth/delete-account", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        onDeleteAccount(password); // Handle successful account deletion
      } else {
        setError(data.message || 'Account deletion failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="auth-form">
      <h2>Delete Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Delete Account</button>
      </form>
    </div>
  );
};

export default DeleteAccountForm;




