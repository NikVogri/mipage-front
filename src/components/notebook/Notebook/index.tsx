import { useGetNotebookQuery } from "features/notebook/notebookApi";
import { useRouter } from "next/router";

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

	return (
		<div>
			{data?.blocks.map((block) => (
				<NotebookBlock
					key={block.id}
					type={block.type}
					content={block.content}
					pageId={pageId}
					notebookId={router.query.n as string}
					id={block.id}
				/>
			))}

			<NotebookBlockDevider notebookId={router.query.n as string} pageId={pageId} />
		</div>
	);
};

export default Notebook;
