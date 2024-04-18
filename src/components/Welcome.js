import React from "react";
import { Link } from "react-router-dom";
import './welcome.css';

function Welcome () {
    return (
        <div className="container welcome">
            <header>
                <h1>Welcome to the Land Coordinates website</h1>
            </header>
            <main>
                <div className="row">
                    <div className="col-md-6">
                        <br /><br />
                        <h4>
                            <strong>
                                <em>
                                    Find and manage lands
                                    <br/>
                                    with specific coordinates.
                                </em>
                            </strong>
                        </h4>
                    </div>
                    <div className="col-md-4">
                    <br />
                        <div className="card">
                            <div className="card-body">
                                <p className="authenticate">Create an account</p>
                                <Link to='/signup'>
                                    Sign up
                                </Link>
                                <br /><br />
                                <p className="authenticate">Already have an account?</p>
                                <Link to='/login'>
                                    Sign in
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Welcome;