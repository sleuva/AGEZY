import axios from 'axios';

const API_URL = 'http://localhost:5000/api/labour';

export const getLabour = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching labour:', error);
        throw error;
    }
};

export const addLabour = async (labourData) => {
    try {
        const response = await axios.post(API_URL, labourData);
        return response.data;
    } catch (error) {
        console.error('Error adding labour:', error);
        throw error;
    }
};
