import React, {Component} from "react";
import logo from "../../img/Icon.png";
import './Navbar.css';
import {Button} from "../Button";

class Navbar extends Component {
    state = {clicked: false}

    handleClick = () => {
        this.setState({clicked: !this.state.clicked})
    }

    render() {
        return (
            <nav className="NavbarItems">
                <div className="navbar-logo">
                    <img src={logo} width={70} height={70} alt={"Logo"}/>
                </div>
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}/>
                </div>
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    <li><a className="nav-links" href="/#" >Сообщения</a></li>
                    <li><a className="nav-links" href="/#" >Поиск</a></li>
                    <li><a className="nav-links-mobile" href="/#" >Войти</a></li>
                </ul>
                <div className="navbar-button">
                    <Button>Войти</Button>
                </div>
            </nav>
        )
    }
}

export default Navbar