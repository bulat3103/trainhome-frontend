import React, {Component} from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./RegisterPage.css";
import {Button} from "../../components/Button";
import Multiselect from 'multiselect-react-dropdown';
import axios from "axios";
import {Link} from "react-router-dom";

class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            client: false,
            coach: true,
            name: '',
            birthday: '',
            sex: true,
            phone: '',
            email: '',
            password: '',
            sports: [],
            achieve: '',
            info: '',
            options: [{name: 'Йога', id: 0}, {name: 'Аэробика', id: 1}, {name: 'Пилатес', id: 2}, {name: 'Стрип-дэнс', id: 3}, {name: 'Степпинг', id: 4}, {name: 'Гимнастика', id: 5},
                {name: 'Цигун', id: 6}, {name: 'Тай-бо', id: 7}, {name: 'Сайклинг', id: 8}, {name: 'Боди-балет', id: 9}, {name: 'Ки-бо', id: 10}, {name: 'Тайчи', id: 11}, {name: 'Кунг-фу', id: 12}, {name: 'Каларипаятту', id: 13}],
            selectedListItem: []
        }
        this.handleChooseCoach = this.handleChooseCoach.bind(this);
        this.handleChooseClient = this.handleChooseClient.bind(this);
        this.handleChooseMan = this.handleChooseMan.bind(this);
        this.handleChooseWoman = this.handleChooseWoman.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.handleInputSport = this.handleInputSport.bind(this);
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

    handleChooseCoach() {
        this.setState({coach: true, client: false});
    }

    handleChooseClient() {
        this.setState({client: true, coach: false});
    }

    handleChooseMan() {
        this.setState({sex: true});
    }

    handleChooseWoman() {
        this.setState({sex: false});
    }

    handleInputSport(e) {
        let prices = []
        switch (e.target.name) {
            case '0':
                prices.push({name: e.target.name, price: e.target.value})
        }
    }

    handleInput(e) {
        switch (e.target.name) {
            case 'name':
                this.setState({name: e.target.value});
                break;
            case 'birthday':
                this.setState({birthday: e.target.value});
                break;
            case 'phone':
                this.setState({phone: e.target.value});
                break;
            case 'email':
                this.setState({email: e.target.value});
                break;
            case 'password':
                this.setState({password: e.target.value});
                break;
            case 'achieve':
                this.setState({achieve: e.target.value});
                break;
            case 'info':
                this.setState({info: e.target.value});
                break;
        }
    }

    /*sendData() {
        const data = {
            password: this.state.password,
            name: this.state.name,
            image: {hex: "no photo"},
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            birthday: this.state.birthday,
            sex: this.state.sex,
            achievements: this.state.achieve,
            info: this.state.info,

        }
        axios.post("http://localhost:8000/")
    }*/

    render() {
        return (
            <div>
                <Link to={"/"}><Button>На главную</Button></Link>
                <div className="register-block">
                    <div className="choose">
                        <div className={this.state.coach ? "choose__coach active" : "choose__coach"}
                             onClick={this.handleChooseCoach}>
                            <h4>Стать тренером</h4>
                        </div>
                        <div className={this.state.client ? "choose__client active" : "choose__client"}
                             onClick={this.handleChooseClient}>
                            <h4>Стать клиентом</h4>
                        </div>
                    </div>
                    <div className="register-form">
                        <div className="form-row">
                            <h4>Как вас зовут?</h4>
                            <input value={this.state.name} name="name" className="input-field"
                                   onChange={this.handleInput}
                                   type="text" placeholder="Введите ФИО..."/>
                        </div>
                        <div className="form-row">
                            <h4>Дата рождения</h4>
                            <input value={this.state.birthday} name="birthday" className="input-field"
                                   onChange={this.handleInput}
                                   type="text" placeholder="Введите дату рождения..."/>
                        </div>
                        <div className="form-row">
                            <h4>Пол</h4>
                            <div className="choose-sex">
                                <div className={this.state.sex ? "choose__man active" : "choose__man"}
                                     onClick={this.handleChooseMan}>
                                    <h4>М</h4>
                                </div>
                                <div className={this.state.sex ? "choose__woman" : "choose__woman active"}
                                     onClick={this.handleChooseWoman}>
                                    <h4>Ж</h4>
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <h4>Номер телефона</h4>
                            <input value={this.state.phone} name="phone" className="input-field"
                                   onChange={this.handleInput}
                                   type="text" placeholder="Введите телефон..."/>
                        </div>
                        <div className="form-row">
                            <h4>Email</h4>
                            <input value={this.state.email} name="email" className="input-field"
                                   onChange={this.handleInput}
                                   type="text" placeholder="Введите email..."/>
                        </div>
                        <div className="form-row">
                            <h4>Придумайте пароль</h4>
                            <input value={this.state.email} name="password" className="input-field"
                                   onChange={this.handleInput}
                                   type="password" placeholder="Введите пароль..."/>
                        </div>
                        <div className={this.state.coach ? "form-row" : "form-row nonactive"}>
                            <h4>Виды спорта</h4>
                           <Multiselect className="input-field-select" options={this.state.options}
                                        selectedValues={this.state.selectedValue}
                                        onSelect={this.onSelect}
                                        onRemove={this.onRemove}
                                        displayValue="name"/>
                        </div>
                        {this.state.selectedListItem.map((item, idx) =>
                            <div className="form-row">
                                <h4>{item.name}</h4>
                                <input value={this.state.email} name={item.name} className="input-field"
                                       onChange={this.handleInputSport}
                                       type="text" placeholder="Введите цену..."/>
                            </div>
                        )}
                        <div className={this.state.coach ? "form-row" : "form-row nonactive"}>
                            <h4>Укажите достижения</h4>
                            <input value={this.state.email} name="achieve" className="input-field big"
                                   onChange={this.handleInput}
                                   type="text" placeholder="Укажите достижения..."/>
                        </div>
                        <div className={this.state.coach ? "form-row" : "form-row nonactive"}>
                            <h4>Укажите дополнительную информацию о себе</h4>
                            <input value={this.state.email} name="info" className="input-field big"
                                   onChange={this.handleInput}
                                   type="text" placeholder="Укажите информацию..."/>
                        </div>
                        <div className="submit">
                            <Button>Создать</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
//TODO не понял как понять что регистрация прошла успешно, когда ввожу в поле email авто заполняются другие поля
export default RegisterPage

