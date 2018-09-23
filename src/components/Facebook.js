import React, { Component } from 'react'
import axios from "axios";
import { FacebookLoginButton } from "react-social-login-buttons";
import {facebook} from "./config";
class Facebook extends Component {
    constructor(props) {
        super(props)
        this.handleFacebookLogin = this.handleFacebookLogin.bind(this)
        this.state = {

        }
    }
    componentDidMount() {        
        let hello = require('hellojs')
        hello.init({
            facebook: facebook,
        }, {
                redirect_uri: "/"
            })


    }

    handleFacebookLogin() {
        let username
        let email
        let id
        let hello = require('hellojs')

        hello("facebook").login({
            scope: "public_profile, email"
        }).then(() => { }, (e) => console.log(e))
        let socialToken;

        hello.on('auth.login', (auth) => {

            socialToken = auth.authResponse.access_token;
        

            axios.get(`https://graph.facebook.com/v3.1/me?access_token=${socialToken}&debug=all&fields=id%2Cname%2Cemail&format=json&`).then((response) => {


              
                email = response.data.email
                id = response.data.id
                username = response.data.name
                try {
                    this.props.handleSignInFacebook(email, id,username);
                    this.props.handleLogInFacebook(email, id);
                }
                catch (e) {
                    console.log(e)
                }
                finally {
                    this.props.handleLogInFacebook(email, id);
                }


            }).catch((e) => console.log(e))





        })
        hello.logout("facebook")
    }

    render() {
        return (
            <div className="w-100">
                <FacebookLoginButton onClick={this.handleFacebookLogin} />
            </div >
        )
    }
}
export default Facebook