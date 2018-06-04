import React, {Component} from 'react';
import {Button} from 'reactstrap';
import {SITESETTINGS} from '../lib/_site';
import {ajax, session} from '../lib/utilities';
import Pace from 'react-pace-progress';
import '../styles/Login.css';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            form     : {
                username: "",
                password: "",
                remember: false
            }
        };

        this.validateLogin  = this.validateLogin.bind(this);
        this.handlerSetAuth = this.handlerSetAuth.bind(this);
    }

    ShowLoading() {
        if ( this.state.isLoading )
            return <Pace color={SITESETTINGS.primaryColor}/>
    }

    validateLogin = (event) => {
        event.preventDefault();

        this.setState({isLoading: true})

        // check login on server
        ajax({method: 'post', endPoint: 'auth', raw: true, data: {...this.state.form}})
        //.post(`${SITESETTINGS.backendUrl}/auth`, this.state.form)
            .then(res => {
                console.log(res);
                if ( res.data.session ) {
                    session.set(res.data.session);
                    this.handlerSetAuth();
                }
            })

        //this.handlerSetAuth();

        //this.showErrorMessages();

    };

    handlerSetAuth = () => {
        //console.log("login form submit =>", this.state.form)
        this.setState({isLoading: false})
        this.props.handlerSetAuth(true);
    };

    handleUserInput(property, event) {
        const form     = {...this.state.form};
        form[property] = event.target.value;
        this.setState({form});
    }

    render() {
        return (
            <div className="Login">
                {this.ShowLoading()}
                <form className="form-signin" onSubmit={this.validateLogin}>
                    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input
                        onChange={this.handleUserInput.bind(this, 'username')}
                        value={this.state.form.username}
                        type="email"
                        id="inputEmail"
                        className="form-control"
                        placeholder="Email address"
                        required
                        autoFocus/>
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input
                        onChange={this.handleUserInput.bind(this, 'password')}
                        type="password"
                        id="inputPassword"
                        className="form-control"
                        placeholder="Password"
                        required/>
                    <div className="checkbox mb-3">
                        <label>
                            <input
                                onChange={this.handleUserInput.bind(this, 'remember')}
                                value={this.state.form.remember}
                                type="checkbox"/> Remember me
                        </label>
                    </div>
                    <Button className="btn btn-lg btn-primary btn-block">Sign in</Button>
                    <p className="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
                </form>
            </div>
        );
    }
}

export default Login;