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
			{ title: string; pageId: string; todoId: string; completed: boolean; todoItemId: string }
		>({
			query: ({ completed, title, pageId, todoId, todoItemId }) => {
				return {
					url: `pages/${pageId}/todos/${todoId}/todo-items/${todoItemId}`,
					body: { completed, title },
					method: "PATCH",
				};
			},
			async onQueryStarted({ pageId, todoId }, { dispatch, queryFulfilled }) {
				try {
					const { data: updatedTodoItem } = await queryFulfilled;
					dispatch(
						todoExtendedApi.util.updateQueryData("getPageTodos", { pageId }, (todoBlocks) => {
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

					toast.success("Successfully removed todo item");
				} catch {
					toast.error("Could not remove todo item");
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

					toast.success("Successfully removed todo block");
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

					toast.success("Successfully created todo block");
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

							toast.success("Successfully updated todo block");
						})
					);
				} catch {
					toast.error("Could not update todo block");
				}
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
	useUpdateTodoBlockMutation,
} = todoExtendedApi;
