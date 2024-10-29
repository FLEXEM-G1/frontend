// frontend/src/services/userService.js
import http from './http-common.js';

export const signUp = async (userData) => {
    const response = await http.post('/users/signup', userData);
    localStorage.setItem('id', response.data._id);
    return response;
};
export const signIn = async (credentials) => {
    return await http.post('/users/signin', credentials);
};

export const getUserById = async (userId) => {
    return await http.get(`/users/${userId}`);
};

export const updateUserById = async (id, user) => {
    return await http.put(`/users/${id}`, user);
};

export const deleteUserById = async (id) => {
    return await http.delete(`/users/${id}`);
};