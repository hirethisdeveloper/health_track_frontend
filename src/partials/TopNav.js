import React, {Component} from 'react';
import {SITESETTINGS} from '../lib/_site';
import FontAwesome from 'react-fontawesome';
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import '../styles/TopNav.css';

class TopNav extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state  = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div className="TopNav">
                <Navbar color="dark" dark expand="md">
                    <NavbarBrand href="/">{SITESETTINGS.title}</NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem title="My Profile">
                                <NavLink href="/profile">
                                    <FontAwesome name="user-circle" />
                                    <span className="nav-text d-sm-block d-md-none">My Profile</span>
                                </NavLink>
                            </NavItem>
                            <NavItem title="Sign Out">
                                <NavLink href="/logoff">
                                    <FontAwesome name="sign-out-alt" />
                                    <span className="nav-text d-sm-block d-md-none">Sign out</span>
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default TopNav;