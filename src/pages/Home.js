import React from "react"
import Settings from "./Settings"
import {Link} from 'react-router-dom'

function Home() {
    return (
        <div className="intro-screen">
            <h1 className="game-title">Quizzical</h1>
            <p className="game-description">Answer quizzical questions and test your knowledge in this online quiz game</p>
            <Link className="btn-link" to="/settings">Quiz Setup</Link>
        </div>
    )
}

export default Home