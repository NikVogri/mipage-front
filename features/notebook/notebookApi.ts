import baseApi from "features/baseApi";
import { pageExtendedApi } from "features/page/pagesApi";
import { Notebook, NotebookBlock, NotebookBlockType } from "models";

export const notebookExtendedApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getNotebook: build.query<Notebook, { pageId: string; notebookId: string; token: string }>({
			query: ({ token, pageId, notebookId }) => ({
				url: `pages/${pageId}/notebooks/${notebookId}`,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
		}),
		updateNotebookBlock: build.mutation<
			NotebookBlock,
			{ pageId: string; notebookBlockId: string; notebookId: string; token: string; content: string }
		>({
			query: ({ token, pageId, notebookId, notebookBlockId, content }) => ({
				url: `pages/${pageId}/notebooks/${notebookId}/notebook-blocks/${notebookBlockId}`,
				method: "PATCH",
				body: { content },
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
			async onQueryStarted({ pageId, token, notebookId, notebookBlockId }, { dispatch, queryFulfilled }) {
				try {
					const { data: updatedNotebookBlock } = await queryFulfilled;
					dispatch(
						notebookExtendedApi.util.updateQueryData(
							"getNotebook",
							{ pageId, token, notebookId },
							(notebook) => {
								const notebookBlockIndex = notebook.blocks.findIndex(
									(block) => block.id === notebookBlockId
								);

								if (notebookBlockIndex < 0) return;

								notebook.blocks[notebookBlockIndex] = updatedNotebookBlock;
							}
						)
					);
				} catch {}
			},
		}),
		createNotebook: build.mutation<NotebookBlock, { pageId: string; token: string; title: string }>({
			query: ({ token, pageId, title }) => ({
				url: `pages/${pageId}/notebooks`,
				method: "POST",
				body: { title },
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
			async onQueryStarted({ token, pageId }, { dispatch, queryFulfilled }) {
				try {
					const { data: createdNotebook } = await queryFulfilled;

					dispatch(
						pageExtendedApi.util.updateQueryData("getSidebarPages", token, (sidebarPages) => {
							const pageIndex = sidebarPages.findIndex((page) => page.id === pageId);
							if (pageIndex < 0) return;

							sidebarPages[pageIndex].notebooks?.push({
								id: createdNotebook.id,
								title: createdNotebook.title,
							});
						})
					);
				} catch {}
			},
		}),
		createNotebookBlock: build.mutation<
			NotebookBlock,
			{ pageId: string; notebookId: string; token: string; type: NotebookBlockType }
		>({
			query: ({ token, pageId, notebookId, type }) => ({
				url: `pages/${pageId}/notebooks/${notebookId}/notebook-blocks`,
				method: "POST",
				body: { type },
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
			async onQueryStarted({ pageId, token, notebookId }, { dispatch, queryFulfilled }) {
				try {
					const { data: updatedNotebookBlock } = await queryFulfilled;
					dispatch(
						notebookExtendedApi.util.updateQueryData(
							"getNotebook",
							{ pageId, token, notebookId },
							(notebook) => {
								notebook.blocks.push(updatedNotebookBlock);
							}
						)
					);
				} catch {}
			},
		}),
	}),
});

export const {
	useGetNotebookQuery,
	useUpdateNotebookBlockMutation,
	useCreateNotebookBlockMutation,
	useCreateNotebookMutation,
} = notebookExtendedApi;
