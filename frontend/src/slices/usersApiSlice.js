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
    createUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/new`,
        method: 'POST',
        body: data
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/user`,
        method: 'PUT',
        body: data
      }),
    }),
    deleteUser: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/user`,
        method: 'DELETE',
      }),
    }),
    getUserInfo: builder.query({
      query: () => `${USERS_URL}/user`
    }),
    getSelectedUserInfo: builder.query({
      query: (username) => ({
        url: `${USERS_URL}/${username}`
      }),
    }),
    checkUsername: builder.query({
      query: (username) => ({
        url: `${USERS_URL}/checkUsername/${username}`
      }),
    }),
  }),
  onError: (error) => {
    if (error.data && error.data.message) {
      return 'Unable to connect to the server at this time.'
    } else {
      return 'An error occured. Please try again';
    }
  }
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetSelectedUserInfoQuery,
  useGetUserInfoQuery,
  useCheckUsernameQuery
} = usersApiSlice;