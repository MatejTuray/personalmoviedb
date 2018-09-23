import React, { Component } from 'react'
import axios from "axios"
import { Link } from "react-router-dom";
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css'
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css'
import { Redirect } from "react-router-dom";

import { FormInline, Input, Fa, Button } from "mdbreact"
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact';
export default class HeaderPrivate extends Component {
    constructor(props) {
        super(props)
        this.handleLogout = this.handleLogout.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.onClick = this.onClick.bind(this);
        this.state = {
            user: "",
            searchVal: "",
            searchOptions: [],
            movies: [],
            redirect: false,
            collapse: false,
            isWideEnough: false,

        }
    }
    componentDidMount() {
        axios({
            method: 'GET', url: `https://peaceful-oasis-31467.herokuapp.com/https://guarded-chamber-92596.herokuapp.com/users/me/`, headers: {
                "x-auth": this.props.token
            },
        }).then((response) => {
            this.setState({
                user: response.data.email
            })
        }).catch((e) => console.log(e))
        axios({
            method: 'GET', url: 'https://peaceful-oasis-31467.herokuapp.com/https://guarded-chamber-92596.herokuapp.com/movies/', headers: {
                "x-auth": this.props.token
            }
        }).then((response) => {
            this.setState({
                movies: response.data.movies,
                searchOptions: response.data.movies.map((movie) => movie.name),

            });

        }).catch((err) => console.log(err))


    }
    handleLogout(e) {
        axios({
            method: 'DELETE', url: `https://peaceful-oasis-31467.herokuapp.com/https://guarded-chamber-92596.herokuapp.com/users/me/token`, headers: {
                "x-auth": this.props.token
            },
        }).then((response) => {

            this.props.handleDeleteToken(e)
        }).catch((err) => console.log(err))
    }
    handleChange(value) {
        this.setState({
            searchVal: value,
        })
    }
    handleClear() {
        this.setState({
            searchVal: "",
            result: []
        })
    }
    handleSearch(e) {
        e.preventDefault()

        let search = this.state.searchVal[0]
        console.log(search)
        this.props.handleReturn(this.state.movies.find((movie) => search === movie.name))

        this.state.movies.find((movie) => {
            if (search === movie.name && window.location.pathname !== "/findmovie") {
                this.setState({
                    redirect: true,

                });

            }
        })
    }
    onClick() {
        this.setState({
            collapse: !this.state.collapse,
        });

    }



    render() {
        return (
            <div id="nav">
                <Navbar className="justify-content-space-between w-100" color="mdb-color darken-3" dark expand="md" scrolling>
                    <div>

                        {!this.state.isWideEnough && <NavbarToggler onClick={this.onClick} />}
                        <Collapse isOpen={this.state.collapse} navbar>
                            <NavbarNav left>
                                {window.location.pathname === "/dashboard" ? <NavItem active>
                                <br/>
                                    <Link id="dashboard" to="/dashboard">Dashboard</Link>
                                </NavItem> : <NavItem>
                                <br/>
                                        <Link id="dashboard" to="/dashboard">Dashboard</Link>
                                    </NavItem>}
                                    
                                {window.location.pathname === "/add" ? <NavItem active>
                                     <br/>
                                    <Link id="add" to="/add">Add</Link>
                                </NavItem> : <NavItem>
                                     <br/>
                                        <Link id='add' to="/add">Add</Link>
                                    </NavItem>}
                                <NavItem>
                                    <Dropdown>
                                        <DropdownToggle nav caret>{this.props.username}</DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem href="#" onClick={(e) => { this.handleLogout(e) }}>Log out</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </NavItem>
                            </NavbarNav>
                            <NavbarNav right>
                                <NavItem>
                                    <FormInline className="ml-3 md-form" onSubmit={this.handleSearch}>


                                        <button id="#searchbtn" className="btn btn-outline-primary"> <Fa className="fas fa-search"></Fa></button>

                                        <Typeahead
                                            id="typeahead"
                                            className="mr-3 w-75"
                                            onChange={(value) => {
                                                this.handleChange(value);
                                            }}
                                            options={this.state.searchOptions}
                                            selected={this.state.searchVal}
                                            placeholder="Search your library"
                                        />





                                    </FormInline>
                                </NavItem>
                            </NavbarNav>
                        </Collapse>
                    </div>
                </Navbar>
                {(this.state.redirect === true && window.location.pathname !== `/findmovie`) ? <Redirect to={{
                    pathname: "/findmovie",
                    state: { event: "test" }
                }} /> : undefined}

            </div>
            //     <div className="container-fluid">
            //         <p>{this.state.user}</p>
            //         {window.location.pathname === "/dashboard" ? <button><Link to="/add" >Add new movie</Link></button> : <button><Link to="/dashboard">Dashboard</Link></button>}
            //         {(this.state.redirect === true && window.location.pathname !== `/findmovie`) ? <Redirect to={{
            //             pathname: "/findmovie",
            //             state: { event: "test" }
            //         }} /> : undefined}
            //         {window.location.pathname !== `/findmovie` ? <FormInline classname="mdb-form" onSubmit={this.handleSearch}>

            // <Button><i className="fas fa-search">
            //             </i></Button>

            //             <Typeahead
            //                 id = "typeahead"
            //                 className="mr-3 w-75"
            //                 onChange={(value) => {
            //                     this.handleChange(value);
            //                 }}
            //                 options={this.state.searchOptions}
            //                 selected={this.state.searchVal}
            //                 placeholder="Search your library"
            //             />





            //         </FormInline>
            //             : undefined}
            //         <button onClick={(e) => { this.handleLogout(e) }}>Log out</button>
            //     </div>
        )
    }
}



