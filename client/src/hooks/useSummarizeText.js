import { useState } from 'react';
import Swal from 'sweetalert2';

export const useSummarizeText = () => {
  const [isLoading, setIsLoading] = useState(false);

  const summarizeText = async (article) => {
    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:4000/api/summarize/summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ article }),
      });

      if (response.ok) {
        // Handle success
        const result = await response.json(); // Parse response body
        console.log("Server Result:", result); // Log the result
        localStorage.setItem('summarizedArticle', JSON.stringify(result.summarizedArticle));
        Swal.fire({
          text: "Article Summarized Successfully!",
          icon: "success",
        });
      } else {
        // Handle error
        const json = await response.json();
        console.error("Server Error:", json);
        throw new Error(json.error);
      }
    } catch (error) {
      // Handle fetch or JSON parsing errors
      console.error("An error occurred during summarization:", error);
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
      });
    } finally {
      // Reset loading state
      setIsLoading(false);
    }
  };

  return { summarizeText, isLoading };
};
