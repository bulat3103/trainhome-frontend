import React, {Component} from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./SearchPage.css";
import Multiselect from "multiselect-react-dropdown";
import {Button} from "../../components/Button";

class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            minPrice: 0,
            maxPrice: 100000000,
            minRate: 0,
            maxRate: 5,
            options: [{name: 'Йога', id: 1}, {name: 'Стрип-дэнс', id: 2}, {name: 'Пластика', id: 3}]
        }
    }

    onSelect(selectedList, selectedItem) {
    }

    onRemove(selectedList, removedItem) {
    }

    handleInput(e) {
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className="search-block">
                    <form className="search-form-row">
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
                            <Button buttonStyle="btn--green" buttonSize="btn--wide">Применить</Button>
                        </div>
                    </form>

                </div>
            </div>
        )
    }
}

export default SearchPage;