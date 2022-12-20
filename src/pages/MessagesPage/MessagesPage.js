import React, {Component} from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./MessagesPage.css";
import axios from "axios";
import {Button} from "react-bootstrap";

class MessagesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            messages: [],
            chats: [],
            currentChatId: 0
        }
        this.handleInput = this.handleInput.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
    }

    componentDidMount() {
        axios.get("http://localhost:9090/groupchat/list", {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("token")
            }
        })
            .then(res => {
                this.setState({chats: res.data.chat})
            })
    }

    handleInput(e) {
        this.setState({text: e.target.value});
    }

    sendMessage() {
        axios.post("http://localhost:9090/messages", {
            groupChatId: this.state.currentChatId,
            content: this.state.text,
            dateCreate: new Date()
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("token")
            }
        })
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className="messages-content">
                    <div className="messages-chat-list">
                        {this.state.chats.map((chat) =>
                            <h3 onClick={() => axios.post(`http://localhost:9090/messages/list`, {id: chat.id}, {
                                headers: {
                                    Authorization: 'Bearer ' + localStorage.getItem("token")
                                }
                            })
                                .then(res => this.setState({
                                    messages: res.data.messages,
                                    currentChatId: chat.id
                                }))}>{chat.name}</h3>
                        )}
                    </div>
                    <div className="messages-chat">
                        {this.state.messages.map((message) =>
                            <div className="message-row">
                                <h3>{message.content}</h3>
                                <h3>{message.personDTO.name}</h3>
                            </div>
                        )}
                        <div className="input-message-block">
                            <input value={this.state.text} name="message" className="messages-input"
                                   onChange={this.handleInput} type="text" placeholder="Введите сообщение..."/>
                            <Button onClick={this.sendMessage}>Отправить</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MessagesPage;