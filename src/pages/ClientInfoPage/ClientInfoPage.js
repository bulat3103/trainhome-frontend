import React, {Component} from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./ClientInfoPage.css";
import axios from "axios";
import {Button} from "../../components/Button";

class ClientInfoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            person: {},
            date: new Date(),
            recomText: ''
        }
        this.handleInput = this.handleInput.bind(this);
        this.writeSubmit = this.writeSubmit.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    componentDidMount() {
        axios.get("http://localhost:9090/person/id", {
            params: {
                id: localStorage.getItem("coachPersonInfoPageId")
            }
        })
            .then(res => {
                this.setState({person: res.data.person})
            })
    }

    handleInput(e) {
        switch (e.target.name) {
            case 'date':
                this.setState({date: e.target.value})
                break
            case 'recom':
                this.setState({recom: e.target.value})
                break
        }
    }

    writeSubmit() {
        axios.post("http://localhost:9090/calendar", {
            info: this.state.recom,
            date: this.state.date,
            personId: localStorage.getItem("coachPersonInfoPageId")
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("token")
            }
        })
    }

    sendMessage() {

    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className="client-info-row">
                    <h3>Имя</h3>
                    <h3>{this.state.person.name}</h3>
                </div>
                <div className="client-info-row">
                    <h3>Телефон</h3>
                    <h3>{this.state.person.phoneNumber}</h3>
                </div>
                <div className="client-info-row">
                    <h3>Почта</h3>
                    <h3>{this.state.person.email}</h3>
                </div>
                <div className="client-info-row">
                    <h3>День рождения</h3>
                    <h3>{this.state.person.birthday}</h3>
                </div>
                <Button onClick={this.sendMessage}>Отправить сообщение</Button>
                <div className="write-recom">
                    <input value={this.state.date} onChange={this.handleInput} name="date" className="info-page-input"
                           type="date" placeholder="Введите дату..."/>
                    <input value={this.state.recom} onChange={this.handleInput} name="recom" className="info-page-input"
                           type="text" placeholder="Введите рекомендацию..."/>
                    <Button onClick={this.writeSubmit}>Отправить</Button>
                </div>
                <div className="add-to-group">
                    <input value={this.state.recom} onChange={this.handleInput} name="recom" className="info-page-input"
                           type="text" placeholder="Введите id группы..."/>
                    <Button onClick={this.writeSubmit}>Добавить</Button>
                </div>
            </div>
        );
    }
}

export default ClientInfoPage;