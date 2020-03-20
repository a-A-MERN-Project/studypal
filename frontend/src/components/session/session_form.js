import React from 'react';
import {withRouter, Link} from 'react-router-dom';
import './session_form.css'

class SessionForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            handle: '',
            email: '',
            password: '',
            password2: '',
            zipcode: '',
            errors: {},
            users: props.users
        };
        this.renderErrors = this.renderErrors.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.update = this.update.bind(this);
        this.signup = this.signup.bind(this);
        this.login =this.login.bind(this);
        // this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
        // this.handleSubmitSignup = this.handleSubmitSignup.bind(this);
        
    }
    
    componentWillReceiveProps(nextProps){
        // debugger;
        let user = {
            email: this.state.email,
            password: this.state.password,
            handle: this.state.handle,
            zipcode: this.state.zipcode
        };
        //checking if user registered successfully, then log them in
        if(nextProps.signedIn === true){
            console.log("SUCCESS");
            this.props.logInNewUser(user)
                .then(this.props.history.push("user"));
            // this.props.history.push('/login');
        }
        
        this.setState({errors: nextProps.errors});
    }

    componentDidMount(){
        // debugger;
        this.props.clearErrors();
        
    }

    handleSubmit(e){
        e.preventDefault();
        let user = {
            email: this.state.email,
            handle: this.state.handle,
            password: this.state.password,
            password2: this.state.password2,
            zipcode: this.state.zipcode
        };
        if(this.props.formType==="Log in"){   
            
            this.props.processForm(user)
                .then(this.props.history.push("user"));
        }else{
            this.props.processForm(user);
        }

        // this.props.processForm(user);
        
    }

    // handleSubmitSignup(e){
    //     e.preventDefault();
    //     let user = {
    //         email: this.state.email,
    //         handle: this.state.handle,
    //         password: this.state.password,
    //         password2: this.state.password2,
    //         zipcode: this.state.zipcode
    //     };
    //     this.props.processForm(user);
    // }

    // handleSubmitLogin(e){
    //     e.preventDefault();
    //     let user = {
    //         email: this.state.email,
    //         password: this.state.password
    //     };
    //     this.props.processForm(user);   
    // }

    update(field){
        return e => this.setState({
            [field]: e.currentTarget.value
        })
    }

    renderErrors() {
        if (this.props.errors){
            return(
                Object.values(this.props.errors).map((err) => (
                    <li>
                        {err}
                    </li>
                )
            )
        )          
        }else{
            return(
                <div></div>
            )
        }
        
    }

    login() {
        return(
            <div className="signup-page-div">
              <div className="left-div-signup">
                <div>image</div>
              </div>
            <div className="signup-div">
              <form className="signup-form-div" onSubmit={this.handleSubmit}>
                <div className="welcome-studypal">Welcome Back</div>
                <div className="create-account-login">
                  Login to your account
                    </div>

                <div className="form-input-div">
                  <label className="form-labels">Email
                              <input
                      className="input-box"
                      type="text"
                      value={this.state.email}
                      onChange={this.update('email')}
                    />
                    <div className="horizontal-line-session"></div>
                  </label>
                </div>
                <div className="form-input-div">
                  <label className="form-labels">Password
                              <input
                      className="input-box"
                      type="password"
                      value={this.state.password}
                      onChange={this.update('password')}
                    />
                    <div className="horizontal-line-session"></div>
                  </label>
                </div>
                <div className="l-s-button-div">
                  <button className="login-signup-button">{this.props.formType}</button>
                </div>
              </form>
              <div className="nevermind">
                Never mind, <Link>just help me find a cafe.</Link>
              </div>
            </div>
                <div>
                    <ul>
                        {this.renderErrors()}
                    </ul>
                </div>
            </div>
        )
    }

    signup() {
        return (
          <div className="signup-page-div">
            <div className="signup-div">
              <form className="signup-form-div" onSubmit={this.handleSubmit}>
                
                  <div className="welcome-studypal">Welcome to StudyPal</div>
                  <div className="create-account-login">
                    Create a new account
                  </div>
                  <div className="form-input-div">
                    <label className="form-labels">
                      Username
                      <input
                        className="input-box"
                        type="text"
                        value={this.state.handle}
                        onChange={this.update("handle")}
                      />
                      <div className="horizontal-line-session"></div>
                    </label>
                  </div>
                  {/* <br /> */}
                  <div className="form-input-div">
                    <label className="form-labels">
                      Email
                      <input
                        className="input-box"
                        type="text"
                        value={this.state.email}
                        onChange={this.update("email")}
                      />
                      <div className="horizontal-line-session"></div>
                    </label>
                  </div>
                  {/* <br /> */}
                  <div className="form-input-div">
                    <label className="form-labels">
                      Password
                      <input
                        className="input-box"
                        type="password"
                        value={this.state.password}
                        onChange={this.update("password")}
                      />
                      <div className="horizontal-line-session"></div>
                    </label>
                  </div>
                  {/* <br /> */}
                  <div className="form-input-div">
                    <label className="form-labels">
                      Confirm Password
                      <input
                        className="input-box"
                        type="password"
                        value={this.state.password2}
                        onChange={this.update("password2")}
                      />
                      <div className="horizontal-line-session"></div>
                    </label>
                  </div>
                  {/* <br /> */}
                  <div className="form-input-div">
                    <label className="form-labels">
                      Zipcode
                      <input
                        className="input-box"
                        type="zipcode"
                        value={this.state.zipcode}
                        onChange={this.update("zipcode")}
                      />
                      <div className="horizontal-line-session"></div>
                    </label>
                  </div>
                  <div className="l-s-button-div">
                    <button className="login-signup-button">{this.props.formType}</button>
                  </div>
              </form>
              <div className="nevermind">
                Never mind, <Link>just help me find a cafe.</Link>
              </div>
            </div>

            <div className="right-div-signup">
              <div>image</div>
            </div>
            <div>
              <ul>{this.renderErrors()}</ul>
            </div>
          </div>
        );
    }

    render() {
        // debugger;
        return this.props.formType === "Log in" ? this.login() : this.signup()
    }
};

export default SessionForm;
