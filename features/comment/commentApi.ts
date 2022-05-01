import baseApi from "features/baseApi";
import { TodoItemComment } from "models";
import { toast } from "react-toastify";

export const commentsExtendedApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getTodoItemComments: build.query<
			{ total: number; comments: TodoItemComment[] },
			{ pageId: string; todoItemId: string; page: number }
		>({
			query: ({ pageId, todoItemId, page = 0 }) => ({
				url: `pages/${pageId}/todo-items/${todoItemId}/comments?page=${page}&size=10`,
			}),
		}),
		createTodoItemComment: build.mutation<TodoItemComment, { pageId: string; todoItemId: string; body: string }>({
			query: ({ pageId, body, todoItemId }) => ({
				url: `pages/${pageId}/todo-items/${todoItemId}/comments`,
				method: "POST",
				body: { body },
			}),
			async onQueryStarted({ pageId, todoItemId }, { dispatch, queryFulfilled }) {
				try {
					const { data: newComment } = await queryFulfilled;

					dispatch(
						commentsExtendedApi.util.updateQueryData(
							"getTodoItemComments",
							{ pageId, todoItemId, page: 1 },
							(commentsRes) => {
								commentsRes.comments.unshift(newComment);
							}
						)
					);
				} catch {
					toast.error("Could not post comment, please try again later");
				}
			},
		}),
	}),
});

export const { useGetTodoItemCommentsQuery, useLazyGetTodoItemCommentsQuery, useCreateTodoItemCommentMutation } =
	commentsExtendedApi;
