// services/portfolioService.js
import http from './http-common.js';

export const getAllPortfolios = async () => {
    return await http.get('/portfolios');
};

export const getPortfolioById = async (id) => {
    return await http.get(`/portfolios/${id}`);
};

export const createPortfolio = async (portfolio) => {
    try {
        const response = await http.post('/portfolios', portfolio);
        return response.data;
    } catch (error) {
        console.error('Error creating portfolio:', error);
        throw error;
    }
};

export const updatePortfolio = async (id, portfolio) => {
    return await http.put(`/portfolios/${id}`, portfolio);
};

export const calculateTceaForPortfolio = async (id, data) => {
    return await http.put(`/portfolios/${id}/tcea`, data);
};

export const deletePortfolio = async (id) => {
    return await http.delete(`/portfolios/${id}`);
};
