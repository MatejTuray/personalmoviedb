import React from 'react'
import { Redirect, Link } from "react-router-dom"
import Google from "./Google"
import Facebook from "./Facebook"
import { Container, Row, Col, Input, Button, Card } from 'mdbreact';
import HeaderPublic from "./HeaderPublic"
const Login = (props) => {
    return (
        <div className="container-fluid">
            <HeaderPublic />
            <div className="mt-auto align-items-center">

                <div id="login" className="row d-flex align-items-center justify-content-center">
                    <div id="box">
                        <Col lg="12" sm="12">
                            <h1>PersonalMovie DB</h1>
                            <h5>Keeping your movies & tv shows organized</h5>
                        </Col>
                        <Col lg="12" sm="12">

                            {props.isAuthenticated ? <Redirect to="/dashboard" /> : undefined}
                            <form onSubmit={(e) => { props.handleLogIn(e) }}>
                                <div className="grey-text">
                                    <Input color="secondary" label="Type your email" icon="envelope" group type="email" validate error="wrong" success="right" id="email" type="email" required />
                                    <Input color="secondary" label="Type your password" icon="lock" group type="password" validate required />
                                    <div className="text-center">
                                    </div>
                                    <button className="btn btn-secondary">Log in</button>
                                    <Link to="/signup"><Button >Sign up</Button></Link>
                                </div>
                            </form>

                            <Google handleSignInGoogle={props.handleSignInGoogle} shouldRedirect={props.shouldRedirect} handleLogInGoogle={props.handleLogInGoogle} />
                            <Facebook handleSignInFacebook={props.handleSignInGoogle} shouldRedirect={props.shouldRedirect} handleLogInFacebook={props.handleLogInGoogle} />
                        </Col>
                        {props.status === "loading" ? <div className="mt-5 d-flex align-items-center justify-content-center "><div className="nb-spinner"></div></div> : undefined}
                    </div>
                </div>

            </div>
        </div>
    )
}



export default Login