import React, {useContext} from "react"
import {Context} from "../utils/Context"
import QuizAnswerTypes from "../options/AnswerTypes"
import QuizCategory from "../options/Categories"
import QuizDifficulty from "../options/Difficulty"

function Form(){

    const {handleChange, formData} = useContext(Context)

    const categories = QuizCategory.options.map(option => {
        return (
            <option key={option.value} value={option.value}>
                {option.title}
            </option>
        )
    })

    const difficulty = QuizDifficulty.options.map(difficulty => {
        return (
            <option key={difficulty.level} value={difficulty.level}>
                {difficulty.levelTitle}
            </option>
        )
    })

    const quizType = QuizAnswerTypes.options.map(option => {
        return (
            <option key={option.type} value={option.type}>
                {option.typeTitle}
            </option>
        )
    })

    return (
        <div className="quiz-container">
            <form className="game-settings" method="post">
                <label htmlFor="numberOfQuestions">Number of Questions</label>
                <input className="form-input-fields"
                    type="number"
                    id="amount" 
                    name="amount"
                    min="6"
                    max="50"
                    placeholder="Number of questions"
                    defaultValue={formData.amount}
                    onChange={handleChange}
                />
                <label htmlFor="category">Category</label>
                <select
                    className="form-input-fields"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                >
                {categories}
                </select>
                <label htmlFor="difficulty">Difficulty</label>
                <select
                    className="form-input-fields"
                    id="difficulty"
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                >
                {difficulty}
                </select>
                <label htmlFor="type">Type</label>
                <select
                    className="form-input-fields last-select"
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                >
                {quizType}
                </select>
            </form>
        </div>
    )
}
export default Form