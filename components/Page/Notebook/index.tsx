import { useGetNotebookQuery } from "features/notebook/notebookApi";
import { selectNeedsSync, setNeedsSync } from "features/page/pagesSlice";
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { useRouter } from "next/router";

import useWarnBeforePathChange from "hooks/useWarnBeforePathChange";

import NotebookBlock from "../NotebookBlock";
import LoadingSpinner from "components/LoadingSpinner";

interface NotebookProps {
	pageId: string;
	token: string;
}

const Notebook: React.FC<NotebookProps> = ({ pageId, token }) => {
	const needsSync = useAppSelector(selectNeedsSync);
	const dispatch = useAppDispatch();

	useWarnBeforePathChange(needsSync, () => {
		const userConfirmed = confirm("You have unsaved changes. Are you sure you want to leave this page?");

		if (userConfirmed) {
			dispatch(setNeedsSync(false));
		}

		return userConfirmed;
	});
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
		</div>
	);
};

export default Notebook;
