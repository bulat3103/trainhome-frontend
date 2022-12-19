import React, {Component} from "react";
import "./TrainingList.css";
import axios from "axios";

class TrainingList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trains: []
        };
    }

    componentDidMount() {
        axios.get("http://localhost:9090/trains/list", {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1ZTRjMjM3ZjRAZ21haWwuY29tIiwiZXhwIjoxNjcyNjA2ODAwfQ.hEqOxiwFHQWSiLgGSH6kRS475YakdO7tpoLRpAjhTIN5KJN5rVByXSi5_Wq9_M0rOOVoLZ0Wqnp-cywftImMMA'
            }
        })
            .then(res => {
                this.setState({trains: res.data.trainings})
            })
    }

    render() {
        return (
            <div className="training-list">
                <div>
                    <h3 className="title-list">Ваши тренировки</h3>
                </div>
                {this.state.trains.map((train, idx) =>
                    <div className="train">
                        <h3 className="train-date">{train.trainingDate}</h3>
                        <h3 className="train-name">{train.groupsDTO.name}</h3>
                        <h3 className="train-coach">{train.personDTO.name}</h3>
                        <div className="train-zoom">
                            <a href={"#"}>Zoom</a>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default TrainingList;