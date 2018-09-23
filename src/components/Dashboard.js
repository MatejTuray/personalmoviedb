import ReactHoverObserver from 'react-hover-observer';
import TextArea from "./Textarea";
import React from 'react'
import axios from "axios";
import HeaderPrivate from './HeaderPrivate';
import MovieCardDashboard from './MovieCardDashboard';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';
import moment from "moment";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Animation } from "mdbreact";



let options = [
    {
        label: 'Type', options: [
            { value: "", label: "All", group: "type" },
            { value: 'movie', label: 'Movies', group: "type" },
            { value: 'series', label: 'Tv Shows', group: "type" },]
    },
    {
        label: 'Watched', options: [
            { value: "", label: "All", group: "watched" },
            { value: 'true', label: 'Watched', group: "watched" },
            { value: 'false', label: 'Not watched', group: "watched" },]
    },

]

let sortOptions = ['Year', 'Title', 'Rating']

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.handleGetAllMovies = this.handleGetAllMovies.bind(this);
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.filterData = this.filterData.bind(this)
        this.handleNumberChange = this.handleNumberChange.bind(this)
        this.sortByAsc = this.sortByAsc.bind(this)
        this.sortByDesc = this.sortByDesc.bind(this)
        this.handleTextSelectChange = this.handleTextSelectChange.bind(this)
        this.toggle = this.toggle.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this)
        this.handleSortSubmit = this.handleSortSubmit.bind(this)
        this.toggleFilters = this.toggleFilters.bind(this)
        this.imgClickTest = this.imgClickTest.bind(this)
        this.onMouseOut = this.onMouseOut.bind(this)

        this.state = {
            data: [],
            updating: false,
            selectedOption: undefined,
            yearFilter: "",
            sortBy: "Option",
            dropdownOpen: false,
            isActive: false,
            order: "Ascending",
            visible: false,
            currentPick: [],
            isLoading: false,

        }
    }
    componentDidMount() {
        this.handleGetAllMovies()

    }
    handleChange(selectedOption) {
        this.setState({ selectedOption });
    }

    filterData(type, watched, year) {
           this.setState({
            isLoading: true,
        })
        axios({
            method: 'POST', url: 'https://peaceful-oasis-31467.herokuapp.com/https://guarded-chamber-92596.herokuapp.com/movies/filter/', headers: {
                "x-auth": this.props.token
            }, data: {
                watched: watched,
                type: type,
                year: year,
            }
        }).then((response) => {
            this.setState({
                data: response.data.movies,
                isLoading: false,

            }); this.setState({
                selectedOption: null
            });
        }).catch((err) => console.log(err))
    }
    handleNumberChange(e) {
        let year = e.target.value
        this.setState({
            yearFilter: year
        })

    }
    handleSubmit(e) {
        e.preventDefault()
        let type
        let watched
        let year = this.state.yearFilter

        if (this.state.selectedOption) {
            if (this.state.selectedOption.length === 2) {
                if ((this.state.selectedOption[0].value !== "" && this.state.selectedOption[1].value !== "") && (this.state.selectedOption[0].group === this.state.selectedOption[1].group)) {
                    type = ""
                    watched = ""

                }
                else if ((this.state.selectedOption[0].value === "" || this.state.selectedOption[1].value === "") && (this.state.selectedOption[0].group === this.state.selectedOption[1].group)) {
                    if ((this.state.selectedOption[0].value === "") && (this.state.selectedOption[1].value === "movie" || this.state.selectedOption[1].value === "series")) {
                        type = this.state.selectedOption[1].value
                        watched = this.state.selectedOption[0].value
                    }
                    else if ((this.state.selectedOption[0].value === "") && (this.state.selectedOption[1].value === "true" || this.state.selectedOption[1].value === "false")) {
                        watched = this.state.selectedOption[1].value
                        type = this.state.selectedOption[0].value
                    }
                    else if ((this.state.selectedOption[1].value === "") && (this.state.selectedOption[0].value === "movie" || this.state.selectedOption[0].value === "series")) {
                        type = this.state.selectedOption[0].value
                        watched = this.state.selectedOption[1].value
                    }
                    else if ((this.state.selectedOption[1].value === "") && (this.state.selectedOption[0].value === "true" || this.state.selectedOption[0].value === "false")) {
                        type = this.state.selectedOption[1].value
                        watched = this.state.selectedOption[0].value
                    }

                }
                else if (this.state.selectedOption[0].value === "" || this.state.selectedOption[0].value === "movie" || this.state.selectedOption[0].value === "series") {
                    type = this.state.selectedOption[0].value
                    watched = this.state.selectedOption[1].value
                }
                else if (this.state.selectedOption[1].value === "" || this.state.selectedOption[1].value === "movie" || this.state.selectedOption[1].value === "series") {
                    type = this.state.selectedOption[1].value
                    watched = this.state.selectedOption[0].value
                }


                this.filterData(type, watched, year)



            }
            else if ((this.state.selectedOption.length === 1) && (this.state.selectedOption[0].value === "" || this.state.selectedOption[0].value === "movie" || this.state.selectedOption[0].value === "series")) {
                type = this.state.selectedOption[0].value
                watched = ""

                this.filterData(type, watched, year)
            }
            else if ((this.state.selectedOption.length === 1) && (this.state.selectedOption[0].value === "true" || this.state.selectedOption[0].value === "false" || this.state.selectedOption[0].value === "")) {

                watched = this.state.selectedOption[0].value
                type = ""

                this.filterData(type, watched, year)
            }
            else if (this.state.selectedOption.length > 2) {
                alert("Please select only two different parameters")
            }

            else {
                type = ""
                watched = ""
                this.filterData(type, watched, year)
            }

        }
        else {
            type = ""
            watched = ""
            this.filterData(type, watched, year)

        }


    }
    handleGetAllMovies() {
        this.setState({
            isLoading: true,
        })
        axios({
            method: 'GET', url: 'https://peaceful-oasis-31467.herokuapp.com/https://guarded-chamber-92596.herokuapp.com/movies/', headers: {
                "x-auth": this.props.token
            }
        }).then((response) => {
            ; this.setState({
                data: response.data.movies,
                isLoading: false,


            });

        }).catch((err) => console.log(err))


    }

    sortByAsc(sortBy) {
        let sortpar = sortBy.toLowerCase()
        if (sortpar === "year") {
            this.setState({
                data: this.state.data.sort((a, b) => { return a.year > b.year })
            })
        }
        else if (sortpar === "rating") {
            this.setState({
                data: this.state.data.sort((a, b) => { return a.rating > b.rating })
            })
        }
        else if (sortpar === "title") {
            this.setState({
                data: this.state.data.sort((a, b) => { return a.name > b.name })
            })
        }
    }
    sortByDesc(sortBy) {
        let sortpar = sortBy.toLowerCase()
        if (sortpar === "year") {
            this.setState({
                data: this.state.data.sort((a, b) => { return a.year < b.year })
            })
        }
        else if (sortpar === "rating") {
            this.setState({
                data: this.state.data.sort((a, b) => { return a.rating < b.rating })
            })
        }
        else if (sortpar === "title") {
            this.setState({
                data: this.state.data.sort((a, b) => { return a.name < b.name })
            })
        }
    }


    handleTextSelectChange(e) {
        let sortBy = e.target.textContent
        this.setState({
            sortBy: sortBy,
            isActive: true,
        })
        return sortBy

    }
    handleSortSubmit(e) {
         this.setState({
            isLoading: true,
        })
        e.preventDefault()

        if (this.state.order === "Ascending") {
            this.sortByAsc(this.state.sortBy);
             this.setState({
            isLoading: false,
        })

        }
        else if (this.state.order === "Descending") {
            this.sortByDesc(this.state.sortBy)

        }
    }


    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
    onSelectChange(e) {
        let order = e.target.value
        this.setState({
            order,
        })
    }
    toggleFilters() {
        this.setState({
            visible: !this.state.visible
        })
    }
    imgClickTest(e) {
        let src = e.target.src
        this.setState((prevState) => ({
            currentPick: [].concat(this.state.data.find((movie) => src === movie.poster))
        }))

    }
    onMouseOut(e) {
        this.setState({
            currentPick: []
        })
    }

    render() {
        const { selectedOption } = this.state;
        let currentyear = moment().format("YYYY")

        return (
            <div>
                <HeaderPrivate username={this.props.username} query={this.props.query} handleReturn={this.props.handleReturn} handleDeleteToken={this.props.handleDeleteToken} token={this.props.token} />

                <div className="container">
                    <div className="d-flex justify-content-center mt-2">
                        <button className="btn btn-primary w-100" onClick={this.toggleFilters}>Show/hide filters <span className="ml-2"><i className="fas fa-caret-square-down"></i></span></button>
                    </div>
                </div>

                <div className="container-fluid">
                    {this.state.visible ? <Animation type="fadeIn">
                        <div className="container">
                            <h5 className="text-black mt-2">Filters:</h5>
                            <form onSubmit={(e) => this.handleSubmit(e)}>
                                <div className="form-row align-items-space-around mb-2">
                                    <div id="select" className="col-lg-6 h-100 w-100 mt-2 col-sm-12">
                                        <Select
                                           
                                            closeMenuOnSelect={true}
                                            components={makeAnimated()}
                                            options={options}
                                            value={this.state.selectedOption}
                                            onChange={this.handleChange}
                                            isMulti={true}

                                        />
                                    </div>
                                    <div className="col-lg-3 mt-2 col-sm-12">
                                        <input value={this.state.yearFilter} className="w-100 p-2" id="number-filter" onChange={this.handleNumberChange} type="number" placeholder="Year" minLength={4} min={1940} maxLength={4} max={currentyear} />
                                    </div>
                                    <div className="col-lg-3 col-sm-12">
                                        <button id="btn-filter" className="btn btn-primary w-100">Filter</button>
                                    </div>
                                </div>
                            </form>
                            <h5 className="text-black mt-2 mb-2">Sort results by:

                </h5>
                            <form onSubmit={(e) => this.handleSortSubmit(e)}>
                                <div className="form-row align-items-space-around mb-2">
                                    <div class="col-lg-6 h-100 w-100 mt-2 col-sm-12">
                                        <select className="form-control form-control" onChange={this.onSelectChange} value={this.state.order}>
                                            <option>
                                                Ascending
                       </option>
                                            <option>
                                                Descending
                       </option>
                                        </select>
                                    </div>
                                    <div class="col-lg-3 mt-2 col-sm-12 w-100">
                                        <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                            <DropdownToggle id="dropdown-button" caret>
                                                {this.state.sortBy}
                                            </DropdownToggle>
                                            <DropdownMenu className="w-100">
                                                <DropdownItem header>Sort by:</DropdownItem>
                                                <DropdownItem active={this.state.isActive && this.state.sortBy === "Year"} onClick={this.handleTextSelectChange}>Year</DropdownItem>
                                                <DropdownItem active={this.state.isActive && this.state.sortBy === "Title"} onClick={this.handleTextSelectChange}>Title</DropdownItem>
                                                <DropdownItem active={this.state.isActive && this.state.sortBy === "Rating"} onClick={this.handleTextSelectChange}>Rating</DropdownItem>
                                                <DropdownItem divider></DropdownItem>
                                            </DropdownMenu>
                                        </ButtonDropdown>
                                    </div>
                                    <div class="col-lg-3 col-sm-12">
                                        <button id="btn-sort" className="btn w-100">Sort</button>
                                    </div>
                                </div>
                            </form>

                        </div></Animation> : undefined}
{this.state.isLoading === true ? <div className="mt-5 d-flex align-items-center justify-content-center "><div className="nb-spinner"></div></div> : undefined}
                    <div className="mr-2 ml-2 row">
                     
                        <div className="col-lg-4 col-sm-6">
                            {this.state.currentPick.map((movie) => <TextArea rating={movie.rating} type={movie.type} handleGetAllMovies={this.handleGetAllMovies} id={movie._id} key={movie.name} name={movie.name} year={movie.year} director={movie.director} plot={movie.plot} poster={movie.poster} dateToWatch={movie.dateToWatch} note={movie.note} watched={movie.watched} />)}
                        </div>

                        <div className="col-lg-8 col-sm-6">

                            <div id="scrollable" className="row align-items-center">
                           
                                {this.state.data.map((movie) => <Animation type="fadeIn"> <ReactHoverObserver className="col-lg-12 col-sm-12"> <MovieCardDashboard movies={this.state.data} handleReturn={this.props.handleReturn} onMouseOut={this.onMouseOut} imgClickTest={this.imgClickTest} rating={movie.rating} type={movie.type} handleGetAllMovies={this.handleGetAllMovies} id={movie._id} key={movie.name} name={movie.name} year={movie.year} director={movie.director} plot={movie.plot} poster={movie.poster} dateToWatch={movie.dateToWatch} note={movie.note} watched={movie.watched} token={this.props.token} /> </ReactHoverObserver> </Animation>)}
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        )
    }
}





export default Dashboard