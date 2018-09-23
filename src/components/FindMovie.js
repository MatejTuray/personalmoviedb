import HeaderPrivate from './HeaderPrivate';

import React, { Component } from 'react';
import MovieCardFindMovie from "./MovieCardFindMovie";
import axios from "axios";
import { Animation } from "mdbreact";
class FindMovie extends Component {
    constructor(props) {
        super(props)

        this.handleGetAllMovies = this.handleGetAllMovies.bind(this)
        this.changeRating = this.changeRating.bind(this)
        this.state = {
            status: "loading",
            query: []
            
        }
    }
    componentDidMount() {

        this.setState({
            name: this.props.query[0].name,
            status: "loading"

        })
        this.handleGetAllMovies()


    }

    componentDidUpdate(prevProps) {
        if (prevProps.query[0].name !== this.props.query[0].name) {
            this.setState({
                name: this.props.query[0].name,
                status: "loading"

            })
            this.handleGetAllMovies()
        }

    }



    handleGetAllMovies() {
        axios({
            method: 'GET', url: 'https://peaceful-oasis-31467.herokuapp.com/https://guarded-chamber-92596.herokuapp.com/movies/', headers: {
                "x-auth": this.props.token
            }
        }).then((response) => {
            this.setState({
                query: []
            })
                ; this.setState({
                    query: this.state.query.concat(response.data.movies.find((movie) => this.state.name === movie.name)),

                });
            this.setState({
                status: "done"
            })
        }).catch((err) => console.log(err))


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
        return (
            <div>
                <HeaderPrivate username={this.props.username} handleReturn={this.props.handleReturn} handleDeleteToken={this.props.handleDeleteToken} token={this.props.token} />
                <div class="container">
                    {this.state.status === "loading" ? <div className="mt-5 d-flex align-items-center justify-content-center "><div className="text-center nb-spinner"></div></div> : undefined}
                    <div class="row mt-5 ml-1 ">
                        {this.state.query.map((movie) => <Animation type="fadeIn"> <MovieCardFindMovie changeRating={this.changeRating} rating={movie.rating} type={movie.type} handleGetAllMovies={this.handleGetAllMovies} id={movie._id} key={movie.name} name={movie.name} year={movie.year} director={movie.director} plot={movie.plot} poster={movie.poster} dateToWatch={movie.dateToWatch} note={movie.note} watched={movie.watched} token={this.props.token} /> </Animation>)}
                    </div>
                </div>
            </div>
        )
    }
}
export default FindMovie