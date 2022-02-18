import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
        <div className="container">
            <a className="navbar-brand" href="/">Coding Assestment</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" aria-current="page" href="#">Quiz A</a>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={`/quiz-b`}>Quiz B</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Navbar