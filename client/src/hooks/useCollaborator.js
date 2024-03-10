// useCollaborator.js
import { useState } from 'react';

export const useCollaborator = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const addCollaborator = async (email, name) => {
    setIsLoading(true);
    setError(null);
    console.log(email, name)

    try {
      // Your fetch logic here
      const response = await fetch('http://127.0.0.1:4000/api/notes/addUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name }),
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
