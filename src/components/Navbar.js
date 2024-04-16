import './Navbar.css';
import React from 'react';
import { Link } from 'react-router-dom';
import Logout from '../auth/Logout';

function Navbar ({isAuthenticated}) {
    return (
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
            <div className='container'>
                <div className='navbar-header header'>
                    <a className='navbar-brand' href='/lands'>Land Coordinates</a>
                </div>
                <div className='collapse navbar-collapse'>
                    <ul className='nav navbar-nav navbar-right'>
                    {isAuthenticated ? (
                        <>
                            <li className='nav-item'>
                                < Logout />
                            </li>
                        </>
                    ) : (
                        <>
                            <li className='nav-item'>
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            <li className='nav-item'>
                                <Link className="nav-link" to="/signup">Sign Up</Link>
                            </li>
                        </>
                    )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;