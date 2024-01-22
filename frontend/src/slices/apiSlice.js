import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ 
  baseUrl: 'https://java-gram-backend.onrender.com/api',
  prepareHeaders: (headers) => {
    headers.set('credentials', 'include');
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User', 'Post'],
  endpoints: (builder) => ({})
});