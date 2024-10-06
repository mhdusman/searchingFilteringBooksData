import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { backendUrl, googleLoginPath, microsoftLoginPath } from '../config/BackendUrl';
// import { setTheme } from '../config/GlobalFunctions';
import logo from '../static/logo-golden.png';


export const Login = () => {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

    useEffect(() => {
        // setTheme();
    }, [])

    if (isAuthenticated) {
        return <Redirect to="/" />
    } else {
        return (
            <div className="height-100">
                 <img className="logo-large" src={logo} alt="app logo" />
                <div className="padding-top-5">
                    <a id="google-signin" href={`${backendUrl}${googleLoginPath}`} className="z-depth-2 margin-auto login-btn waves-effect waves-light btn red lighten-1">Sign in with Google</a>
                    <br />
                    <a id="microsoft-signin" href={`${backendUrl}${microsoftLoginPath}`} className="z-depth-2 margin-auto login-btn waves-effect waves-light btn blue lighten-1">Sign in with Microsoft</a>
                    <br />
                </div>
                <div className="login-footer">
                    <Link to="/" className="margin-auto display-block width-content">Minnatul Aleem Search</Link>
                    <p className="width-content margin-auto grey-text">Copyrights &#169; 2020. All rights reserved.</p>
                </div>
            </div>
        )
    }
};