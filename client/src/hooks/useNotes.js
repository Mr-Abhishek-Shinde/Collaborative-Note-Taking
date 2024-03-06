import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useNotes = () =>{
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const notes = async(data) => {
        setIsLoading(true)
        setError(null)
        console.log("Below data")
        console.log(JSON.stringify({data}))
    const response = await fetch('http://127.0.0.1:4000/api/notes/note', {
        method : 'POST',
        headers : {'Content-Type': 'application/json'},
        body: JSON.stringify({ data })
    })

    const json = await response.json()

    console.log(response);
    if (!response.ok) {
    console.log({error})
      setIsLoading(false)
      setError(json.error)
    }
    if(response.ok){
        setError(null);
    }

    }
    return { notes, isLoading, error }
} 