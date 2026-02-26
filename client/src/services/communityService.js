import axios from 'axios';

const API_URL = 'http://localhost:5000/api/community';

export const getPosts = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};

export const addPost = async (postData) => {
    try {
        const response = await axios.post(API_URL, postData);
        return response.data;
    } catch (error) {
        console.error('Error adding post:', error);
        throw error;
    }
};

export const likePost = async (id) => {
    try {
        const response = await axios.put(`${API_URL}/${id}/like`);
        return response.data;
    } catch (error) {
        console.error('Error liking post:', error);
        throw error;
    }
};
