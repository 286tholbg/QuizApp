import React from "react"
import {Routes, Route} from 'react-router-dom'
import Settings from "./pages/Settings"
import Quiz from "./pages/Quiz"
import Home from "./pages/Home"


function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/settings" element={<Settings />}></Route>
        <Route path="/quiz" element={<Quiz />}></Route>
      </Routes>

    </div>
  )
}

export default App;
