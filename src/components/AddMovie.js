import React, { Component } from 'react'
import axios from "axios"
import HeaderPrivate from './HeaderPrivate';
import MovieCard from './MovieCard';
import { Redirect } from "react-router-dom";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Container, Row, Col, Input, Button, Fa, Animation } from 'mdbreact';
import 'react-datepicker/dist/react-datepicker.css';
import {apiKey} from "./config"
export default class AddMovie extends Component {
    constructor(props) {
        super(props)
        this.searchApi = this.searchApi.bind(this);
        this.handleAddMovie = this.handleAddMovie.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleNoteChange = this.handleNoteChange.bind(this);
        this.state = {
            isLoading: false,
            hasCompleted: false,
            data: [
            ],
            note: "",
            dateToWatch: moment(),
            watched: false,
            shouldRedirect: false,
        }
    }
    searchApi(e) {
        e.preventDefault()
        this.setState({
            isLoading: true,
            hasCompleted: false,
            data: [],
        })
        let userQuery = e.target.elements[0].value
        axios.get(`https://peaceful-oasis-31467.herokuapp.com/http://www.omdbapi.com/?t=${userQuery}&plot=full&apikey=${apiKey}`).then((response) => {
            this.setState((prevState) => ({
                data: prevState.data.concat(response.data)
            }))
        }).then(() => {
            let year = this.state.data[0].Year;
            let rating = parseInt(this.state.data[0].imdbRating)

            this.setState({
                isLoading: false,
                hasCompleted: true,

            });
        }).catch((e) => console.log(e))
    }
    handleAddMovie() {

        axios({
            method: 'POST', url: 'https://peaceful-oasis-31467.herokuapp.com/https://guarded-chamber-92596.herokuapp.com/movies/', headers: {
                "x-auth": this.props.token
            }, data: { name: this.state.data[0].Title, year: parseInt(this.state.data[0].Year.replace(/^\–[0-9]+/gi, "")), director: this.state.data[0].Director, type: this.state.data[0].Type, rating: this.state.data[0].imdbRating, watched: this.state.watched, dateToWatch: this.state.dateToWatch, note: this.state.note, plot: this.state.data[0].Plot, poster: this.state.data[0].Poster, }
        }).then((response) => {
            ; this.setState({
                shouldRedirect: true
            })
          
        }).catch((err) => console.log(err))


    }
    handleChange(date) {
        this.setState({
            dateToWatch: date,
        });
    }
    handleNoteChange(event) {
        let note = event.target.value
        this.setState({
            note: note
        })

    }


    render() {
        return (
            <div>
                <HeaderPrivate username={this.props.username} handleReturn={this.props.handleReturn} handleDeleteToken={this.props.handleDeleteToken} token={this.props.token} />
                <div className="container">
                    <Row>
                        <Col className="mt-5 mb-3" lg="12">
                            <form onSubmit={this.searchApi}>
                                <p className="h5 text-center mb-4">Find movies and tv shows to add to your collection</p>
                                <div className="grey-text">
                                    <Input label="Search" icon="search" group type="text" validate error="wrong" success="right" />
                                </div>
                                <div className="text-center">
                                    <button className="btn btn-primary" >Find movie <Fa icon="paper-plane-o" className="ml-1" /></button>
                                </div>
                            </form>
                        </Col>
                    </Row>
                </div>
                <div className="container">
                    <div className="row mt-2">
                        <div className="col-lg-12">
                                {this.state.isLoading === true ? <div className="mt-5 d-flex align-items-center justify-content-center "><div className="nb-spinner"></div></div> : undefined}
                            {this.state.data.map((movie) => <Animation type="fadeIn"><MovieCard type={movie.Type} key={movie.Title} name={movie.Title} year={movie.Year} director={movie.Director} poster={movie.Poster} rating={movie.imdbRating} plot={movie.Plot} imdbID={movie.imdbID} /></Animation>)}
                            {this.state.data[0] !== undefined ? <Animation type="fadeIn"><div className="d-flex justify-content-space-around">
                                <div className="row">
                                    <div className="col-lg-6 col-sm-6">
                                        <p>Date to watch:</p>
                                        <DatePicker
                                            selected={this.state.dateToWatch}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="col-lg-6 col-sm-6">
                                        <p>Your note:</p>
                                        <textarea onChange={this.handleNoteChange} maxLength={120} placeholder="Some personal note about this movie"></textarea>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12 col-sm-12 ml-2 mt-2">
                                        <button id="add_movie" className="btn btn-danger mt-4 p-4" onClick={this.handleAddMovie}>Add Movie</button>
                                        {this.state.shouldRedirect === true ? <Redirect to="/dashboard" /> : undefined}
                                    </div>
                                </div>
                            </div></Animation> : undefined}
                        </div>
                    </div>
                </div>

            </div>




        )
    }
}
