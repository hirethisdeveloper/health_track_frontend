import React, {Component} from 'react';
import '../styles/PageContent.css';

class FoodDiary extends Component {
    render() {
        return (
            <main role="main" className="ml-sm-auto pt-3 px-4">
                <div className="PageContent">
                    <div className="row">
                        <div className="col">
                            <h1 className="h2">Food Diary</h1>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default FoodDiary;