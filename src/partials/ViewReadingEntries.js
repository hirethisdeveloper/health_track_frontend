import React from 'react';
import {Button} from 'reactstrap';
//import EditReadingButton from './EditReadingButton';
import ReadingModal from './ReadingModal';

const EntryNames = Object.freeze([
    "Before Breakfast",
    "After Breakfast",
    "Before Lunch",
    "After Lunch"
]);

const ViewReadingEntries = (props) => {

    return (
        <div className="table-responsive">
            <table className="table">
                <thead className="thead-light">
                <tr>
                    <th scope="col">Date Added</th>
                    <th scope="col">Entry Name</th>
                    <th scope="col">Reading</th>
                    <th scope="col" className="text-right">Actions</th>
                </tr>
                </thead>
                <tbody>

                {props.readings.map((reading, i) => <ViewReadingEntry key={i} {...reading}
                                                                      saveHandler={props.saveHandler}/>)}

                </tbody>
            </table>
        </div>
    );
};


class ViewReadingEntry extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showReadingModal: false
        };
        this.handleChangeReadingModal = this.handleChangeReadingModal.bind(this);
    }

    handleChangeReadingModal() {
        this.setState({showReadingModal: !this.state.showReadingModal})
    }

    readingModal() {
        let content;

        if ( this.state.showReadingModal ) {
            content = <ReadingModal actionState="Edit" saveHandler={this.props.saveHandler}
                                    readings={this.props.readings}
                                    data={this.props}
                                    buttonLabel="Edit"/>;
        }
        else content = null;

        return content;
    }

    render() {
        return (
            <tr>
                <td>{new Date(this.props.dateAdded).toLocaleString()}</td>
                <td>{EntryNames[this.props.entryName]}</td>
                <td>{this.props.readingValue}</td>
                <td className="text-right">
                    <Button onClick={this.handleChangeReadingModal}>Edit</Button>
                    {this.readingModal()}
                </td>
            </tr>
        );
    }
};

export default ViewReadingEntries;