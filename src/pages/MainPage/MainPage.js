import React, {Component} from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./MainPage.css";

class MainPage extends Component {
    render() {
        return (
            <div className="main-page">
                <Navbar/>
                <div className="hero">
                    <div className="hero__content">
                        <h1>Тренировки с мастерами своего дела из любой точки мира, где бы вы ни находились</h1>
                    </div>
                </div>
                <div className="opportunities">
                    <div className="coach__opp">
                        <h2>Ключевые возможности для тренеров</h2>
                        <ul>
                            <li>Создание персональных тренировок и календарей питания</li>
                            <li>Единый мессенджер на нашей площадке для общения со всеми клиентами</li>
                            <li>Прием платежей</li>
                            <li>Email-рассылки</li>
                        </ul>
                    </div>
                    <div className="client__opp">
                        <h2>Ключевые возможности для клиентов</h2>
                        <ul>
                            <li>Личный календарь тренировок и питания, составленный вашим тренером</li>
                            <li>Единый мессенджер на нашей площадке для общения с тренерами и партнерами по группе</li>
                            <li>Легальная оплата всех ваших занятий без мошеничества</li>
                            <li>Напоминание о тренировках, питании на вашу электронную почту</li>
                            <li>Только проверенные и профессиональные тренеры</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default MainPage