import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Notebook, NotebookBlock } from "models";

export const notebookApi = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BE_BASE_URL }),
	reducerPath: "notebookApi",
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
						notebookApi.util.updateQueryData("getNotebook", { pageId, token, notebookId }, (notebook) => {
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
	}),
});

export const { useGetNotebookQuery, useUpdateNotebookBlockMutation } = notebookApi;
