import React, {Component} from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./CoachAccountPage.css";
import {Button} from "../../components/Button";
import Calendar from "../../components/Calendar/Calendar";
import logo from "../../img/Icon.png";
import axios from "axios";
import TrainingList from "../../components/TrainingList/TrainingList";

class CoachAccountPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMoney: 0,
            createTrainName: '',
            createTrainCountPeople: 0,
            createTrainCountTrains: 0,
            groups: [],
            transactions: [],
            value: "Йога",
            groupPeople: []
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleClickMoney = this.handleClickMoney.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.submitCreateTrain = this.submitCreateTrain.bind(this);
    }

    componentDidMount() {
        axios.get("http://localhost:9090/groups/list", {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("token")
            }
        })
            .then(res => {
                this.setState({groups: res.data.groups})
            })

        axios.get("http://localhost:9090/transaction/list", {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("token")
            }
        })
            .then(res => {
                this.setState({transactions: res.data.transactions})
            })

        axios.get("http://localhost:9090/transaction", {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("token")
            }
        })
            .then(res => {
                this.setState({currentMoney: res.data.total})
            })
    }

    handleClickMoney() {
        axios.post("http://localhost:9090/transaction/pay", {date: new Date(), coachId: this.props.id, money: -1 * this.state.currentMoney}, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("token")
            }
        })
            .then(() => {
                this.setState({currentMoney: 0})
            })
    }

    handleInput(e) {
        switch (e.target.name) {
            case 'name':
                this.setState({createTrainName: e.target.value});
                break;
            case 'people':
                this.setState({createTrainCountPeople: e.target.value});
                break;
            case 'trains':
                this.setState({createTrainCountTrains: e.target.value});
                break;
        }
    }

    handleSelectChange(event) {
        this.setState({value: event.target.value});
    }

    submitCreateTrain() {
        axios.post("http://localhost:9090/groups", {
            name: this.state.createTrainName,
            sportSphereName: this.state.value,
            maxCount: this.state.createTrainCountPeople,
            trainsLeft: this.state.createTrainCountTrains
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
                <div className="coach-account-content">
                    <div className="left-column">
                        <img src={logo}/>
                    </div>
                    <div className="right-column">
                        <div className="coach-first-row">
                            <Calendar/>
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
                                    {this.state.transactions.map((tran, idx) =>
                                        <tr>
                                            <td>{tran.date}</td>
                                            <td>{tran.personDTO.id}</td>
                                            <td>{tran.money}</td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="coach-money">
                                <h3 className="block-title">Личный счет</h3>
                                <h2 className="coach-money-count">{this.state.currentMoney}</h2>
                                <div className="coach-button">
                                    <Button buttonStyle="btn--green"
                                            buttonSize="btn--wide" onClick={this.handleClickMoney}>Вывести</Button>
                                </div>
                            </div>
                        </div>
                        <div className="coach-third-row">
                            <div className="money-history">
                                <h3 className="block-title">Список ваших групп</h3>
                                <table className="my-groups-table">
                                    <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Название</th>
                                        <th>Остаток занятий</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.groups.map((group) =>
                                        <tr>
                                            <td onClick={() => axios.get(`http://localhost:9090/${group.id}`, {
                                                headers: {
                                                    Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwMWExM2FiNWJAZ21haWwuY29tIiwiZXhwIjoxNjcyNjkzMjAwfQ.mnmCTnvf6h21B-SAAq4e-LWIg_3M58yvDZBOrBjV93IfFqf6czunj9tQJXm2ZQMBXKtDZT3dU5yEHjquAq2f4Q'
                                                }})
                                                .then(res => this.setState({groupPeople: res.data.persons}))}>
                                                {group.id}
                                            </td>
                                            <td>{group.name}</td>
                                            <td>{group.trainsLeft}</td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="person-group-list">
                                <h3 className="block-title">Группа вторники</h3>
                                {this.state.groupPeople.map((people) =>
                                    <p>{people.name}</p>
                                )}
                                <div className="coach-button">
                                    <Button buttonStyle="btn--red"
                                            buttonSize="btn--wide">Удалить группу</Button>
                                </div>
                            </div>
                        </div>
                        <div className="coach-forth-row">
                            <form className="create-train-form" onSubmit={this.submitCreateTrain}>
                                <h3 className="block-title">Создать группу</h3>
                                <h3 className="input-train-title">Введите название</h3>
                                <input value={this.state.createTrainName} onChange={this.handleInput} name="name" className="input-train"
                                       type="text" placeholder="Введите название..."/>
                                <h3 className="input-train-title">Выберите вид спорта</h3>
                                <select value={this.state.value} onChange={this.handleSelectChange}>
                                    <option value="Йога">Йога</option>
                                    <option value="Аэробика">Аэробика</option>
                                    <option value="Пилатес">Пилатес</option>
                                    <option value="Стрип-дэнс">Стрип-дэнс</option>
                                    <option value="Степпинг">Степпинг</option>
                                    <option value="Гимнастика">Гимнастика</option>
                                    <option value="Цигун">Цигун</option>
                                    <option value="Тай-бо">Тай-бо</option>
                                    <option value="Сайклинг">Сайклинг</option>
                                    <option value="Боди-балет">Боди-балет</option>
                                    <option value="Ки-бо">Ки-бо</option>
                                    <option value="Тайчи">Тайчи</option>
                                    <option value="Кунг-фу">Кунг-фу</option>
                                    <option value="Каларипаятту">Каларипаятту</option>
                                </select>
                                <h3 className="input-train-title">Введите кол-во людей</h3>
                                <input value={this.state.createTrainCountPeople} onChange={this.handleInput} name="people" className="input-train"
                                       type="text" placeholder="Введите кол-во людей..."/>
                                <h3 className="input-train-title">Введите кол-во тренировок</h3>
                                <input value={this.state.createTrainCountTrains} onChange={this.handleInput} name="trains" className="input-train"
                                       type="text" placeholder="Введите кол-во тренировок..."/>
                                <input value="Создать" type="submit" className="auth-button"/>
                            </form>
                        </div>
                        <div className="coach-fifth-row">
                            <TrainingList/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CoachAccountPage;