import API from './api';

export const getCurrentUser = () => API.get('/users/me');
export const updateUser = (updateData) => API.put('/users/me', updateData);
