import React, { Component } from 'react'
import axios from "axios";
import { GoogleLoginButton } from "react-social-login-buttons";
import {google} from "./config" 
class Google extends Component {
    constructor(props) {
        super(props)
        this.handleGoogleLogin = this.handleGoogleLogin.bind(this)
        this.state = {

        }
    }
    componentDidMount() {
        let hello = require('hellojs')
        hello.init({
            google: google,
            scope: "profile"
        }, {
                redirect_uri: "/"
            })


    }

    handleGoogleLogin() {
        let email
        let id
        let username
        let hello = require('hellojs')

        hello("google").login({
            scope: "profile, email"
        }).then(() => { }, (e) => console.log(e))
        let socialToken;

        hello.on('auth.login', (auth) => {

            socialToken = auth.authResponse.access_token;
            axios.get(`https://www.googleapis.com/plus/v1/people/me`, {
                headers: {
                    "Authorization": 'Bearer ' + socialToken
                }
            })
                .then((response) => {
                    
                    email = response.data.emails[0].value; id = response.data.id;

                    username = response.data.displayName
                    try {
                        this.props.handleSignInGoogle(email, id,username);
                        this.props.handleLogInGoogle(email, id);
                    }
                    catch (e) {
                        console.log(e)
                    }
                    finally {
                        this.props.handleLogInGoogle(email, id);
                        this.props.handleLogInGoogle(email, id)
                    }




                }).catch((e) => console.log(e))



        })


        hello.logout("google")
    }

    render() {
        return (
            <div className="w-100">
                <GoogleLoginButton onClick={this.handleGoogleLogin} />
            </div >
        )
    }
}
export default Google