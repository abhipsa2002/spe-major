import React from 'react';
import { useNavigate } from 'react-router-dom';

const NoPath = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    return ( 
        <div className="failedlogin">
            <h1 style={{marginTop:20,marginBottom:20}}>No such Page is Available !!</h1>
            <button className="loginbtn" onClick={handleLogin}>Return to Login</button>
        </div>
     );
}

export default NoPath;
