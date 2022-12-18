import React, {Component} from "react";
import logo from "../../img/Icon.png";
import "./SearchPerson.css";
import {Button} from "../Button";

class SearchPerson extends Component {
    render() {
        return (
            <div className="search-person">
                <div className="search-person-image">
                    <img src={logo}/>
                </div>
                <div className="search-person-info">
                    <h3>Аннова Вера Сергеевна</h3>
                    <div className="search-person-info-field">
                        <h3 className="search-person-info-field-name">Возраст</h3>
                        <h3 className="search-person-info-field-value">30</h3>
                    </div>
                    <div className="search-person-info-field">
                        <h3 className="search-person-info-field-name">Сфера спорта</h3>
                        <h3 className="search-person-info-field-value">Стрип-дэнс</h3>
                    </div>
                    <div className="search-person-info-field">
                        <h3 className="search-person-info-field-name">Рейтинг</h3>
                        <h3 className="search-person-info-field-value">5</h3>
                    </div>
                    <div className="search-person-info-field">
                        <h3 className="search-person-info-field-name">Заниматься индивидуально</h3>
                        <input type="checkbox"/>
                    </div>
                </div>
                <div className="search-person-pay">
                    <div className="search-person-pay-price">
                        <h3>5000Р</h3>
                    </div>
                    <div className="search-person-submit">
                        <Button buttonStyle="btn--green" buttonSize="btn--large">Оплатить</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchPerson;