import React, {Component} from 'react';

class InputText extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.inputHandler = this.inputHandler.bind(this);
    }

    inputHandler(property, event) {
        event.preventDefault();
        this.props.inputHandler(event, property)
    }

    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.props.name}>{this.props.title}</label>
                <input id={this.props.id}
                       className="form-control"
                       type="text"
                       name={this.props.name}
                       placeholder={this.props.placeholder}
                       defaultValue={this.props.value}
                       onChange={this.props.inputHandler}
                />
            </div>
        );
    }
}

export {
    InputText
};