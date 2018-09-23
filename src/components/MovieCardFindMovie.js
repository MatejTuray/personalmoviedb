
import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from "react-router-dom";
import axios from "axios";
import StarRatings from 'react-star-ratings'
import { Button } from "mdbreact";

class MovieCardFindMovie extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleNoteChange = this.handleNoteChange.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleCheckChange = this.handleCheckChange.bind(this)
        this.changeRating = this.changeRating.bind(this)
        this.state = {
            dateToWatch: moment(),
            note: this.props.note,
            watched: this.props.watched,
            rating: this.props.rating

        }
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
    handleCheckChange() {
        let status = !this.state.watched
        this.setState({
            watched: status,
        })

    }
    handleUpdate() {
        let id = this.props.id

        axios({
            method: 'PATCH', url: `https://peaceful-oasis-31467.herokuapp.com/https://guarded-chamber-92596.herokuapp.com/movies/${id}`, headers: {
                "x-auth": this.props.token
            }, data: {
                dateToWatch: this.state.dateToWatch,
                note: this.state.note,
                watched: this.state.watched,
                rating: this.state.rating,
            }
        }).then((response) => { ; this.props.closeModal(); this.props.handleGetAllMovies() }).catch((err) => console.log(err))
    }
    changeRating(newrating) {
        let id = this.props.id
        this.setState({
            rating: newrating
        })
        axios({
            method: 'PATCH', url: `https://peaceful-oasis-31467.herokuapp.com/https://guarded-chamber-92596.herokuapp.com/movies/${id}/rating`, headers: {
                "x-auth": this.props.token
            }, data: {
                rating: newrating,

            }
        }).catch((err) => console.log(err))

    }

    render() {

        let linkstring = `https://www.imdb.com/title/${this.props.imdbID}/`
        return (
            <div className="row">
                <div className="col-lg-6 col-sm-7"><blockquote className="blockquote bq-primary">

                    <div className="d-flex justify-content-between">
                        <div>
                            <h1 id="textarea-title" className="bq-title">{this.props.name}</h1>
                            <p id="textarea-subtitle" className="lead">{this.props.director}</p>
                        </div>
                        <div>
                            <h3 id="year" >{this.props.year}</h3>

                        </div>
                    </div>
                    <div>{this.props.type === "movie" ? <i className="type fas fa-film ml-2 mr-2  "> <span></span> </i> : <i className="type fas fa-tv ml-2 mr-2  "> <span></span> </i>}</div>
                    <StarRatings
                        rating={parseInt(this.state.rating)}
                        starRatedColor="DarkGoldenRod"
                        starHoverColor="DarkGoldenRod"
                        changeRating={this.changeRating}
                        numberOfStars={10}
                        name='rating'
                        starDimension="25px"
                        starSpacing="3px" />


                    <p id="textarea-plot">{this.props.plot}</p>

                </blockquote>
                    <div className="row ml-3">
                        <div className="col-lg-12 col-sm-12">


                            <small>New watchdate and note:</small>
                            <DatePicker selected={this.state.dateToWatch}
                                onChange={this.handleChange} />

                            <textarea className="mt-3" maxLength={70} onChange={this.handleNoteChange}>{this.state.note}</textarea>
                        </div>


                    </div>
                    <div className="row ml-3">
                        <div className="col-lg-12 col-sm-12">
                            <Button className="btn btn-secondary mr-2" onClick={this.handleCheckChange}>{this.state.watched ? <i className="fas fa-check ml-2 mr-2 "></i> : <i className="fas fa-times ml-2 mr-2  "></i>}</Button>
                            <Link to="/dashboard"><Button onClick={this.handleUpdate}>Update</Button></Link>
                        </div>

                    </div>
                </div>
                <div className="col-lg-6 col-sm-5 justify-content-center">
                    <img className="img-responsive img-add" src={this.props.poster} alt="Card image cap" />

                </div>

            </div>


        )
    }
}




export default MovieCardFindMovie