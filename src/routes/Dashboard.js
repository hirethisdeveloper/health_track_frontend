import React, {Component} from 'react';
import '../styles/PageContent.css';

class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            form     : {},
            page     : {
                title      : 'Dashboard'
            },
        }

    }

    render() {
        return (
            <main role="main" className="ml-sm-auto pt-3 px-4">
                <div className="PageContent">
                    <div className="row">
                        <div className="col">
                            <h1 className="h2">Dashboard</h1>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default Dashboard;