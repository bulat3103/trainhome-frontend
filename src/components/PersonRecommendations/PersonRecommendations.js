import React, {Component} from "react";
import "./PersonRecommendations.css";
import axios from 'axios';

class PersonRecommendations extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    /*componentDidMount() {
        axios.get('http://localhost:8080/calendar/list')
            .then(res => {
                const recom = res.data;
                this.setState({recom});
            })

            {this.state.recom.map(recom =>
                    <div>
                        <h3 className="rec-name">recom.coachDTO.name</h3>
                        <p className="rec-text">recom.info</textarea>
                    </div>
                )}
    }*/

    render() {
        return (
            <div className="recommendations">
                <h3 className="title">Ваши рекомендации</h3>
            </div>
        )
    }
}

export default PersonRecommendations