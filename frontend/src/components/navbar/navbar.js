import '../../reset.css';
import './navbar.css';
import { Link, Redirect, withRouter} from 'react-router-dom';
import React from 'react';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.loggedOut = this.loggedOut.bind(this)
        this.loggedIn = this.loggedIn.bind(this)
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(){
         
        this.props.logout();
         
        this.props.history.push('/');
        
    }
                
    loggedOut() {
        if (!this.props.loggedIn) {
            return (
                <div className="button-div">
                    <Link className="button" onClick={() => this.props.login({ email: "ryan@gmail.com", password: "password" })}>Demo</Link>
                    {/* <Link className="button" to="/signup">Demo</Link> */}
                    <div className="vertical-line-navbar"></div>
                    <Link className="button" to="/login">Log In</Link>
                    <div className="vertical-line-navbar"></div>
                    <Link className="button" to="/signup">Sign Up</Link>
                </div>
            )
        }
    }

    loggedIn() {
        if (this.props.loggedIn) {
            return (
                <div className="button-div">
                    {/* <Link className="button" to="/login">Log Out</Link> */}
                    <Link className="button" to="/user">Profile</Link>
                    <div className="vertical-line-navbar"></div>
                    <button className="button2" onClick={this.handleLogout}>Log Out</button>
                </div>
            )
        }
    }

    render() {
        return(
            <div className="navbar">
                <Link className="logo" to="/">Studypal</Link>
                    {this.loggedOut()}
                    {this.loggedIn()}
            </div>
        )

    }
}




export default withRouter(NavBar);