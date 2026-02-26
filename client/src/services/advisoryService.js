import axios from 'axios';

const API_URL = 'http://localhost:5000/api/advisory';

export const getCropRecommendation = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/crop-recommendation`, data);
        return response.data;
    } catch (error) {
        console.error('Error fetching crop recommendation:', error);
        throw error;
    }
};
