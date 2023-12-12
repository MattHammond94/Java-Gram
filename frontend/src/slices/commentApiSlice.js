import { apiSlice } from "./apiSlice";

const COMMENTS_URL = '/api/comments';

export const commentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation({
      query: (data) => ({
        url: `${COMMENTS_URL}/new`,
        method: 'POST',
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
} = commentsApiSlice;