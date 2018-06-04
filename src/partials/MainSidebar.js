import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome';
import {NavItem, NavLink} from 'reactstrap';
import {Link} from 'react-router-dom';
import '../styles/MainSidebar.css';

class MainSidebar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            navItems: [
                {title: "Dashboard", url: "/", icon: "home"},
                {title: "Glucose Readings", url: "/glucose-readings", icon: "ambulance"},
                {title: "Weight Log", url: "/weight-log", icon: "weight"},
                {title: "Blood Pressure", url: "/blood-pressure", icon: "band-aid"},
                {title: "Food Diary", url: "/food-diary", icon: "utensils"},
            ]
        };

    }

    render() {
        return (
            <div>
                <nav className="MainSidebar d-none d-md-block bg-light sidebar">
                    <div className="sidebar-sticky">
                        <ul className="nav flex-column">
                            {this.state.navItems.map((item, i) => <NavItem
                                className={(item.url === this.props.location.pathname) ? 'active' : ''} key={i}>
                                <FontAwesome name={item.icon}/>
                                <NavLink tag={Link} to={item.url} title={item.title}>
                                    {item.title}
                                </NavLink>
                            </NavItem>)}
                        </ul>
                    </div>
                </nav>

                <nav className="BottomNav navbar d-md-none fixed-bottom navbar-dark bg-dark">
                    <ul className="nav">
                        {this.state.navItems.map((item, i) => <NavItem
                            className={(item.url === this.props.location.pathname) ? 'active' : ''} key={i}>
                            <NavLink tag={Link} to={item.url} title={item.title}>
                                <FontAwesome name={item.icon} size="2x"/>
                            </NavLink>
                        </NavItem>)}
                    </ul>
                </nav>
            </div>
        );
    }
}

export default MainSidebar;