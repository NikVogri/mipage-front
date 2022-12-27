import baseApi from "features/baseApi";
import { pageExtendedApi } from "features/page/pagesApi";
import { Notebook, NotebookBlock, NotebookBlockType } from "models";
import { toast } from "react-toastify";

export const notebookExtendedApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getNotebook: build.query<Notebook, { pageId: string; notebookId: string }>({
			query: ({ pageId, notebookId }) => ({
				url: `pages/${pageId}/notebooks/${notebookId}`,
			}),
		}),
		updateNotebookBlock: build.mutation<
			NotebookBlock,
			{ pageId: string; notebookBlockId: string; notebookId: string; content: string }
		>({
			query: ({ pageId, notebookId, notebookBlockId, content }) => ({
				url: `pages/${pageId}/notebooks/${notebookId}/notebook-blocks/${notebookBlockId}`,
				method: "PATCH",
				body: { content },
			}),
			async onQueryStarted({ pageId, notebookId, notebookBlockId }, { dispatch, queryFulfilled }) {
				try {
					const { data: updatedNotebookBlock } = await queryFulfilled;
					dispatch(
						notebookExtendedApi.util.updateQueryData("getNotebook", { pageId, notebookId }, (notebook) => {
							const notebookBlockIndex = notebook.blocks.findIndex(
								(block) => block.id === notebookBlockId
							);

							if (notebookBlockIndex < 0) return;

							notebook.blocks[notebookBlockIndex] = updatedNotebookBlock;
						})
					);
				} catch {}
			},
		}),
		deleteNotebookBlock: build.mutation<
			NotebookBlock,
			{ pageId: string; notebookBlockId: string; notebookId: string }
		>({
			query: ({ pageId, notebookId, notebookBlockId }) => ({
				url: `pages/${pageId}/notebooks/${notebookId}/notebook-blocks/${notebookBlockId}`,
				method: "DELETE",
			}),
			async onQueryStarted({ pageId, notebookId, notebookBlockId }, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;

					dispatch(
						notebookExtendedApi.util.updateQueryData("getNotebook", { pageId, notebookId }, (notebook) => {
							notebook.blocks = notebook.blocks.filter((n) => n.id !== notebookBlockId);
						})
					);
				} catch {}
			},
		}),
		createNotebook: build.mutation<NotebookBlock, { pageId: string; title: string }>({
			query: ({ pageId, title }) => ({
				url: `pages/${pageId}/notebooks`,
				method: "POST",
				body: { title },
			}),
			async onQueryStarted({ pageId }, { dispatch, queryFulfilled }) {
				try {
					const { data: createdNotebook } = await queryFulfilled;

					dispatch(
						pageExtendedApi.util.updateQueryData("getSidebarPages", null, (sidebarPages) => {
							const pageIndex = sidebarPages.findIndex((page) => page.id === pageId);
							if (pageIndex < 0) return;

							sidebarPages[pageIndex].notebooks?.push({
								id: createdNotebook.id,
								title: createdNotebook.title,
							});
						})
					);
				} catch {
					toast.error("We weren't able to create your notebook. Please try again or contact support.");
				}
			},
		}),
		createNotebookBlock: build.mutation<
			{ block: NotebookBlock; order: string[] },
			{ pageId: string; notebookId: string; type: NotebookBlockType; previousBlockId?: string }
		>({
			query: ({ pageId, notebookId, type, previousBlockId }) => ({
				url: `pages/${pageId}/notebooks/${notebookId}/notebook-blocks`,
				method: "POST",
				body: { type, previousBlockId },
			}),
			async onQueryStarted({ pageId, notebookId }, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;

					dispatch(
						notebookExtendedApi.util.updateQueryData("getNotebook", { pageId, notebookId }, (notebook) => {
							notebook.blocks.push(data.block);
							notebook.order = data.order;
						})
					);
				} catch {
					toast.error("We weren't able to create your notebook block. Please try again or contact support.");
				}
			},
		}),
	}),
});

export const {
	useGetNotebookQuery,
	useUpdateNotebookBlockMutation,
	useCreateNotebookBlockMutation,
	useCreateNotebookMutation,
	useDeleteNotebookBlockMutation,
} = notebookExtendedApi;
