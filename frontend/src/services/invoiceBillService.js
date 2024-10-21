// services/invoiceBillService.js
import http from './http-common.js';

export const getAllInvoiceBills = async () => {
    try {
        const response = await http.get('/invoiceBills');
        return response;
    } catch (error) {
        console.error('Error fetching invoice bills:', error);
        throw error;
    }
};

export const getInvoiceBillById = async (id) => {
    return await http.get(`/invoiceBills/${id}`);
};

export const getInvoiceBillsByPortfolioId = async (portfolioId) => {
    try {
        const response = await http.get(`/invoiceBills?portfolioId=${portfolioId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching invoices by portfolio ID:', error);
        throw error;
    }
};

export const createInvoiceBill = async (invoiceBill) => {
    return await http.post('/invoiceBills', invoiceBill);
};

export const updateInvoiceBill = async (id, invoiceBill) => {
    return await http.put(`/invoiceBills/${id}`, invoiceBill);
};

export const deleteInvoiceBill = async (id) => {
    return await http.delete(`/invoiceBills/${id}`);
};