import http from './http-common.js';

export const getAllInvoiceBills = async () => {
    return await http.get('/invoiceBills');
};

export const getInvoiceBillById = async (id) => {
    return await http.get(`/invoiceBills/${id}`);
};

export const getInvoiceBillsByPortfolioId = async (portfolioId) => {
    return await http.get(`/portfolio/${portfolioId}/invoiceBills`);
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

