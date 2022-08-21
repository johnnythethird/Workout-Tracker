import { useState, useEffect } from "react"
import { useSignup } from "../hooks/useSignup"
import jwt_decode from "jwt-decode"

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {signup, error, isLoading} = useSignup()
  const [user, setUser] = useState({})

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID Token: " + response.credential)
    var userObject = jwt_decode(response.credential)
    console.log(userObject)
    setUser(userObject)
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
    client_id: "850967098018-j3ruboa1cpqrt339p5bjm2klof6nacb2.apps.googleusercontent.com",
    callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large"}
    );

  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault() // after a onSubmit, it will usually refresh the page, so lets prevent that

    await signup(email, password) // signup hook
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign up</h3>

      <label>Email:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      {/* disabled button if the loading is true */}
      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}

      <div className="googleSignIn">
        <div id="signInDiv"></div>
      </div>
    </form>
  )
}

export default Signup // export the signup for the app