// frontend/src/services/bankService.js
import http from './http-common.js';

export const getAllBanks = async () => {
    try {
        const response = await http.get('/banks');
        return Array.isArray(response.data) ? response.data : []; // Ensure response is an array
    } catch (error) {
        console.error('Error fetching banks:', error);
        return []; // Return an empty array on error
    }
};

export const getBankById = async (id) => {
    return await http.get(`/banks/${id}`);
};

export const createBank = async (bank) => {
    return await http.post('/banks', bank);
};

export const updateBank = async (id, bank) => {
    return await http.put(`/banks/${id}`, bank);
};

export const deleteBank = async (id) => {
    return await http.delete(`/banks/${id}`);
};

export const addCommissionToBank = async (id, commission) => {
    return await http.post(`/banks/${id}/commissions`, commission);
};

export const updateCommissionOfBank = async (id, commissionId, commission) => {
    return await http.put(`/banks/${id}/commissions/${commissionId}`, commission);
};

export const deleteCommissionOfBank = async (id, commissionId) => {
    return await http.delete(`/banks/${id}/commissions/${commissionId}`);
};