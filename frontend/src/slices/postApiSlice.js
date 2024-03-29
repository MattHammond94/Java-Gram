import { apiSlice } from "./apiSlice";

const POST_URL = '/posts';

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
      query: (id) => ({
        url: `${POST_URL}/${id}`
      }),
    }),
    getAllPosts: builder.query({
      query: () => `${POST_URL}/all`,
    }),
    getAllUsersPosts: builder.query({
      query: (userId) => ({
        url: `${POST_URL}/allUsersPosts/${userId}`
      }),
    }),
    deleteAllUsersPosts: builder.mutation({
      query: () => ({
        url: `${POST_URL}/allUsersPosts`,
        method: 'DELETE'
      }),
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `${POST_URL}/${id}`,
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
      query: (data) => ({
        url: `${POST_URL}/addLike`,
        method: 'PUT',
        body: data
      }),
    }),
    addCommentToPost: builder.mutation({
      query: (data) => ({
        url: `${POST_URL}/addComment`,
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
    removePostImageFromCloud: builder.mutation({
      query: (data) => ({
        url: `${POST_URL}/cloud`,
        method: 'DELETE',
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
  useGetAllUsersPostsQuery,
  useDeleteAllUsersPostsMutation,
  useDeletePostMutation,
  useUpdatePostCaptionMutation,
  useAddLikeToPostMutation,  
  useAddCommentToPostMutation,
  useAddImageToCloudMutation,
  useRemovePostImageFromCloudMutation
} = postsApiSlice;