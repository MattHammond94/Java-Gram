import { apiSlice } from "./apiSlice";

const COMMENTS_URL = '/comments';

export const commentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation({
      query: (data) => ({
        url: `${COMMENTS_URL}/new`,
        method: 'POST',
        body: data
      }),
    }),
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `${COMMENTS_URL}/${id}`,
        method: 'DELETE'
      }),
    }),
    deleteAllUsersComments: builder.mutation({
      query: () => ({
        url: `${COMMENTS_URL}/allUsers`,
        method: 'DELETE'
      }),
    }),
    updateComment: builder.mutation({
      query: (data) => ({
        url: `${COMMENTS_URL}/update`,
        method: 'PUT',
        body: data
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
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useDeleteAllUsersCommentsMutation,
  useUpdateCommentMutation
} = commentsApiSlice;