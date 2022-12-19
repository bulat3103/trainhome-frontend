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
                Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwMWExM2FiNWJAZ21haWwuY29tIiwiZXhwIjoxNjcyNjkzMjAwfQ.mnmCTnvf6h21B-SAAq4e-LWIg_3M58yvDZBOrBjV93IfFqf6czunj9tQJXm2ZQMBXKtDZT3dU5yEHjquAq2f4Q'
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