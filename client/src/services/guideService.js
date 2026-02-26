import axios from 'axios';

const API_URL = 'http://localhost:5000/api/guides';

export const getGuides = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching guides:', error);
        throw error;
    }
};

export const addGuide = async (guideData) => {
    try {
        const response = await axios.post(API_URL, guideData);
        return response.data;
    } catch (error) {
        console.error('Error adding guide:', error);
        throw error;
    }
};
