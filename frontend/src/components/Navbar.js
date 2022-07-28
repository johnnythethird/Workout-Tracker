import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

// This navbar is going to be the header of the website.
const Navbar = () => {
  const {logout} = useLogout() // grab the logout hook
  const {user} = useAuthContext() // grab the current user if they exist

  const handleClick = () => {
    logout() // use the logout function
  }

  return (
    <header>
      <div className="container">
        <Link to="/"> 
          <h1>Workout Buddy</h1>
        </Link>
        <nav>
          {/* If the user exists, use this format! */}
          {user && (
          <div>
            <span>{user.email}</span>
            <button onClick={handleClick}>Log out</button>
          </div>
          )}
          {/* If no user, then use this instead */}
          {!user && (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar // export the navbar for the app