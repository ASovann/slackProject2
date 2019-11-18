import React from 'react';
import '../assets/css/get-user-name.css';

const GetUserNameComponent = props => {
    return (
        <div id="get-user-name">
            <input
                onChange={props.updateName}
                className="input"
                id="input"
                placeholder="saisissez votre nom ici.."
            />
            <button onClick={props.validate} className="send" id="send">
                Valider !
            </button>
        </div>
    );
};

GetUserNameComponent.propTypes = {
    updateName :  React.PropTypes.func,
    validate :  React.PropTypes.func,
};

export default GetUserNameComponent;
