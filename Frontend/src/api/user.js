import API from './api';

export const getCurrentUser = () =>
    API.get('/users/me');

export const updateUser = (updateData) =>
    API.put('/users/me', updateData);

export const changePassword = (passwordData) =>
    API.put('/users/change-password', passwordData);

export const forgotPassword = (email) =>
    API.post('/users/forgot-password', { email });

export const resetPassword = (token, newPassword) =>
    API.put(`/users/reset-password/${token}`, { newPassword });
