import React, {Component} from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./AuthPage.css";
import axios from "axios";

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

    async handleSubmit() {
        const data = {
            email: this.state.login,
            password: this.state.password
        }
        axios.post("http://localhost:9090/auth/login", data)
            .then(res => {
                localStorage.setItem("token", res.data)
                console.log(res.data);
            })
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className="auth-block">
                    <form className="auth-form" onSubmit={this.handleSubmit}>
                        <input value={this.state.login} onChange={this.handleInput} name="login" className="login"
                               type="text" placeholder="Введите email..."/>
                        <input value={this.state.password} onChange={this.handleInput} name="password"
                               className="password" type="password" placeholder="Введите пароль..."/>
                        <input value="Войти" type="submit" className="auth-button"/>
                    </form>
                    <div className="create">
                        <h3 className="create__text">Нет аккаунта?</h3>
                        <a className="create__link" href="/#">Создать аккаунт</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default AuthPage