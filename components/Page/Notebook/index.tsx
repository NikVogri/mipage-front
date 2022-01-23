import { useGetNotebookQuery } from "features/notebook/notebookApi";
import { useRouter } from "next/router";

import NotebookBlock from "../NotebookBlock";
import LoadingSpinner from "components/LoadingSpinner";
import CreateNotebookBlockDevider from "../CreateNotebookBlockDevider";

interface NotebookProps {
	pageId: string;
	token: string;
}

const Notebook: React.FC<NotebookProps> = ({ pageId, token }) => {
	const router = useRouter();
	const { data, isError, error, isLoading } = useGetNotebookQuery(
		{ pageId, token, notebookId: router.query.n as string },
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
					token={token}
					notebookId={router.query.n as string}
					id={block.id}
				/>
			))}

			<CreateNotebookBlockDevider notebookId={router.query.n as string} token={token} pageId={pageId} />
		</div>
	);
};

export default Notebook;
