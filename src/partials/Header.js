import React, {Component} from 'react';
//import logo from './logo.svg';
//import { Button } from 'reactstrap';
import '../styles/Header.css';

class Header extends Component {
    render() {
        return (
            <div className="Header">
                <header className="App-header">
                    <h1>Health Track</h1>
                </header>
            </div>
        );
    }
}

export default Header;