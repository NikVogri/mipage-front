import { useEffect, useState } from "react";
import { useGetNotebookQuery } from "features/notebook/notebookApi";
import { useRouter } from "next/router";
import { NotebookBlock as INotebookBlock } from "models";
import { orderBlocks } from "helpers/notebookBlock";
import useAuth from "hooks/useAuth";

import NotebookBlock from "../NotebookBlock";
import NotebookBlockDevider from "../NotebookBlockDevider";
import NotebookBlockDraggable from "../NotebookBlockDraggable";
import AddNotebookBlockModal from "components/modals/AddNotebookBlockModal";
import LoadingWrapper from "components/UI/LoadingWrapper";

interface NotebookBlockProps {
	blocks?: INotebookBlock[];
	order?: string[];
	pageId: string;
	notebookId: string;
}

const NotebookBlocksList: React.FC<NotebookBlockProps> = ({ blocks = [], order = [], pageId, notebookId }) => {
	const [blockIsDragged, setBlockIsDragged] = useState(false);
	const { isAuth } = useAuth();

	let sortedBlocks: INotebookBlock[] = [];
	if (blocks.length && order.length) {
		sortedBlocks = orderBlocks(blocks, order);
	} else if (blocks.length) {
		sortedBlocks = blocks;
	}

	if (isAuth) {
		return (
			<div>
				{sortedBlocks.map((b) => (
					<div key={b.id}>
						<NotebookBlockDraggable
							notebookBlockId={b.id}
							onDragChange={(isDragged: boolean) => setBlockIsDragged(isDragged)}
						>
							<NotebookBlock
								type={b.type}
								content={b.content}
								pageId={pageId}
								notebookId={notebookId}
								id={b.id}
							/>
						</NotebookBlockDraggable>

						<NotebookBlockDevider
							previousBlockId={b.id}
							notebookId={notebookId}
							pageId={pageId}
							showDropzone={blockIsDragged}
						/>
					</div>
				))}
			</div>
		);
	}

	return (
		<div>
			{sortedBlocks.map((b) => (
				<NotebookBlock
					key={b.id}
					type={b.type}
					content={b.content}
					pageId={pageId}
					notebookId={notebookId}
					id={b.id}
				/>
			))}
		</div>
	);
};

interface NotebookProps {
	pageId: string;
}

const Notebook: React.FC<NotebookProps> = ({ pageId }) => {
	const [showModal, setShowModal] = useState(true);
	const { isAuth } = useAuth();

	const router = useRouter();
	const { data, isError, isLoading } = useGetNotebookQuery(
		{ pageId, notebookId: router.query.n as string, isAuth },
		{ skip: !router.query.n }
	);

	const notebookId = router.query.n as string;

	useEffect(() => {
		if (showModal !== true && isAuth) setShowModal(true);
	}, [notebookId]);

	if (isError) {
		// TODO: make this look better
		return (
			<div>
				<span>Something went wrong loading this page, please try again later.</span>
			</div>
		);
	}

	return (
		<>
			<LoadingWrapper delay={0} isLoading={isLoading}>
				<NotebookBlocksList blocks={data?.blocks} order={data?.order} notebookId={notebookId} pageId={pageId} />
			</LoadingWrapper>

			{data?.blocks?.length === 0 && isAuth && (
				<>
					<NotebookBlockDevider notebookId={notebookId} pageId={pageId} />
					<AddNotebookBlockModal
						isOpen={showModal}
						setIsOpen={setShowModal}
						notebookId={notebookId}
						pageId={pageId}
					/>
				</>
			)}
		</>
	);
};

export default Notebook;
