import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ 
  baseUrl: process.env.NODE_ENV === 'production' ? 'https://java-gram-backend.onrender.com/api' : 'http://localhost:8888/api',
  prepareHeaders: (headers) => {
    headers.set('credentials', 'include');
    return headers;
  },
  credentials: "include"
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User', 'Post'],
  endpoints: (builder) => ({})
});