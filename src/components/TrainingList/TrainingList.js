import React, {Component} from "react";
import "./TrainingList.css";
import axios from "axios";
import {Button} from "../Button";

class TrainingList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    /*componentDidMount() {
        axios.get('http://localhost:8080/calendar/list')
            .then(res => {
                const list = res.data;
                this.setState({list});
            })
    }*/

    render() {
        return (
            <div className="training-list">
                <div>
                    <h3 className="title-list">Ваши тренировки</h3>
                </div>
                <div className="train">
                    <h3 className="train-date">Пт 19.10</h3>
                    <h3 className="train-name">Занятие по йоге</h3>
                    <h3 className="train-coach">Иванов Иван Иванович</h3>
                    <h3 className="train-time">19.00-20.00</h3>
                    <div className="train-zoom">
                        <Button buttonStyle="btn--green">Zoom</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default TrainingList;