// frontend/src/services/userService.js
import http from './http-common.js';

export const signUp = async (user) => {
    return await http.post('/users/signup', user);
};

export const signIn = async (credentials) => {
    return await http.post('/users/signin', credentials);
};

export const getUserById = async (id) => {
    return await http.get(`/users/${id}`);
};

export const updateUserById = async (id, user) => {
    return await http.put(`/users/${id}`, user);
};

export const deleteUserById = async (id) => {
    return await http.delete(`/users/${id}`);
};