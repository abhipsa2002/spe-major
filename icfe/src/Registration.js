import React, { useState } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './register.css';

const UserRegistrationForm = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    phone: '',
    email: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm('Are you sure you want to cancel? Any unsaved changes will be lost.');
    if (confirmCancel) {
      navigate('/login');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8020/user/register', formData);
      console.log('Server Response:', response.data);
      if(response.data===""){
        alert("Enter all the details")
      }
      else{
        alert('Registration Successful!');
        navigate('/login');

      }
    } catch (error) {
      console.error('Error during registration:', error.response ? error.response.data : error.message);
      alert('Registration Failed!');
    }
  };

  return (
    <div>
      <h1 className="registration-heading" style={{marginTop:0}}>Registration Form</h1>
    <div className="registration-container">
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label className="form-lbl">First Name :</Form.Label>
        <Form.Control
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label className="form-lbl">Last Name :</Form.Label>
        <Form.Control
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label className="form-lbl">Phone :</Form.Label>
        <Form.Control
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label className="form-lbl">Email :</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label className="form-lbl">Password :</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </Form.Group>
      <div className="text-center">
            <button type="submit" className="submit-btn">Register</button>
      </div>
      <div className="text-center">
        <button type="cancel" onClick={handleCancel} className="cancel-btn">Cancel</button>
      </div>
    </Form>
    </div>
    </div>
  );
};

export default UserRegistrationForm;
