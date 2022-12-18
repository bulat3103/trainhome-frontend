import React, {Component} from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./CoachAccountPage.css";
import {Button} from "../../components/Button";
import Calendar from "../../components/Calendar/Calendar";
import logo from "../../img/Icon.png";

class CoachAccountPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nextTrainName: "Занятие по йоге",
            nextTrainDate: "15.10.2022 19.00",
            nextTrainCoach: "Иванов Иван Иванович",
            currentMoney: 0,
            createTrainName: '',
            createTrainSport: '',
            createTrainCountPeople: 0,
            createTrainCountTrains: 0
        }
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(e) {

    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className="coach-account-content">
                    <div className="left-column">
                        <img src={logo}/>
                    </div>
                    <div className="right-column">
                        <div className="coach-first-row">
                            <Calendar/>
                            <div className="next-train">
                                <h3 className="block-title">{this.state.nextTrainName}</h3>
                                <div className="next-train-row">
                                    <h4 className="next-train-title">Дата</h4>
                                    <h4 className="next-train-value">{this.state.nextTrainDate}</h4>
                                </div>
                                <div className="next-train-row">
                                    <h4 className="next-train-title">Тренер</h4>
                                    <h4 className="next-train-value">{this.state.nextTrainCoach}</h4>
                                </div>
                                <div className="next-train-button">
                                    <Button className="coach-button" buttonStyle="btn--green"
                                            buttonSize="btn--wide">Подключиться</Button>
                                </div>
                            </div>
                        </div>
                        <div className="coach-second-row">
                            <div className="money-history">
                                <h3 className="block-title">Операции</h3>
                                <table className="money-history-table">
                                    <thead>
                                    <tr>
                                        <th>Дата</th>
                                        <th>Клиент</th>
                                        <th>Изменение</th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>
                            </div>
                            <div className="coach-money">
                                <h3 className="block-title">Личный счет</h3>
                                <h2 className="coach-money-count">500</h2>
                                <div className="coach-button">
                                    <Button buttonStyle="btn--green"
                                            buttonSize="btn--wide">Вывести</Button>
                                </div>
                            </div>
                        </div>
                        <div className="coach-third-row">
                            <div className="money-history">
                                <h3 className="block-title">Список ваших групп</h3>
                                <table className="my-groups-table">
                                    <thead>
                                    <tr>
                                        <th>Название</th>
                                        <th>Остаток занятий</th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>
                            </div>
                            <div className="person-group-list">
                                <h3 className="block-title">Группа вторники</h3>
                                <div className="coach-button">
                                    <Button buttonStyle="btn--red"
                                            buttonSize="btn--wide">Удалить группу</Button>
                                </div>
                            </div>
                        </div>
                        <div className="coach-forth-row">
                            <form className="create-train-form">
                                <h3 className="block-title">Создать группу</h3>
                                <h3 className="input-train-title">Введите название</h3>
                                <input value={this.state.createTrainName} onChange={this.handleInput} name="name" className="input-train"
                                       type="text" placeholder="Введите название..."/>
                                <h3 className="input-train-title">Введите кол-во людей</h3>
                                <input value={this.state.createTrainCountPeople} onChange={this.handleInput} name="people" className="input-train"
                                       type="text" placeholder="Введите кол-во людей..."/>
                                <h3 className="input-train-title">Введите кол-во тренировок</h3>
                                <input value={this.state.createTrainCountTrains} onChange={this.handleInput} name="trains" className="input-train"
                                       type="text" placeholder="Введите кол-во тренировок..."/>
                                <div className="create-group">
                                    <Button buttonStyle="btn--green"
                                            buttonSize="btn--wide">Создать группу</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CoachAccountPage;