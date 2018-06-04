import React, {Component} from 'react';
import {Button} from 'reactstrap';
import ReadingModal from './ReadingModal';
import ViewReadingEntries from './ViewReadingEntries';

class MainBody extends Component {

    constructor() {
        super();

        this.state = {
            showReadingModal: false,
            readings        : [
                {
                    recordId    : 2,
                    dateAdded   : "2018-04-14T12:45:12.636Z",
                    entryName   : 1,
                    readingValue: 110
                },
                {
                    recordId    : 1,
                    dateAdded   : "2018-04-13T19:22:12.636Z",
                    entryName   : 3,
                    readingValue: 85
                }
            ]
        };

        this.handleChangeReadingModal = this.handleChangeReadingModal.bind(this);
    }

    HandlerAddReading = (reading) => {
        this.setState({readings: [...this.state.readings, reading]})
    };

    HandlerEditReading = (reading) => {
        console.log("MainBody -> HandlerEditReading - ", reading);
        //let newArray = [...this.state.readings, reading];
        //this.setState({readings: [...this.state.readings, reading]})
    };

    handleChangeReadingModal() {
        this.setState({showReadingModal: !this.state.showReadingModal})
    }

    readingModal() {
        let content;

        if ( this.state.showReadingModal ) {
            content = <ReadingModal actionState="Add" saveHandler={this.HandlerAddReading}
                                    readings={this.state.readings}
                                    buttonLabel={"Add Reading"}/>;
        }
        else content = null;

        return content;
    }

    render() {
        return (
            <div className="MainBody row">
                <div className="col">

                    <Button onClick={this.handleChangeReadingModal}>Add Reading 1</Button>

                    {this.readingModal()}

                    <ViewReadingEntries saveHandler={this.HandlerEditReading}
                                        readings={this.state.readings}>Readings</ViewReadingEntries>

                </div>
            </div>
        );
    }
}

export default MainBody;