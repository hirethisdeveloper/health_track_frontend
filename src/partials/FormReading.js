import React, {Component} from 'react';
import AddReadingButton from './AddReadingButton';
import moment from 'moment';
import InputMoment from 'input-moment';

import '../styles/FormReading.css';

class FormReading extends Component {

    constructor() {
        super();

        this.state = {
            m: moment()
        }

        this.dateAdded = "";
    }

    localHandlerAddReading = (event) => {
        event.preventDefault();
        //console.log(this.props.readings, this.dateAddedInput.value, this.entryName.value, this.readingValue.value);

        this.dateAdded = new Date(this.dateAddedDateInput.value + " " + this.dateAddedTimeInput.value + ":00").toISOString();

        console.log(this.dateAddedDateInput.value, this.dateAddedTimeInput.value, this.dateAdded);

        this.props.addReading({
            dateAdded   : this.dateAdded,
            entryName   : this.entryName.value,
            readingValue: this.readingValue.value
        })
    };

    handleChange = m => {
        this.setState({ m });
    };

    handleSave = () => {
        console.log('saved', this.state.m.format('llll'));
    };

    render() {
        return (
            <form className="FormReading" onSubmit={this.localHandlerAddReading}>
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <input className="form-control" type="text" value={this.state.m.format('llll')} readOnly />
                                    <InputMoment
                                        moment={this.state.m}
                                        onChange={this.handleChange}
                                        minStep={1}
                                    />
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <select className="form-control"
                                            ref={(input) => this.entryName = input}>
                                        <option value="0">Before Breakfast</option>
                                        <option value="1">After Breakfast</option>
                                        <option value="2">Before Lunch</option>
                                        <option value="3">After Lunch</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <input type="number"
                                           min="0"
                                           max="800"
                                           className="form-control"
                                           ref={(input) => this.readingValue = input}
                                           placeholder="##"/>
                                </div>
                            </div>
                            <div className="col text-right">
                                <AddReadingButton></AddReadingButton>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default FormReading;