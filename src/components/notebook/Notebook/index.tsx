import { useGetNotebookQuery } from "features/notebook/notebookApi";
import { useRouter } from "next/router";
import { NotebookBlock as INotebookBlock } from "models";
import { orderBlocks } from "helpers/notebookBlock";

import NotebookBlock from "../NotebookBlock";
import LoadingSpinner from "components/UI/LoadingSpinner";
import NotebookBlockDevider from "../NotebookBlockDevider";

interface NotebookProps {
	pageId: string;
}

const Notebook: React.FC<NotebookProps> = ({ pageId }) => {
	const router = useRouter();
	const { data, isError, error, isLoading } = useGetNotebookQuery(
		{ pageId, notebookId: router.query.n as string },
		{ skip: !router.query.n }
	);

	if (isError) {
		console.log(data, error);
	}

	if (isLoading) {
		return (
			<div>
				<LoadingSpinner />
			</div>
		);
	}

	let blocks: INotebookBlock[] = [];
	if (data?.blocks && data?.order) {
		blocks = orderBlocks(data.blocks, data.order);
	} else if (data?.blocks) {
		blocks = data.blocks;
	}

	return (
		<>
			{blocks.map((block) => (
				<div key={block.id}>
					<NotebookBlock
						type={block.type}
						content={block.content}
						pageId={pageId}
						notebookId={router.query.n as string}
						id={block.id}
					/>

					<NotebookBlockDevider
						previousBlockId={block.id}
						notebookId={router.query.n as string}
						pageId={pageId}
					/>
				</div>
			))}

			{blocks.length === 0 && <NotebookBlockDevider notebookId={router.query.n as string} pageId={pageId} />}
		</>
	);
};

export default Notebook;
