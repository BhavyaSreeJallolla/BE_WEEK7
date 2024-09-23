import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ChangePasswordForm from './components/ChangePasswordForm';
import DeleteAccountForm from './components/DeleteAccountForm';

const App = () => {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('login');

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentView('welcome');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('login');
  };

  return (
    <div className="App">
      <div className="content"> {/* New wrapper div for centering */}
        {currentView === 'welcome' ? (
          <div>
            <h1>Welcome, {user.name}!</h1>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={() => setCurrentView('changePassword')}>Change Password</button>
            <button onClick={() => setCurrentView('deleteAccount')}>Delete Account</button>
          </div>
        ) : currentView === 'login' ? (
          <LoginForm onLogin={handleLogin} />
        ) : currentView === 'register' ? (
          <RegisterForm onRegister={handleLogin} />
        ) : currentView === 'changePassword' ? (
          <ChangePasswordForm user={user} />
        ) : (
          <DeleteAccountForm user={user} onLogout={handleLogout} />
        )}
        <div className="nav-buttons">
          <button onClick={() => setCurrentView('login')}>Login</button>
          <button onClick={() => setCurrentView('register')}>Register</button>
          <button onClick={() => setCurrentView('changePassword')}>changePassword</button>
          <button onClick={() => setCurrentView('deleteAccount')}>deleteAccount</button>
        </div>
      </div>
    </div>
  );
};

export default App;
