import React from "react";
import { Link } from "react-router-dom";

function Welcome () {
    return (
        <div>
            <header>
                <h1>Welcome to the Land Coordinates website</h1>
            </header>
            <main>
                <p>Find and manage lands specific coordinates.</p>
                <br/>
                <Link to='/login'>
                    <button>Sign in</button>
                </Link>
                <Link to='/signup'>
                    <button>Create account</button>
                </Link>
            </main>
        </div>
    );
};

export default Welcome;