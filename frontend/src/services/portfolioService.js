// frontend/src/services/portfolioService.js
import http from './http-common.js';

export const getAllPortfolios = async () => {
    return await http.get('/portfolios');
};

export const getPortfolioById = async (id) => {
    const url = `/portfolios/${id}`;
    console.log('Requesting URL:', url); // Log the URL being requested
    try {
        return await http.get(url);
    } catch (error) {
        console.error('Error fetching portfolio data:', error);
        throw error;
    }
};
export const createPortfolio = async (portfolio) => {
    try {
        const response = await http.post('/portfolios', {...portfolio, invoices: []});
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
    try {
        console.log('Payload:', data); // Log the payload
        const response = await http.put(`/portfolios/${id}/tcea`, data);
        return response.data;
    } catch (error) {
        console.error('Error calculating TCEA:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const deletePortfolio = async (id) => {
    try {
        const response = await http.delete(`/portfolios/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting portfolio:', error);
        throw error;
    }
};