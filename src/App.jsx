import React from 'react'
import Home from './pages/Home'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const App = () => {
  return (
    <main>
       <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='/*'
            element={
              <>
                <Routes>

                </Routes>
              </>
            }
          />
        </Routes>
      </Router>
    </main>
  )
}

export default App
