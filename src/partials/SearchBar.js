import React, {Component} from 'react';
//import { Button } from 'reactstrap';
import '../styles/SearchBar.css';

class SearchBar extends Component {
    render() {
        return (
            <div className="SearchBar">
                <input
                    className="form-control form-control-dark w-100"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"/>
            </div>
        );
    }
}

export default SearchBar;