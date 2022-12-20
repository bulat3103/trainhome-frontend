import React, {Component} from "react";
import "./AuthPage.css";
import axios from "axios";
import {Link} from "react-router-dom";
import {Button} from "../../components/Button";

class AuthPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: ''
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(e) {
        switch (e.target.name) {
            case 'login':
                this.setState({login: e.target.value})
                break
            case 'password':
                this.setState({password: e.target.value})
                break
        }
    }

    handleSubmit() {
        axios.post("http://localhost:9090/auth/login", {email: this.state.login, password: this.state.password})
            .then(res => {
                localStorage.removeItem('token')
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('role', res.data.role)
                if (res.data.role === "COACH") {
                    window.location.href = "http://localhost:3000/CoachAccountPage"
                } else {
                    window.location.href = "http://localhost:3000/PersonAccountPage"
                }
            })
    }

    render() {
        return (
            <div>
                <div>
                    <Link to={"/"}><Button>На главную</Button></Link>
                </div>
                <div className="auth-block">
                    <div className="auth-form">
                        <input value={this.state.login} onChange={this.handleInput} name="login" className="login"
                               type="text" placeholder="Введите email..."/>
                        <input value={this.state.password} onChange={this.handleInput} name="password"
                               className="password" type="password" placeholder="Введите пароль..."/>
                        <Button onClick={this.handleSubmit}>Войти</Button>
                    </div>
                    <div className="create">
                        <h3 className="create__text">Нет аккаунта?</h3>
                        <Link className="create__link" to="/RegisterPage">Создать аккаунт</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default AuthPage