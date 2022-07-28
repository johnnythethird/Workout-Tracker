import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'

function App() {
  const {user} = useAuthContext() // Grab the current user to see if they exist.

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route // This is the home element with the path. Only activates when a user is signed in.
              path="/" 
              element={user ? <Home /> : <Navigate to="/login" />} 
            />

            <Route // This is the login element with the path. Only activates when a user is not signed in.
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/" />} 
            />

            <Route // This is the signup element with the path. Only activates when a user is not signed in.
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/" />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App; // export the app in the index