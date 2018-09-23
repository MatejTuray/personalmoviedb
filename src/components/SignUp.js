import React from 'react'
import { Link } from "react-router-dom"
import { Container, Row, Col, Input, Button } from 'mdbreact';
const SignUp = (props) => {
    return (

  <div className="container-fluid">
        <div className="mt-auto align-items-center">
            <div id="login" className="row d-flex align-items-center justify-content-center">
            <div id="box">
                <Col lg="12">
                    <form onSubmit={(e) => { props.handleSignUp(e) }}>
                        <div className="grey-text">
                            <Input label="Your name" icon="user" group type="text" validate error="wrong" success="right" required/>
                            <Input color="secondary" label="Type your email" icon="envelope" group type="email" validate error="wrong" success="right" id="email" type="email" required />
                            <Input label="Confirm your email" icon="exclamation-triangle" group type="email" validate error="wrong" success="right" required/>
                            <Input color="secondary" label="Type your password" icon="lock" group type="password" validate />
                            <Input label="Confirm your password" icon="exclamation-triangle" group type="password" validate error="wrong" success="right" required/>
                            <div className="text-center">
                              <button className="btn btn-secondary">Register</button>
                            <Link to="/"><Button>To login</Button></Link>
                            </div>
                       
                        </div>

                    </form>
                </Col>
              </div>
            </div>
            </div>
        </div>

    )
}



export default SignUp

