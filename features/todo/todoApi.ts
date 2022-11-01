import baseApi from "features/baseApi";
import { Todo, TodoItem } from "models";
import { toast } from "react-toastify";

export const todoExtendedApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getPageTodos: build.query<Todo[], { pageId: string }>({
			query: ({ pageId }) => ({
				url: `pages/${pageId}/todos`,
			}),
		}),
		getPublicPageTodos: build.query<Todo[], { pageId: string }>({
			query: ({ pageId }) => ({
				url: `pages/${pageId}/todos/public`,
			}),
		}),
		createTodoItem: build.mutation<TodoItem, { pageId: string; todoId: string; title: string }>({
			query: ({ title, pageId, todoId }) => {
				return {
					url: `pages/${pageId}/todos/${todoId}/todo-items`,
					body: { title },
					method: "POST",
				};
			},
			async onQueryStarted({ pageId }, { dispatch, queryFulfilled }) {
				try {
					const { data: createdTodoItem } = await queryFulfilled;
					dispatch(
						todoExtendedApi.util.updateQueryData("getPageTodos", { pageId }, (todoBlocks) => {
							const todoBlockToUpdate = todoBlocks.find((todo) => todo.id === createdTodoItem.todoId);
							if (!todoBlockToUpdate) return;

							todoBlockToUpdate.items?.push(createdTodoItem);
						})
					);
				} catch {
					toast.error("Could not update todo item");
				}
			},
		}),
		updateTodoItem: build.mutation<
			TodoItem,
			{ title?: string; description?: string; pageId: string; todoId: string; todoItemId: string }
		>({
			query: ({ title, description, pageId, todoId, todoItemId }) => {
				return {
					url: `pages/${pageId}/todos/${todoId}/todo-items/${todoItemId}`,
					body: { title, description },
					method: "PATCH",
				};
			},
			async onQueryStarted({ pageId, todoId, todoItemId }, { dispatch, queryFulfilled }) {
				try {
					const { data: updatedTodoItem } = await queryFulfilled;

					dispatch(
						todoExtendedApi.util.updateQueryData("getPageTodos", { pageId }, (pageTodos) => {
							const todoToUpdate = pageTodos.find((pt) => pt.id === todoId);
							if (!todoToUpdate) return;

							const todoItemToUpdate = todoToUpdate?.items?.find((tI) => tI.id === todoItemId);
							if (!todoItemToUpdate) return;

							todoItemToUpdate.description = updatedTodoItem.description;
							todoItemToUpdate.title = updatedTodoItem.title;
						})
					);

					dispatch(
						todoExtendedApi.util.updateQueryData(
							"getSingleTodoItem",
							{ pageId, todoId, todoItemId },
							(todoItem) => {
								todoItem.description = updatedTodoItem.description;
								todoItem.title = updatedTodoItem.title;
							}
						)
					);
				} catch {
					toast.error("Could not update todo item");
				}
			},
		}),
		removeTodoItem: build.mutation<TodoItem, { pageId: string; todoId: string; todoItemId: string }>({
			query: ({ pageId, todoId, todoItemId }) => {
				return {
					url: `pages/${pageId}/todos/${todoId}/todo-items/${todoItemId}`,
					method: "DELETE",
				};
			},
			async onQueryStarted({ todoItemId, todoId, pageId }, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(
						todoExtendedApi.util.updateQueryData("getPageTodos", { pageId }, (todoBlocks) => {
							const todoBlockToUpdate = todoBlocks.find((todo) => todo.id === todoId);
							if (!todoBlockToUpdate) return;

							todoBlockToUpdate.items = todoBlockToUpdate.items?.filter((i) => i.id !== todoItemId);
						})
					);
				} catch {
					toast.error("Could not remove todo item");
				}
			},
		}),
		completeTodoItem: build.mutation<TodoItem, { pageId: string; todoId: string; todoItemId: string }>({
			query: ({ pageId, todoId, todoItemId }) => {
				return {
					url: `pages/${pageId}/todos/${todoId}/todo-items/${todoItemId}/complete`,
					method: "PATCH",
				};
			},
			async onQueryStarted({ todoItemId, todoId, pageId }, { dispatch, queryFulfilled }) {
				try {
					const { data: updatedTodoItem } = await queryFulfilled;

					dispatch(
						todoExtendedApi.util.updateQueryData("getPageTodos", { pageId }, (todoBlocks) => {
							const todoBlockToUpdate = todoBlocks.find((todo) => todo.id === todoId);
							if (!todoBlockToUpdate) return;

							const todoBlockItemToUpdate = todoBlockToUpdate.items?.find((ti) => ti.id === todoItemId);
							if (!todoBlockItemToUpdate) return;

							todoBlockItemToUpdate.completed = updatedTodoItem.completed;
							todoBlockItemToUpdate.completedAt = updatedTodoItem.completedAt;
						})
					);

					dispatch(
						todoExtendedApi.util.updateQueryData(
							"getSingleTodoItem",
							{ pageId, todoId, todoItemId },
							(todoItem) => {
								todoItem.completed = updatedTodoItem.completed;
								todoItem.completedAt = updatedTodoItem.completedAt;
							}
						)
					);
				} catch {
					toast.error("Could not toggle complete todo");
				}
			},
		}),
		removeTodoBlock: build.mutation<Todo, { pageId: string; todoId: string }>({
			query: ({ pageId, todoId }) => {
				return {
					url: `pages/${pageId}/todos/${todoId}`,
					method: "DELETE",
				};
			},
			async onQueryStarted({ todoId, pageId }, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(
						todoExtendedApi.util.updateQueryData("getPageTodos", { pageId }, (todoBlocks) => {
							const todoBlockToRemove = todoBlocks.findIndex((todo) => todo.id === todoId);
							todoBlocks.splice(todoBlockToRemove, 1);
						})
					);
				} catch {
					toast.error("Could not remove todo block");
				}
			},
		}),
		createTodoBlock: build.mutation<Todo, { pageId: string; title: string; color: string }>({
			query: ({ title, color, pageId }) => {
				return {
					url: `pages/${pageId}/todos`,
					body: { title, color },
					method: "POST",
				};
			},
			async onQueryStarted({ pageId }, { dispatch, queryFulfilled }) {
				try {
					const { data: createdTodoBlock } = await queryFulfilled;
					dispatch(
						todoExtendedApi.util.updateQueryData("getPageTodos", { pageId }, (todoBlocks) => {
							todoBlocks.push(createdTodoBlock);
						})
					);
				} catch {
					toast.error("Could not create todo block");
				}
			},
		}),
		updateTodoBlock: build.mutation<Todo, { pageId: string; todoId: string; title: string; color: string }>({
			query: ({ title, color, pageId, todoId }) => {
				return {
					url: `pages/${pageId}/todos/${todoId}`,
					body: { title, color },
					method: "PATCH",
				};
			},
			async onQueryStarted({ todoId, pageId }, { dispatch, queryFulfilled }) {
				try {
					const { data: updatedTodoBlock } = await queryFulfilled;
					dispatch(
						todoExtendedApi.util.updateQueryData("getPageTodos", { pageId }, (todoBlocks) => {
							const todoBlockIndex = todoBlocks.findIndex((todo) => todo.id === todoId);
							if (todoBlockIndex < 0) return;

							todoBlocks[todoBlockIndex] = {
								...updatedTodoBlock,
								items: todoBlocks[todoBlockIndex].items,
							};
						})
					);
				} catch {
					toast.error("Could not update todo block");
				}
			},
		}),
		getSingleTodoItem: build.query<TodoItem, { pageId: string; todoId: string; todoItemId: string }>({
			query: ({ pageId, todoId, todoItemId }) => ({
				url: `pages/${pageId}/todos/${todoId}/todo-items/${todoItemId}`,
			}),
		}),
		getSinglePublicTodoItem: build.query<TodoItem, { pageId: string; todoId: string; todoItemId: string }>({
			query: ({ pageId, todoId, todoItemId }) => ({
				url: `pages/${pageId}/todos/${todoId}/todo-items/${todoItemId}/public`,
			}),
		}),
	}),
});

export const {
	useGetPageTodosQuery,
	useGetSingleTodoItemQuery,
	useGetSinglePublicTodoItemQuery,
	useCreateTodoItemMutation,
	useUpdateTodoItemMutation,
	useRemoveTodoItemMutation,
	useRemoveTodoBlockMutation,
	useCreateTodoBlockMutation,
	useUpdateTodoBlockMutation,
	useCompleteTodoItemMutation,
	useGetPublicPageTodosQuery,
} = todoExtendedApi;
