import axios from 'axios';

const API_URL = 'http://localhost:5000/api/dairy';

export const getDairyProducts = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching dairy products:', error);
        throw error;
    }
};

export const addDairyProduct = async (productData) => {
    try {
        const response = await axios.post(API_URL, productData);
        return response.data;
    } catch (error) {
        console.error('Error adding dairy product:', error);
        throw error;
    }
};
