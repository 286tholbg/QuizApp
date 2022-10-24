import React, {createContext, useState, useContext, useEffect, useTransition} from "react"
import Questions from '../components/Questions'
import {nanoid} from 'nanoid'
const Context = createContext()

function ContextProvider({children}){
    const [questions, setQuestiosn] = useState([])
    const [userAnswers, setUserAnswers] = useState([])
    const [showResults, setShowResults] = useState(false)

    const [formData, setFormData] = useState({
        amount: 6,
        category: "",
        difficulty: "",
        type: ""
    })

    const API_CATEGORY = formData.category === "any" ? "" : `&category=${formData.category}`
    const API_DIFFICULTY = formData.difficulty === "any" ? "" :  `&difficulty=${formData.difficulty}`;
    const API_TYPE = formData.type === "any" ? "" :  `&type=${formData.type}`;
    const API_URL = `https://opentdb.com/api.php?amount=${formData.amount}${API_CATEGORY}${API_DIFFICULTY}${API_TYPE}`

    function handleChange(event){
        event.preventDefault()
        const {name, value} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }
    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => {
                return setQuestiosn(data.results.map(item => {
                    return {
                        ...item, 
                        id: nanoid(),
                    }
                }))
            })
    }, [formData])
    
    function handleClick(questionId, value, correctAnswer){
        const savedUserAnswer = userAnswers.find(item => item.questionId === questionId)
        setUserAnswers(prevAnswers => {
            return(savedUserAnswer) ? 
                prevAnswers.map(item => {
                    return item.questionId === questionId ? 
                    {...item, chosenAnswer: value } : item
                }) :
                [...prevAnswers, {questionId: questionId, correctAnswer: correctAnswer, chosenAnswer: value}]
        })
    }

    function checkAnswers() {
        setShowResults(prev => !prev)
    }
    function countCorrectAnswers() {
        const correct = userAnswers.filter(item => item.correctAnswer === item.chosenAnswer)
        return correct.length
    }

    function endQuiz(){
        setFormData({})
    }

    return (
        <Context.Provider value={
            {
                formData, 
                questions,
                userAnswers,
                showResults,
                countCorrectAnswers,
                checkAnswers,
                setShowResults,
                handleClick,
                handleChange,
                setUserAnswers,
                endQuiz
            }
        }>
        {children}
        </Context.Provider>
    )
}

export {Context, ContextProvider}