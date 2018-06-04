import React from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import moment from 'moment';
import InputMoment from 'input-moment';
import '../styles/ReadingModal.css';

class ReadingModal extends React.Component {
    constructor(props) {
        super(props);

        //console.log("ReadingModal -> props", props)

        this.state = {
            m                 : moment(),
            modal             : false,
            calendar          : false,
            calendarButtonText: "Edit",
            form              : {
                recordId    : null,
                dateAdded   : moment().format('llll'),
                entryName   : 0,
                readingValue: ""
            }
        };

        if ( this.props.actionState === 'Edit' ) {
            this.state.form.recordId     = (this.props.data.recordId) ? this.props.data.recordId : null;
            this.state.form.dateAdded    = (this.props.data.dateAdded) ? this.props.data.dateAdded : null;
            this.state.form.entryName    = (this.props.data.entryName) ? this.props.data.entryName : null;
            this.state.form.readingValue = (this.props.data.readingValue) ? this.props.data.readingValue : 0;
        }

        this.localSaveHandler     = this.localSaveHandler.bind(this);
        this.toggle               = this.toggle.bind(this);
        this.showCalendar         = this.showCalendar.bind(this);
        this.handleCalendarChange = this.handleCalendarChange.bind(this);
        this.handleUserInput      = this.handleUserInput.bind(this);
    }

    toggle() {

        if ( !this.state.modal ) {
            // this.data.m = moment();
            this.setState({dateAdded: moment()})
        }

        let cfg = {
            modal   : !this.state.modal,
            calendar: false
        };

        if ( this.state.modal ) {
            cfg.calendar           = true;
            cfg.calendarButtonText = "Edit";
        }

        this.setState(cfg);
    }

    componentDidMount() {
        this.toggle();
    }

    localSaveHandler(event) {
        event.preventDefault();
        //console.log("localSaveHandler ->", this.props)
        this.props.saveHandler({...this.state.form});
        this.toggle();
    };

    handleCalendarChange(m) {
        const form        = {...this.state.form};
        form["dateAdded"] = m.format('llll');
        //console.log("handleCalendarChange -> ", form)
        this.setState({form});
    };

    handleUserInput(property, event) {
        const form     = {...this.state.form};
        form[property] = event.target.value;
        //console.log("handleUserInput -> ", form)
        this.setState({form});
    }

    showCalendar(event) {
        event.preventDefault();
        //console.log("showCalendar clicked", this.state.calendar)

        //calendarButtonText

        let cfg = {
            calendar          : !this.state.calendar,
            calendarButtonText: (this.state.calendar ? 'Edit' : 'Cancel')
        };

        this.setState(cfg)
    };

    render() {
        return (
            <div className="ReadingModal">
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <form className="ReadingModal" onSubmit={this.localSaveHandler}>
                        <ModalHeader toggle={this.toggle}>{this.props.actionState} Reading</ModalHeader>
                        <ModalBody>

                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-sm-9">
                                                <input className="form-control"
                                                       type="text"
                                                       name="dateAdded"
                                                       value={this.state.form.dateAdded}
                                                       readOnly
                                                />
                                            </div>
                                            <div className="col text-right">
                                                <button type="button"
                                                        className={['btn', 'btn-secondary'].join(' ')}
                                                        onClick={this.showCalendar}>{this.state.calendarButtonText}</button>
                                            </div>
                                        </div>

                                        <div className={this.state.calendar ? 'showCalendar' : 'hideCalendar'}>
                                            <InputMoment
                                                moment={this.state.m}
                                                onChange={this.handleCalendarChange}
                                                minStep={1}
                                            />
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <select className="form-control"
                                                name="entryName"
                                                value={this.state.form.entryName}
                                                onChange={this.handleUserInput.bind(this, 'entryName')}>
                                            <option value="0">Before Breakfast</option>
                                            <option value="1">After Breakfast</option>
                                            <option value="2">Before Lunch</option>
                                            <option value="3">After Lunch</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <input type="number"
                                               min="0"
                                               max="800"
                                               name="readingValue"
                                               className="form-control"
                                               value={this.state.form.readingValue}
                                               onChange={this.handleUserInput.bind(this, 'readingValue')}
                                               required
                                               placeholder="##"/>
                                    </div>
                                </div>
                            </div>


                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" color="primary">Add Reading</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </form>
                </Modal>
            </div>
        );
    }
}

export default ReadingModal;