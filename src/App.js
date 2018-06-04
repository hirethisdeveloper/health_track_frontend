import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import TopNav from './partials/TopNav';
import MainSidebar from './partials/MainSidebar';
import {SITESETTINGS} from "./lib/_site";
import {session} from './lib/utilities';
import Pace from 'react-pace-progress';
import './styles/App.css';

import Login from './routes/Login';
import Profile from './routes/Profile';

import Dashboard from './routes/Dashboard';
import GlucoseReadings from './routes/GlucoseReadings';
import WeightLog from './routes/WeightLog';
import BloodPressure from './routes/BloodPressure';
import FoodDiary from './routes/FoodDiary';

class App extends Component {

    constructor() {
        super();
        this.state          = {
            auth     : false,
            isLoading: false
        };
        this.handlerSetAuth = this.handlerSetAuth.bind(this);
    }

    componentWillMount() {
        this.setState({isLoading: true});
        session.verify(session.get())
            .then(res => {
                if ( res.status === 200 ) {
                    this.setState({isLoading: false, auth: true});
                }
                else this.setState({isLoading: false})
            })
            .catch(err => {
                this.setState({isLoading: false})
            })
    }

    handlerSetAuth = (data) => {
        console.log("handlerSetAuth => ", data);
        this.setState({isLoading: false, auth: data})
    };

    ShowLogin() {
        // only show login form if
        // - this verify token is finished
        // - auth is not true
        if ( !this.state.auth && !this.state.isLoading ) {
            return <Login handlerSetAuth={this.handlerSetAuth}></Login>
        }
    }

    ShowApp() {
        if ( this.state.auth ) {
            return <AppContent navItems={this.state.navItems}></AppContent>
        }
    }

    ShowLoading() {
        if ( this.state.isLoading )
            return <Pace color={SITESETTINGS.primaryColor}/>
    }

    render() {
        return (
            <Router>
                <div className="App">
                    {this.ShowLoading()}
                    {this.ShowLogin()}
                    {this.ShowApp()}
                </div>
            </Router>
        );
    }
}

const AppContent = (props) => {
    return <div>
        <TopNav></TopNav>

        <div className="container-fluid">
            <div className="row">
                <Route path="/" component={MainSidebar}/>
                <Route exact path="/" component={Dashboard}/>
                <Route exact path="/glucose-readings" component={GlucoseReadings}/>
                <Route exact path="/weight-log" component={WeightLog}/>
                <Route exact path="/blood-pressure" component={BloodPressure}/>
                <Route exact path="/food-diary" component={FoodDiary}/>
                <Route exact path="/profile" component={Profile}/>
            </div>
        </div>
    </div>
};

export default App;
