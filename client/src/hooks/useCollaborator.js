// useCollaborator.js
import { useState } from 'react';

export const useCollaborator = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const addCollaborator = async (id, name) => {
    setIsLoading(true);
    setError(null);

    try {
      // Your fetch logic here
      const response = await fetch('http://127.0.0.1:4000/api/notes/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name }),
      });

      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(json.error);
      }

      if (response.ok) {
        setError(null);
      }
    } catch (error) {
      console.error('Error adding collaborator:', error);
      setIsLoading(false);
      setError('An error occurred while adding collaborator.');
    }
  };

  return { addCollaborator, isLoading, error };
};
