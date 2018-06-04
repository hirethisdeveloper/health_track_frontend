import React, {Component} from 'react';
import {ajax} from '../lib/utilities';
import {SITESETTINGS} from '../lib/_site';

import Pace from 'react-pace-progress';
import {InputText} from "../lib/Form";

import '../styles/PageContent.css';

const objectToArray = (obj) => {
    let arr = [];
    for ( let i in obj ) {
        arr.push({
            optionText : i,
            optionValue: obj[i].code
        })
    }
    return arr;
};

class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading    : false,
            form         : {
                country: "US"
            },
            countryObject: {},
            countries    : [],
            page         : {
                title      : 'My Profile',
                description: 'Edit your system profile.'
            },
        }

        this.handleUserInput = this.handleUserInput.bind(this);
        this.formHandler     = this.formHandler.bind(this);

    }

    componentWillMount() {
        this.setState({isLoading: true});
        this._loadProfile();
        this._loadCountryObject(this.state.form.country);
    }

    _loadProfile() {
        ajax({method: 'get', endPoint: 'user.session'})
            .then(res => {
                if ( res.data.data )
                    this.setState({isLoading: false, form: res.data.data});
                else this.setState({isLoading: false});
            })
            .catch(err => {
                this.setState({isLoading: false});
            });
    }

    _loadCountryObject(country) {
        if ( country ) {
            ajax({method: 'get', endPoint: 'getCountryObject', data: {country}})
            //.get(`${SITESETTINGS.apiUrl}/getCountryObject?country=${country}`)
                .then(res => {
                    //console.log(res.data);
                    if ( res.data.countryObject ) {
                        const countryObject = res.data.countryObject;
                        if ( countryObject.regions ) {
                            this.setState({countryObject});
                        }
                    }
                })
        }
    }

    _renderRegions() {
        if ( this.state.countryObject.regions ) {
            return objectToArray(this.state.countryObject.regions).map((item, i) => <SelectOption key={i} {...item} />)
        }
        else {
            return <SelectOption optionText="Please select a country" optionValue="00"/>
        }
    }

    handleUserInput(property, event) {
        const form     = {...this.state.form};
        form[property] = event.target.value;
        this.setState({form});

        console.log("handleUserInput => ", event.target.value);

        if ( property === 'country' ) {
            this._loadCountryObject(event.target.value);
        }
    }

    formHandler(event) {
        event.preventDefault();
        const form = this.state.form;
        console.log({form})
    }

    render() {
        if ( this.state.isLoading ) return (<Pace color={SITESETTINGS.primaryColor}/>);
        else {
            return (<div>
                <main role="main" className="ml-sm-auto pt-3 px-4">
                    <div className="PageContent">

                        <div className="row">
                            <div className="col">
                                <h2>{this.state.page.title || "Untitled Page"}</h2>
                            </div>
                        </div>

                        {this.state.page.description ? <div className="row">
                            <div className="col">
                                <p className="lead">{this.state.page.description}</p>
                            </div>
                        </div> : null}

                        <hr/>

                        <div className="row">
                            <div className="col-sm-12 col-md-12 col-lg-8">
                                <form onSubmit={this.formHandler}>

                                    <div className="row">
                                        <div className="col">

                                            <InputText value={this.state.form.firstName} id="input-firstName"
                                                       name="firstName" placeholder=""
                                                       title="First name"
                                                       inputHandler={this.handleUserInput.bind(this, 'firstName')}/>
                                        </div>
                                        <div className="col">
                                            <InputText value={this.state.form.lastName} id="input-lastName"
                                                       name="lastName" placeholder=""
                                                       title="Last name"
                                                       inputHandler={this.handleUserInput.bind(this, 'lastName')}/>
                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="col">
                                            <div className="form-group">
                                                <label htmlFor="address">Street Address</label>
                                                <input type="text" className="form-control" id="address"
                                                       placeholder="123 Main St"/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col">
                                            <div className="form-group">
                                                <label htmlFor="city">City</label>
                                                <input type="text" className="form-control" id="city"
                                                       placeholder="My City..."
                                                       onChange={this.handleUserInput.bind(this, 'city')}/>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group">
                                                <label htmlFor="state">State</label>
                                                <select className="form-control"
                                                        name="state"
                                                        value={this.state.form.state}
                                                        onChange={this.handleUserInput.bind(this, 'state')}>
                                                    {this._renderRegions()}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col">
                                            <div className="form-group">
                                                <label htmlFor="zip">Zip / Postal Code</label>
                                                <input type="text" className="form-control" id="zip"
                                                       placeholder="22222"/>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group">
                                                <label htmlFor="Country">Country</label>
                                                <select className="form-control"
                                                        name="country"
                                                        value={this.state.form.country}
                                                        onChange={this.handleUserInput.bind(this, 'country')}>
                                                    <SelectOption optionValue="US" optionText="United States"/>
                                                    <SelectOption optionValue="CA" optionText="Canada"/>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <hr/>

                                    <div className="row">
                                        <div className="col">
                                            <div className="form-group">
                                                <label htmlFor="phone">Phone Number</label>
                                                <input type="text" className="form-control" id="phone"
                                                       placeholder="222-222-2222"/>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group">
                                                <label htmlFor="dob">Date of Birth</label>
                                                <input type="text" className="form-control" id="dob"
                                                       placeholder="YYYY-MM-DD"/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col">
                                            <div className="form-group">
                                                <label htmlFor="gender">Gender</label>
                                                <input type="text" className="form-control" id="gender"
                                                       placeholder="Male"/>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group">
                                                <label htmlFor="diabetesType">Type of Diabetes</label>
                                                <input type="text" className="form-control" id="diabetesType"
                                                       placeholder="Type 2"/>
                                            </div>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>


                    </div>
                </main>
            </div>);
        }
    }
}

const SelectOption = (props) => {
    //console.log("SelectOption => ", props)
    return <option value={props.optionValue}>{props.optionText}</option>;
};

export default Profile;