import './Navbar.css';
import React from 'react';
import { Link } from 'react-router-dom';
import Logout from '../auth/Logout';

function Navbar ({ isAuthenticated, setIsAuthenticated }) {

    return (
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
            <div className='container'>
                <Link className='navbar-brand' href='/lands'>Land Coordinates</Link>
                <div className='collapse navbar-collapse'>
                    <ul className='navbar-nav custom-navbar'>
                        { isAuthenticated ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/addland">Add Land</Link>
                                </li>
                                <li className='nav-item'>
                                    <Logout setIsAuthenticated={setIsAuthenticated} />
                                </li>
                            </>
                    
                        ) : (
                            <>
                                <li className='nav-item'>
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link className="nav-link " to="/signup">Sign Up</Link>
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