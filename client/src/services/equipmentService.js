import axios from 'axios';

const API_URL = 'http://localhost:5000/api/equipment';

export const getEquipment = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching equipment:', error);
        throw error;
    }
};

export const addEquipment = async (equipmentData) => {
    try {
        const response = await axios.post(API_URL, equipmentData);
        return response.data;
    } catch (error) {
        console.error('Error adding equipment:', error);
        throw error;
    }
};
