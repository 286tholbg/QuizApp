import React, {createContext, useState, useContext, useEffect} from "react"
import {nanoid} from 'nanoid'
const Context = createContext()

function ContextProvider({children}){
    const [questions, setQuestiosn] = useState([])
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

    console.log(formData)
    // https://opentdb.com/api.php?amount=6&category=9&difficulty=medium&type=multiple
    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => {
                return setQuestiosn(data.results.map(item => {
                    return {...item, id: nanoid(), isSelected: false}
                }))
            })
    }, [formData])

    // function startQuiz(){
    //     setFormData({
    //         amount: 6,
    //         category: "",
    //         difficulty: "",
    //         type: ""
    //     })
    // }
    console.log(questions)

    return (
        <Context.Provider value={{formData, questions, handleChange}}>
            {children}
        </Context.Provider>
    )
}

export {Context, ContextProvider}