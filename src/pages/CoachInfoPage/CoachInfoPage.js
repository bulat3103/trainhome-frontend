import React, {Component} from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./CoachInfoPage.css";
import axios from "axios";
import {Button} from "../../components/Button";

class CoachInfoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coach: {}
        }
        this.sendMessage = this.sendMessage.bind(this);
    }

    sendMessage() {
        axios.get("http://localhost:9090/groupchat/check", {
            params: {
                personId: localStorage.getItem("coachPersonInfoPageId")
            }, headers : {
                Authorization: 'Bearer ' + localStorage.getItem("token")
            }
        }).then(res => {
            if (res.data.check === false) {
                axios.post("http://localhost:9090/groupchat", {}, {
                    headers : {
                        Authorization: 'Bearer ' + localStorage.getItem("token")
                    }
                }).then(res2 => {
                    axios.post(`http://localhost:9090/groupchat/add/${res2.data.chat}`, {}, {
                        params: {
                            peopleToAdd: localStorage.getItem("coachPersonInfoPageId")
                        }, headers : {
                            Authorization: 'Bearer ' + localStorage.getItem("token")
                        }
                    })
                })
            }
        })
        window.location.href = "http://localhost:3000/MessagesPage"
    }

    componentDidMount() {
        axios.get("http://localhost:9090/person/id", {
            params: {
                id: localStorage.getItem("coachInfoPageId")
            }
        })
            .then(res => {
                this.setState({coach: res.data.person})
            })
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className="client-info-row">
                    <h3>Имя</h3>
                    <h3>{this.state.coach.name}</h3>
                </div>
                <div className="client-info-row">
                    <h3>Телефон</h3>
                    <h3>{this.state.coach.phoneNumber}</h3>
                </div>
                <div className="client-info-row">
                    <h3>Почта</h3>
                    <h3>{this.state.coach.email}</h3>
                </div>
                <div className="client-info-row">
                    <h3>День рождения</h3>
                    <h3>{this.state.coach.birthday}</h3>
                </div>
                <Button onClick={this.sendMessage}>Отправить сообщение</Button>
            </div>
        );
    }
}

export default CoachInfoPage;