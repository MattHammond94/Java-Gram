import { apiSlice } from "./apiSlice";

const USERS_URL = '/api/users';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/token`,
        method: 'POST',
        body: data
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/token/logout`,
        method: 'POST'
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation
} = usersApiSlice;