import React, {Component} from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./PersonAccountPage.css";
import {Button} from "../../components/Button";
import Calendar from "../../components/Calendar/Calendar";
import PersonRecommendations from "../../components/PersonRecommendations/PersonRecommendations";
import TrainingList from "../../components/TrainingList/TrainingList";
import logo from "../../img/Icon.png";
import axios from "axios";

class PersonAccountPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nextTrainName: "Занятие по йоге",
            nextTrainDate: "15.10.2022 19.00",
            nextTrainCoach: "Иванов Иван Иванович",
            groups: []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:9090/groups/list", {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwNDBkMGEwNmVAZ21haWwuY29tIiwiZXhwIjoxNjcyNjA2ODAwfQ.z2lDlJmDLKJ-xzkTXB2ruPUYJlCpAi7voNLBvwDnuUAuICH7Q_2qKkJ54m4N5LekgN19IDOAIfQ3vn-E3fdOBw'
            }
        })
            .then(res => {
                this.setState({groups: res.data.groups});
                console.log(res.data.groups);
            })

        axios.get()
    }

    /*
    {this.state.group_list.map((group, idx) =>
                                            <tr>
                                                <td>{group.name}</td>
                                                <td>{group.coach.name}</td>
                                                <td>{group.trainsLeft}</td>
                                            </tr>
                                        )}
     */

    render() {
        return (
            <div>
                <Navbar/>
                <div className="content">
                    <div className="left-column">
                        <img src={logo}/>
                    </div>
                    <div className="right-column">
                        <div className="first-row">
                            <div className="my-groups">
                                <h3 className="my-groups-header">Список ваших групп</h3>
                                <table className="my-groups-table">
                                    <thead>
                                    <tr>
                                        <th>Название</th>
                                        <th>Тренер</th>
                                        <th>Остаток занятий</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.groups.map((group, idx) =>
                                            <tr className="my-groups-row">
                                                <td key={"name_" + idx}>{group.name}</td>
                                                <td key={"coach_name_" + idx}>{group.coach.name}</td>
                                                <td key={"trains_left_" + idx}>{group.trainsLeft}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="next-train">
                                <h3 className="next-train-name">{this.state.nextTrainName}</h3>
                                <div className="next-train-row">
                                    <h4 className="next-train-title">Дата</h4>
                                    <h4 className="next-train-value">{this.state.nextTrainDate}</h4>
                                </div>
                                <div className="next-train-row">
                                    <h4 className="next-train-title">Тренер</h4>
                                    <h4 className="next-train-value">{this.state.nextTrainCoach}</h4>
                                </div>
                                <div className="next-train-button">
                                    <Button className="next-train-button" buttonStyle="btn--green"
                                            buttonSize="btn--wide">Подключиться</Button>
                                </div>
                            </div>
                        </div>
                        <div className="second-row">
                            <Calendar/>
                            <PersonRecommendations/>
                        </div>
                        <div className="third-row">
                            <TrainingList/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PersonAccountPage