import React, {Component} from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./SearchPage.css";
import Multiselect from "multiselect-react-dropdown";
import {Button} from "../../components/Button";
import axios from "axios";
import logo from "../../img/Icon.png";

class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            minPrice: 0,
            maxPrice: 100000000,
            minRate: 0,
            maxRate: 5,
            options: [{name: 'Йога', id: 1}, {name: 'Стрип-дэнс', id: 2}, {name: 'Пластика', id: 3}],
            selectedListItem: [],
            coaches: []
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }

    onSelect(selectedList, selectedItem) {
        let newSelectList = this.state.selectedListItem;
        newSelectList.push(selectedItem);
        this.setState({selectedListItem: newSelectList});
    }

    onRemove(selectedList, removedItem) {
        let newSelectList = [];
        this.state.selectedListItem.forEach(function (item) {
            if (item.id !== removedItem.id) {
                newSelectList.push(item);
            }
        })
        this.setState({selectedListItem: newSelectList});
    }

    handleInput(e) {
        switch (e.target.name) {
            case 'minPrice':
                this.setState({minPrice: e.target.value})
                break;
            case 'maxPrice':
                this.setState({maxPrice: e.target.value})
                break;
            case 'minRate':
                this.setState({minRate: e.target.value})
                break;
            case 'maxRate':
                this.setState({maxRate: e.target.value})
                break;
        }
    }

    onSubmit() {
        axios.post("http://localhost:9090/coach/list", {
            sports: this.state.selectedListItem,
            minPrice: this.state.minPrice,
            maxPrice: this.state.maxPrice,
            minRating: this.state.minRate,
            maxRating: this.state.maxRate
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("token")
            }
        })
            .then(res => {
                this.setState({coaches: res.data.coaches});
            })
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className="search-block">
                    <div className="search-form-row">
                        <div className="filter">
                            <h3>Вид спорта</h3>
                            <Multiselect className="input-field-select" options={this.state.options}
                                         selectedValues={this.state.selectedValue}
                                         onSelect={this.onSelect}
                                         onRemove={this.onRemove}
                                         displayValue="name"/>
                        </div>
                        <div className="filter">
                            <h3>Цена</h3>
                            <div className="filter-interval">
                                <input value={this.state.minPrice} name="minPrice" className="search-input-field"
                                       onChange={this.handleInput}
                                       type="text"/>
                                <input value={this.state.maxPrice} name="maxPrice" className="search-input-field"
                                       onChange={this.handleInput}
                                       type="text"/>
                            </div>
                        </div>
                        <div className="filter">
                            <h3>Рейтинг</h3>
                            <div className="filter-interval">
                                <input value={this.state.minRate} name="minRate" className="search-input-field"
                                       onChange={this.handleInput}
                                       type="text"/>
                                <input value={this.state.maxRate} name="maxRate" className="search-input-field"
                                       onChange={this.handleInput}
                                       type="text"/>
                            </div>
                        </div>
                        <div className="search-submit">
                            <Button buttonStyle="btn--green" buttonSize="btn--wide" onClick={this.onSubmit}>Применить</Button>
                        </div>
                    </div>
                    {this.state.coaches.map((coach) =>
                        <div className="search-person">
                            <div className="search-person-image">
                                <img src={logo}/>
                            </div>
                            <div className="search-person-info">
                                <h3 onClick={() => {
                                    localStorage.setItem("coachInfoPageId", coach.id);
                                    window.location.href = "http://localhost:3000/CoachInfo"
                                }}>{coach.personDTO.name}</h3>
                                <div className="search-person-info-field">
                                    <h3 className="search-person-info-field-name">Сфера спорта</h3>
                                    <h3 className="search-person-info-field-value">{coach.sportSphereName}</h3>
                                </div>
                                <div className="search-person-info-field">
                                    <h3 className="search-person-info-field-name">Рейтинг</h3>
                                    <h3 className="search-person-info-field-value">{coach.rating}</h3>
                                </div>
                                <div className="search-person-info-field">
                                    <h3 className="search-person-info-field-name">Заниматься индивидуально</h3>
                                    <input type="checkbox"/>
                                </div>
                            </div>
                            <div className="search-person-pay">
                                <div className="search-person-pay-price">
                                    <h3>{coach.sportSpherePrice}</h3>
                                </div>
                                <div className="search-person-submit">
                                    <Button buttonStyle="btn--green" buttonSize="btn--large" onClick={() =>
                                        axios.post("http://localhost:9090/transaction/pay", {
                                            date: new Date(),
                                            coachId: coach.personDTO.id,
                                            money: coach.sportSpherePrice
                                        },{
                                            headers: {
                                                Authorization: 'Bearer ' + localStorage.getItem("token")
                                            }
                                        })
                                    }>Оплатить</Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default SearchPage;