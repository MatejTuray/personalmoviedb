import React from 'react'

const HeaderPublic = () => {
    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark mdb-color darken-3">
                <a className="navbar-brand" href="#"><strong>PMDb</strong></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/signup">Sign Up</a>
                        </li>
                    </ul>
                 
                </div>
            </nav>


        </div>
    )
}
export default HeaderPublic;