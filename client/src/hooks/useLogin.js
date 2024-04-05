import { useState } from 'react'
import Swal from 'sweetalert2';
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  // const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setIsLoading(true)
    // setError(null)

    const response = await fetch('http://192.168.56.1:4000/api/user/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      Swal.fire({
        title: "Error!",
        text: json.error,
        icon: "error"
      });
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false)

      Swal.fire({
        text: "Login Successful!",
        icon: "success"
      });
    }
  }

  return { login, isLoading }
}