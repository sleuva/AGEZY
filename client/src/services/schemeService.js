import axios from 'axios';

const API_URL = 'http://localhost:5000/api/schemes';

export const getSchemes = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching schemes:', error);
        throw error;
    }
};

export const addScheme = async (schemeData) => {
    try {
        const response = await axios.post(API_URL, schemeData);
        return response.data;
    } catch (error) {
        console.error('Error adding scheme:', error);
        throw error;
    }
};
