import React from 'react'
import moment from "moment";
import axios from "axios";
import { Redirect } from "react-router-dom";


import { Button } from 'mdbreact'

class MovieCardDashboard extends React.Component {
    constructor(props) {
        super(props)

        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.handleDeleteMovie = this.handleDeleteMovie.bind(this);
        this.handleUpdateMovie = this.handleUpdateMovie.bind(this);
        this.handleHover = this.handleHover.bind(this)
        this.handleSetQuery = this.handleSetQuery.bind(this)
        this.state = {
            note: this.props.note,
            modalOpen: false,
            redirectDash: false,
            isHover: false,
            redirect: false,

        }
    }
    componentDidMount() {

    }
    openModal() {
        this.setState({
            modalOpen: true
        })
    }
    closeModal() {
        this.setState({
            modalOpen: false
        })
    }
    handleSetQuery() {
        let name = this.props.name;
       
        this.props.handleReturn(this.props.movies.find((movie) => name === movie.name))

        this.props.movies.find((movie) => {
            if (name === movie.name && window.location.pathname !== "/findmovie") {
                this.setState({
                    redirect: true,

                });

            }
        })
    }
    handleDeleteMovie() {
        let id = this.props.id;
        axios({
            method: 'DELETE', url: `https://peaceful-oasis-31467.herokuapp.com/https://guarded-chamber-92596.herokuapp.com/movies/${id}`, headers: {
                "x-auth": this.props.token
            },
        }).then((response) => {
            this.setState({
                redirectDash: true
            }); this.props.handleGetAllMovies()
        }).catch((err) => console.log(err))
    }

    handleUpdateMovie() {
        let id = this.props.id
        let watched = !this.props.watched
        this.setState({
            watchedFind: watched
        })
        axios({
            method: 'PATCH', url: `https://peaceful-oasis-31467.herokuapp.com/https://guarded-chamber-92596.herokuapp.com/movies/${id}/watched`, headers: {
                "x-auth": this.props.token
            }, data: {
                watched: watched,
            }
        }).then((response) => { this.props.handleGetAllMovies() }).catch((err) => console.log(err))
    }
    handleHover() {
        this.setState({
            isHover: !this.state.isHover
        })
    }

    render() {

        return (

            <div className="grid-img mt-4 mb-4">
                <div onMouseOut={(e) => this.props.onMouseOut(e)
                } className="container-img-test">
                    <img onMouseEnter={(e) => this.props.imgClickTest(e)} s className="img-fluid card-img-top" src={this.props.poster} alt="Card image cap" />
                    {this.props.isHovering ? <Button id="update" color="blue darken-3" className="p-1" onClick={this.handleUpdateMovie}>{this.props.watched ? <i className="fas fa-check ml-2 mr-2 "></i> : <i className="fas fa-times ml-2 mr-2  "></i>}</Button> : undefined}
                    {this.props.isHovering ? <Button id="delete" color="blue darken-3" className="p-1 ml-2 mr-2" onClick={this.handleDeleteMovie}>  <i className="fas fa-trash-alt ml-2 mr-2"></i></Button> : undefined}
                    {this.props.isHovering ? <Button id="edit" color="blue darken-3" className="p-1 ml-2 mr-2" onClick={this.handleSetQuery}><i class="fas fa-edit ml-2 mr-2"></i></Button> : undefined}
                </div>

                {this.state.redirectDash === true && window.location.pathname === "/findmovie" ? <Redirect to="/dashboard" /> : undefined}
                {(this.state.redirect === true && window.location.pathname !== `/findmovie`) ? <Redirect to={{
                    pathname: "/findmovie",
                }} /> : undefined}

            </div>



        )
    }


}



export default MovieCardDashboard
