import baseApi from "features/baseApi";
import { TodoItemComment } from "models";

export const commentsExtendedApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getTodoItemComments: build.query<TodoItemComment[], { pageId: string; todoItemId: string }>({
			query: ({ pageId, todoItemId }) => ({
				url: `pages/${pageId}/todo-items/${todoItemId}/comments?size=10`,
			}),
		}),
	}),
});

export const { useGetTodoItemCommentsQuery } = commentsExtendedApi;
