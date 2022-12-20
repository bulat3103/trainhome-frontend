import React, {Component} from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./PersonAccountPage.css";
import TrainingList from "../../components/TrainingList/TrainingList";
import logo from "../../img/Icon.png";
import axios from "axios";
import PersonRecommendations from "../../components/PersonRecommendations/PersonRecommendations";

class PersonAccountPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            trains: [],
            recom: []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:9090/groups/list", {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("token")
            }
        })
            .then(res => {
                this.setState({groups: res.data.groups});
            })

        axios.get('http://localhost:9090/calendar/list', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("token")
            }
        })
            .then(res => {
                this.setState({recom: res.data.recommendations});
            })
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className="content">
                    <div className="left-column">
                        <img src={logo}/>
                    </div>
                    <div className="right-column">
                        <div className="second-row">
                            <PersonRecommendations/>
                        </div>
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