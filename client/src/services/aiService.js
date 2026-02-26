import axios from 'axios';

const API_URL = 'http://localhost:5000/api/ai';

export const getChatResponse = async (message) => {
    try {
        const response = await axios.post(`${API_URL}/chat`, { message });
        return response.data;
    } catch (error) {
        console.error('Error fetching chat response:', error);
        // Fallback for demo if backend fails or key is missing
        return { reply: "I'm currently offline or the AI service is unavailable. Please try again later." };
    }
};
