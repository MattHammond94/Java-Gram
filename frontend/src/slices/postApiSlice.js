import { apiSlice } from "./apiSlice";

const POST_URL = '/api/posts';

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (data) => ({
        url: `${POST_URL}/new`,
        method: 'POST',
        body: data
      }),
    }),
    getAPost: builder.query({
      query: () => `${POST_URL}/:id`,
    }),
    getAllPosts: builder.query({
      query: () => `${POST_URL}/all`,
    }),
    deletePost: builder.mutation({
      query: () => ({
        url: `${POST_URL}/:id`,
        method: 'DELETE',
      }),
    }),
    updatePostCaption: builder.mutation({
      query: (data) => ({
        url: `${POST_URL}/:id/updateCaption`,
        method: 'PUT',
        body: data
      }),
    }),
    addLikeToPost: builder.mutation({
      query: () => ({
        url: `${POST_URL}/:id/addLike`,
        method: 'PUT'
      }),
    }),
    addCommentToPost: builder.mutation({
      query: (data) => ({
        url: `${POST_URL}/:id/addComment`,
        method: 'PUT',
        body: data
      }),
    }),
    addImageToCloud: builder.mutation({
      query: (data) => ({
        url: `${POST_URL}/cloud`,
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
  useCreatePostMutation,
  useGetAPostQuery,
  useGetAllPostsQuery,
  useDeletePostMutation,
  useUpdatePostCaptionMutation,
  useAddLikeToPostMutation,  
  useAddCommentToPostMutation,
  useAddImageToCloudMutation
} = postsApiSlice;