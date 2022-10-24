import React, {useContext} from "react"
import {Context} from "../utils/Context"
import {Link} from 'react-router-dom'
import Questions from "../components/Questions"


function Quiz() {
    const {
        questions, 
        userAnswers,
        showResults,
        formData,
        handleClick,
        checkAnswers,
        countCorrectAnswers,
        endQuiz
    } = useContext(Context)

    const questionsElements = questions.map(item => {
        const chosen = userAnswers.find(answers => answers.questionId === item.id)
        return (
            <Questions
                key={item.id}
                userChoice={chosen && chosen.chosenAnswer}
                handleClick={handleClick}
                showResults={showResults}
                {...item}
            />
        )
    })
    return (
        <div className="quiz-container">
            {questionsElements}
            <div>
                {!showResults && <button className="check-answers-btn" onClick={checkAnswers}>Check Answers</button>}
                {showResults && <div className="result-container">
                    <h3 className="end-message">You scored {countCorrectAnswers()}/{formData.amount} correct answers</h3>
                    <Link className="play-again-btn" to="/" onClick={() => endQuiz()}>Play Again</Link>
                </div>}
            </div>
        </div>
    )
}
export default Quiz