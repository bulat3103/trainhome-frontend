import React, {Component} from "react";
import "./PersonRecommendations.css";
import axios from 'axios';
import classnames from 'classnames';
import * as metaCalendar from '../Calendar/MetaCalendar';

class PersonRecommendations extends Component {
    static defaultProps = {
        date: new Date(),
        years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
        monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        weekDayNames: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        onChange: Function.prototype
    };

    state = {
        date: this.props.date,
        currentDate: new Date(),
        selectedDate: null,
        recom: []
    };

    get year() {
        return this.state.date.getFullYear();
    }

    get month() {
        return this.state.date.getMonth();
    }

    get day() {
        return this.state.date.getDate();
    }

    handlePrevMonthButtonClick = () => {
        const date = new Date(this.year, this.month - 1);

        this.setState({date});
    };

    handleNextMonthButtonClick = () => {
        const date = new Date(this.year, this.month + 1);

        this.setState({date});
    };

    handleSelectChange = () => {
        const year = this.yearSelect.value;
        const month = this.monthSelect.value;

        const date = new Date(year, month);

        this.setState({date});
    };

    handleDayClick = date => {
        this.setState({selectedDate: date});
        this.props.onChange(date);
        axios.get('http://localhost:9090/calendar/list', {
            params: {
                date: this.state.selectedDate
            },
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("token")
            }
        })
            .then(res => {
                this.setState({recom: res.data.recommendations});
            })
    };

    render() {
        const {years, monthNames, weekDayNames} = this.props;
        const {currentDate, selectedDate} = this.state;
        const monthData = metaCalendar.getMonthData(this.year, this.month);
        return (
            <div className="recom-main">
                <div className="calendar">
                    <header>
                        <button onClick={this.handlePrevMonthButtonClick}>{'<'}</button>
                        <select ref={element => this.monthSelect = element}
                                value={this.month}
                                onChange={this.handleSelectChange}>
                            {monthNames.map((name, index) =>
                                <option key={name} value={index}>{name}</option>
                            )}
                        </select>
                        <select  ref={element => this.yearSelect = element}
                                 value={this.year}
                                 onChange={this.handleSelectChange}>
                            {years.map(year =>
                                <option key={year} value={year}>{year}</option>
                            )}
                        </select>
                        <button onClick={this.handleNextMonthButtonClick}>{'>'}</button>
                    </header>
                    <table>
                        <thead>
                        <tr>
                            {weekDayNames.map(name =>
                                <th key={name}>{name}</th>
                            )}
                        </tr>
                        </thead>
                        <tbody>
                        {monthData.map((week, index) =>
                            <tr key={index} className="week">
                                {week.map((date, index) => date ?
                                    <td
                                        key={index}
                                        className={classnames('day', {
                                            'today': metaCalendar.areEqual(date, currentDate),
                                            'selected': metaCalendar.areEqual(date, selectedDate)
                                        })}
                                        onClick={() => this.handleDayClick(date)}
                                    >{date.getDate()}</td>
                                    :
                                    <td key={index} />
                                )}
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                <div className="recommendations">
                    <h3 className="title">Ваши рекомендации</h3>
                    {this.state.recom.map(recom =>
                        <div>
                            <h3 className="rec-name">{recom.coachDTO.name}</h3>
                            <h3 className="rec-text">{recom.info}</h3>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default PersonRecommendations