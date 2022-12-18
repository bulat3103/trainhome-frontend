import React, {Component} from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./MessagesPage.css";

class MessagesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            messages: []
        }
        this.handleInput = this.handleInput.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
    }

    componentDidMount() {
        //axios.get().then(res => {
        //  this.setState({messages: res.data})
        // })
    }

    handleInput(e) {
        this.setState({text: e.target.value});
    }

    sendMessage() {

    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className="messages-content">
                    <div className="messages-chat-list">

                    </div>
                    <div className="messages-chat">
                        <input value={this.state.text} name="message" className="messages-input"
                            onChange={this.handleInput} onSubmit={this.sendMessage} type="text" placeholder="Введите сообщение..."/>
                    </div>
                </div>
            </div>
        );
    }
}

export default MessagesPage;