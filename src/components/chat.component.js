import React, {Component} from 'react';

import * as firebase from 'firebase';

import '../assets/css/chat.css';

class ChatComponent extends Component {

    constructor (props) {
        super(props);

        const rootRef = firebase.database().ref();
        this.messagesRef = rootRef.child('messages');

        this.state = {
            messageWriting : "",
        };

    }

    componentDidMount() {
        // notre listener
        this.messagesRef.on('value', snapshot => {

            let messages;

            // les valeurs de la base de données sont récupérables via snapshot.val()
            // On récupère ces données sous la forme [index] = value
            messages = snapshot.val() ? Object.keys(snapshot.val()).map( key => {
                return snapshot.val()[key];
            }) :
            messages = [];

            // On met à jour notre state à partir des messages récupérés de Firebase
            this.props.updateMessage(messages);
        });
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }
    // Et on supprime le listener lorsque le composant est détruit
    componentWillUnmount() {
        this.messagesRef.on('value').off();
    }

    scrollToBottom = () => {
        this.scrollRef.scrollTop = this.scrollRef.scrollHeight;
    }

    handleTextChange = e => {
        this.setState({
            messageWriting : e.target.value
        });
    }

    sendNewMessage = e => {
        e.preventDefault();

        // On ajoute une nouvelle entrée dans notre base de données et on récupère la clé correspondante
        const newMessageKey = this.messagesRef.push().key;

        // On décrit notre nouvelle entrée
        let updates = {};
        updates['/messages/' + newMessageKey] = {
            name : this.props.name,
            text : this.state.messageWriting
        };

        // On met à jour
        firebase.database().ref().update(updates);

        this.setState({
            messageWriting : ""
        });

    }

    render() {

        let tchat;

         this.props.state.chat.messages ?
            tchat = this.props.state.chat.messages.map((message, index) => {

                if(message.name === this.props.name) {
                    return (
                        <div className="message-wrapper me " key={index}>
                            <div className="text-wrapper animated fadeIn">{message.text}</div>
                        </div>
                    );
                } else {
                    return (
                        <div className="message-wrapper them" key={index}>
                            <div className="circle-wrapper animated bounceIn" >{message.name}</div>
                            <div className="text-wrapper animated fadeIn">{message.text}</div>
                        </div>
                    );
                }

            }) :
            tchat = "pas encore de messages...";

        return (
            <form>
                <div className="wrapper">
                    <nav className="nav" id="nav">
                        <div className="default-nav">
                            <div className="main-nav">
                                <div className="main-nav-item">
                                    general - {this.props.name}
                                </div>
                                <div className="options" />
                            </div>
                        </div>
                    </nav>
                    <div
                        className="inner"
                        id="inner"
                        ref={(ref) => this.scrollRef = ref}
                    >
                        <div className="content" id="content" >
                            {tchat}
                        </div>
                    </div>
                    <div className="bottom" id="bottom">
                        <textarea
                            onChange={this.handleTextChange}
                            className="input"
                            id="input"
                            placeholder="saisissez votre texte ici.."
                            value={this.state.messageWriting}
                        />
                        <button onClick={this.sendNewMessage} className="send" id="send"/>
                    </div>

                </div>
            </form>
        );
    }
}

ChatComponent.propTypes = {
    state: React.PropTypes.object,
    updateMessage: React.PropTypes.func,
    name: React.PropTypes.string
};

export default ChatComponent;
