import React, {Component} from 'react';

import ChatContainer from '../containers/chat.container';
import GetUserNameComponent from '../components/get-user-name.component';

import '../assets/css/home.css';

class HomeComponent extends Component {

    validate = e => {
        e.preventDefault();
        this.props.validateName();
    }

    render() {

        let chatContent = this.props.state.general.name && this.props.state.general.nameValidate ?
            <ChatContainer name={this.props.state.general.name}/> :
            (
                <GetUserNameComponent
                    updateName={(e) => this.props.updateName(e.target.value)}
                    validate={(e) => this.validate(e)}
                />
            );

        return (
            <div id="main-home">
                <h3> Messages </h3>
                {chatContent}
            </div>
        );
    }
}

HomeComponent.propTypes = {
    state: React.PropTypes.object,
    updateName:  React.PropTypes.func,
    validateName:  React.PropTypes.func,
};

export default HomeComponent;
