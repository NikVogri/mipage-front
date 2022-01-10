import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Todo, TodoItem } from "models";

export const todoApi = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BE_BASE_URL }),
	reducerPath: "todoApi",
	endpoints: (build) => ({
		getPageTodos: build.query<Todo[], { pageId: string; token: string }>({
			query: ({ token, pageId }) => ({
				url: `pages/${pageId}/todos`,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
		}),
		createTodoItem: build.mutation<TodoItem, { token: string; pageId: string; todoId: string; title: string }>({
			query: ({ title, token, pageId, todoId }) => {
				return {
					url: `pages/${pageId}/todos/${todoId}/todo-items`,
					body: { title },
					method: "POST",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				};
			},
			async onQueryStarted({ pageId, token }, { dispatch, queryFulfilled }) {
				try {
					const { data: createdTodoItem } = await queryFulfilled;
					dispatch(
						todoApi.util.updateQueryData("getPageTodos", { pageId, token }, (todoBlocks) => {
							const todoBlockToUpdate = todoBlocks.find((todo) => todo.id === createdTodoItem.todoId);
							if (!todoBlockToUpdate) return;

							todoBlockToUpdate.items?.unshift(createdTodoItem);
						})
					);
				} catch {}
			},
		}),
		updateTodoItem: build.mutation<
			TodoItem,
			{ token: string; title: string; pageId: string; todoId: string; completed: boolean; todoItemId: string }
		>({
			query: ({ completed, title, token, pageId, todoId, todoItemId }) => {
				return {
					url: `pages/${pageId}/todos/${todoId}/todo-items/${todoItemId}`,
					body: { completed, title },
					method: "PATCH",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				};
			},
			async onQueryStarted({ pageId, token, todoId }, { dispatch, queryFulfilled }) {
				try {
					const { data: updatedTodoItem } = await queryFulfilled;
					dispatch(
						todoApi.util.updateQueryData("getPageTodos", { pageId, token }, (todoBlocks) => {
							const todoBlockToUpdate = todoBlocks.find((todo) => todo.id === todoId);
							if (!todoBlockToUpdate) return;

							const todoItemToUpdate = todoBlockToUpdate.items?.find(
								(todoItem) => todoItem.id === updatedTodoItem.id
							);
							if (!todoItemToUpdate) return;

							todoItemToUpdate.completed = updatedTodoItem.completed;
							todoItemToUpdate.title = updatedTodoItem.title;
						})
					);
				} catch {}
			},
		}),
		removeTodoItem: build.mutation<TodoItem, { token: string; pageId: string; todoId: string; todoItemId: string }>(
			{
				query: ({ token, pageId, todoId, todoItemId }) => {
					return {
						url: `pages/${pageId}/todos/${todoId}/todo-items/${todoItemId}`,
						method: "DELETE",
						headers: {
							Authorization: `Bearer ${token}`,
						},
					};
				},
				async onQueryStarted({ todoItemId, todoId, pageId, token }, { dispatch, queryFulfilled }) {
					try {
						await queryFulfilled;
						dispatch(
							todoApi.util.updateQueryData("getPageTodos", { pageId, token }, (todoBlocks) => {
								const todoBlockToUpdate = todoBlocks.find((todo) => todo.id === todoId);
								if (!todoBlockToUpdate) return;

								todoBlockToUpdate.items = todoBlockToUpdate.items?.filter((i) => i.id !== todoItemId);
							})
						);
					} catch {}
				},
			}
		),
		removeTodoBlock: build.mutation<Todo, { token: string; pageId: string; todoId: string }>({
			query: ({ token, pageId, todoId }) => {
				console.log(token, pageId, todoId);
				return {
					url: `pages/${pageId}/todos/${todoId}`,
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				};
			},
			async onQueryStarted({ todoId, pageId, token }, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(
						todoApi.util.updateQueryData("getPageTodos", { pageId, token }, (todoBlocks) => {
							const todoBlockToRemove = todoBlocks.findIndex((todo) => todo.id === todoId);
							todoBlocks.splice(todoBlockToRemove, 1);
						})
					);
				} catch {}
			},
		}),
		createTodoBlock: build.mutation<Todo, { token: string; pageId: string; title: string; color: string }>({
			query: ({ title, color, token, pageId }) => {
				return {
					url: `pages/${pageId}/todos`,
					body: { title, color },
					method: "POST",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				};
			},
			async onQueryStarted({ pageId, token }, { dispatch, queryFulfilled }) {
				try {
					const { data: createdTodoBlock } = await queryFulfilled;
					dispatch(
						todoApi.util.updateQueryData("getPageTodos", { pageId, token }, (todoBlocks) => {
							todoBlocks.unshift(createdTodoBlock);
						})
					);
				} catch {}
			},
		}),
	}),
});

export const {
	useGetPageTodosQuery,
	useCreateTodoItemMutation,
	useUpdateTodoItemMutation,
	useRemoveTodoItemMutation,
	useRemoveTodoBlockMutation,
	useCreateTodoBlockMutation,
} = todoApi;
