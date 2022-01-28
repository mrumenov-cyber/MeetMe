import React from "react";
import './WelcomeScreen.css';


function WelcomeScreen(props) {

    return props.showWelcomeScreen ?
    (
    <div className="WelcomeScreen">
        <h1>Welcome to the Meet app</h1>
            <br/>
            <br/>
        <h4>
                Log in to see upcoming events around the world for
                full-stack
                developers
            </h4>
            <br/>
        <div className="button_cont" align="center">
            <div class="google-btn">
                <div class="google-icon-wrapper">
                    <img
                    class="google-icon"
                    src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                    alt="Google sign-in"
                    />
                </div>
                <button onClick={() => { props.getAccessToken() }}
                    rel="nofollow noopener"
                    class="btn-text"
                    >
                    <b>Sign in with google</b>
                </button>
            </div>
        </div>
        <div className="privacy">
            <a
            href="https://mrumenov-cyber.github.io/meet/privacy.html"
            rel="nofollow noopener"
            >
            Privacy policy
            </a>
        </div>
    </div>
    ): null
}

export default WelcomeScreen;