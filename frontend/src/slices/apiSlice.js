import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: 'https://java-gram-backend.onrender.com/api' });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User', 'Post'],
  endpoints: (builder) => ({})
});