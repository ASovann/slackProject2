import React from 'react';
import {Link} from 'react-router';

import logo from '../assets/images/logo.svg';

import '../assets/css/app.css';

const AppComponent = props => {

    return (
        <div className="App">
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h2>Hey ! Bienvenue sur ton application React</h2>
                <nav>
                    <ul>
                        <li><Link to="/">Accueil</Link></li>
                    </ul>
                </nav>
            </div>

            {props.children}

        </div>
    );

};

AppComponent.propTypes = {
    children: React.PropTypes.object,
};

export default AppComponent;
