import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEmail } from './Context/EmailContext'; // Assuming EmailContext is your context file

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 
  const { login } = useEmail(); 

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8020/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data) {
        console.log('Login successful');
        login(email); 
        navigate('/home');
      } else {
        alert("Invalid email or password")
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error occurred while logging in :', error);
    }
  };

  const handleRegister = () => {
    navigate('/registration');
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center" style={{ color: "rgb(220, 31, 107)" }}>User Login</h3>
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label" style={{ fontWeight: "bold" }}>Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label" style={{ fontWeight: "bold" }}>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="text-center">
                  <button style={{ width: "25%" }} type="button" className="btn btn-primary" onClick={handleLogin}>Login</button>
                </div>
              </form>
              <p style={{ textAlign: 'center', marginTop: '10px', color: 'green' }}>
                New User ?{'   '}
                <span style={{marginLeft: '10px' ,textDecoration: 'underline', cursor: 'pointer' }} onClick={handleRegister}>SignUp</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
