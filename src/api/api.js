import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

export const registerUser = (data) => instance.post('/auth/register', data);
export const loginUser = (data) => instance.post('/auth/login', data);
export const logoutUser = () => instance.post('/auth/logout');
export const assignTicket = (id) => instance.put(`/tickets/assign/${id}`);
export const createTicket = (data) => instance.post('/tickets', data);
export const getMyTickets = () => instance.get('/tickets/my');
export const getAllTickets = () => instance.get('/admin/tickets');
export const resolveTicket = (id) => instance.put(`/tickets/resolve/${id}`);
export const getAllTicketsSupport = () => instance.get('/support/tickets');
export const assignTicketSupport = (id) => instance.put(`/support/tickets/assign/${id}`);
export const resolveTicketSupport = (id) => instance.put(`/support/tickets/resolve/${id}`);
export const registerSupport = (data) => instance.post('/admin/register-support', data);
export const getSupportStats = () => instance.get('/admin/stats');

export default instance;
