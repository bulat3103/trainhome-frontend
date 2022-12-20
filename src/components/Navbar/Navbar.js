import React, {Component} from "react";
import logo from "../../img/Icon.png";
import './Navbar.css';
import {Button} from "../Button";
import {Link} from "react-router-dom";

class Navbar extends Component {
    state = {clicked: false}
    handleClick = () => {
        this.setState({clicked: !this.state.clicked})
    }

    render() {
        return (
            <nav className="NavbarItems">
                <div className="navbar-logo">
                    <Link to={"/"}>
                      <img src={logo} width={70} height={70} alt={"Logo"}/>
                    </Link>
                </div>
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}/>
                </div>
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    <li><Link className="nav-links" to="/MessagesPage" >Сообщения</Link></li>
                    <li><Link className="nav-links" to="/SearchPage" >Поиск</Link></li>
                    <li><Link className="nav-links-mobile" to="/AuthPage" >Войти</Link></li>
                </ul>
                <div className="navbar-button">
                    <Link to="/AuthPage" >
                        <Button>Кабинет</Button>
                    </Link>
                </div>
            </nav>
        )
    }
}
//TODO посмотреть почему не работает линк в списке
export default Navbar