import React from "react"
import {Link} from 'react-router-dom'
import Form from "../components/Form"
import Home from './Home'
import Quiz from './Quiz'

function Settings() {
    return (
        <div>
            <Form />
            <div className="submit-btns">
                <Link className="start-btn" to="/quiz">Start Quiz</Link>
            </div>
        </div>
    )
}
export default Settings