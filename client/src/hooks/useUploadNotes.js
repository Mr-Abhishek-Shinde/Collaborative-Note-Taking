import { useState } from 'react';

export const useUploadNotes = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getNotes = async (email) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://127.0.0.1:4000/api/notes/getnotes?email=${email}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            const json = await response.json();

            if (!response.ok) {
                throw new Error(json.error || 'Failed to fetch notes');
            }

            // Assuming the response contains an array of notes
            console.log(json)
            return json;

        } catch (error) {
            setError(error.message || 'An error occurred while fetching notes.');
        } finally {
            setIsLoading(false);
        }
    };

    return { getNotes, isLoading, error };
};
