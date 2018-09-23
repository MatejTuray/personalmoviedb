import React, { Component } from 'react';
import SignUp from "./components/SignUp"
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import axios from "axios";
import "./styles/styles.css"
import { Redirect } from "react-router-dom";
import { Switch, Route } from 'react-router';
import { BrowserRouter } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import AddMovie from './components/AddMovie';
import FindMovie from "./components/FindMovie";


const history = createBrowserHistory()
class App extends Component {
  constructor(props) {
    super(props)
    this.handleSignUp = this.handleSignUp.bind(this)
    this.handleLogIn = this.handleLogIn.bind(this)
    this.handleDeleteToken = this.handleDeleteToken.bind(this)
    this.handleReturn = this.handleReturn.bind(this)
    this.handleSignInGoogle = this.handleSignInGoogle.bind(this)
    this.handleLogInGoogle = this.handleLogInGoogle.bind(this)
    this.handleWindowClose = this.handleWindowClose.bind(this)
    this.state = {
      shouldRedirect: false,
      isAuthenticated: false,
      errormsg: "",
      token: "",
      _id: "",
      username: "",
      query: [],
      status: "done",
    }
  }
  componentDidMount() {
       window.addEventListener('onbeforeunload', this.handleWindowClose);
    setTimeout(() => {
      this.setState({
        isAuthenticated: false,
        token: "",
        _id: "",
      });

      alert("You have been logged out due to inactivity");
    }, 6 * 10000 * 15);

  }
  handleLogInGoogle(email, id) {
    this.setState({
      status: "loading"
    })
    let emailG = email
    let password = id
    let auth
    axios.post("https://peaceful-oasis-31467.herokuapp.com/https://guarded-chamber-92596.herokuapp.com/login", { email: emailG, password: password, }).then((response) => {
      auth = response.headers["x-auth"];
      this.setState({
        _id: response.data._id,
        token: auth,
        username: response.data.username
      })
      if (this.state.token !== undefined) {
        this.setState({
          isAuthenticated: true,
          status: "done"
        })

      }

    }).catch((e) => { console.log(e) })
  }
  handleLogIn(e) {
    this.setState({
      status: "loading"
    })
    e.preventDefault()
    let email = e.target.elements[0].value
    let password = e.target.elements[1].value
    let responsestatus
    let auth
    axios.post("https://peaceful-oasis-31467.herokuapp.com/https://guarded-chamber-92596.herokuapp.com/login", { email: email, password: password, }).then((response) => {
      auth = response.headers["x-auth"];
      this.setState({
        _id: response.data._id,
        token: auth,
        username: response.data.username
      })
      if (this.state.token !== undefined) {
        this.setState({
          isAuthenticated: true,
          status: "done"
        })

      }
      responsestatus = response.status;
    }).catch((e) => { console.log(e) }).then(() => {

      if (responsestatus === 200) {
        // TODO WELCOME BACK NAME
      }
      else {
        this.setState({
          errormsg: "Wrong email or password provided"
        })

        alert(this.state.errormsg)
      }
    })
  }

  handleSignUp(e) {
    e.preventDefault()
    console.log(e.target.elements)
    let username = e.target.elements[0].value
    let email = e.target.elements[1].value
    let password = e.target.elements[3].value
    if (email === e.target.elements[2].value && password === e.target.elements[4].value){
    axios.post("https://peaceful-oasis-31467.herokuapp.com/https://guarded-chamber-92596.herokuapp.com/users/", {
      email: email, password: password, username:username,
    }).then((response) => { alert("You have been signed up, please check your mail for further info"); this.setState({ shouldRedirect: true, }) }).catch((e) => console.log(e))
    }
    else{
      alert("Check your email and/or password")
    }
  }
  handleSignInGoogle(email, id, username) {
    let usernameG = username
    let emailG = email
    let password = id
    axios.post("https://peaceful-oasis-31467.herokuapp.com/https://guarded-chamber-92596.herokuapp.com/social/", {
      email: emailG, password: password, username: usernameG,
    }).then((response) => {
      console.log(response); this.setState({ shouldRedirect: true, }); if (response.data.email === emailG) { this.handleLogInGoogle(emailG, password) }

    }).catch((e) => console.log(e))
  }
  handleDeleteToken(e) {
    e.preventDefault()
    this.setState({
      isAuthenticated: false,
      token: "",
      _id: "",
      username: "",
    });
    alert("You have been logged out")

  }
  handleWindowClose(){
    axios({
      method: 'DELETE', url: `https://peaceful-oasis-31467.herokuapp.com/https://guarded-chamber-92596.herokuapp.com/users/me/token`, headers: {
        "x-auth": this.props.token
      },
    }).then((response) => {


    }).catch((err) => console.log(err))
  }
  handleReturn(search) {

 
    this.setState({
      query: [search]
    })
    console.log(this.state)
  }
  componentWillUnmount() {
     window.removeEventListener('onbeforeunload', this.handleWindowClose);
    axios({
      method: 'DELETE', url: `https://peaceful-oasis-31467.herokuapp.com/https://guarded-chamber-92596.herokuapp.com/users/me/token`, headers: {
        "x-auth": this.props.token
      },
    }).then((response) => {


    }).catch((err) => console.log(err))
  }

  render() {
    return (
      <BrowserRouter >

        <Switch>
          <Route path="/" exact={true} render={() => <Login status={this.state.status} handleSignInGoogle={this.handleSignInGoogle} shouldRedirect={this.state.shouldRedirect} handleLogInGoogle={this.handleLogInGoogle} isAuthenticated={this.state.isAuthenticated} handleLogIn={this.handleLogIn}  />} />
          <Route path="/signup" render={() => <SignUp handleSignUp={this.handleSignUp} />} />
          <Route path="/dashboard" render={() => { return this.state.isAuthenticated ? <Dashboard query={this.state.query} handleReturn={this.handleReturn} handleDeleteToken={this.handleDeleteToken} _id={this.state._id} token={this.state.token} username={this.state.username} /> : <Redirect to="/" /> }} />
          <Route path="/add" render={() => { return this.state.isAuthenticated ? <AddMovie handleReturn={this.handleReturn} handleDeleteToken={this.handleDeleteToken} _id={this.state._id} token={this.state.token} username={this.state.username} /> : <Redirect to="/" /> }} />
          <Route path="/findmovie" render={() => { return this.state.isAuthenticated ? <FindMovie handleReturn={this.handleReturn} query={this.state.query} handleDeleteToken={this.handleDeleteToken} _id={this.state._id} token={this.state.token} username={this.state.username} /> : <Redirect to="/" /> }} />
        </Switch>
      
      </BrowserRouter>
    );
  }
}

export default App;
