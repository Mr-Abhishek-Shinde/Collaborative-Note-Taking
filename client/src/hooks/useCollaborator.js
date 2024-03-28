// useCollaborator.js
import { useState } from 'react';

export const useCollaborator = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const addCollaborator = async (email, noteName) => {
    setIsLoading(true);
    setError(null);
    console.log(email, noteName);

    try {
      // Your fetch logic here
      const response = await fetch('http://127.0.0.1:4000/api/notes/addUserToNote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, noteName }),
    });

     
      const json = await response.json();
      console.log(json)

      if (!response.ok) {
        setIsLoading(false);
        setError(json.error);
       
      }

      if (response.ok) {
        setError(null);
        
      
      }
    } catch (error) {
      console.error( "Error ",error);
      setIsLoading(false);
      setError('An error occurred while adding collaborator.');
    }
  };

  return { addCollaborator, isLoading, error };
};
