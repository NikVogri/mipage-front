import { useEffect, useState } from "react";
import { useGetNotebookQuery } from "features/notebook/notebookApi";
import { useRouter } from "next/router";
import { NotebookBlock as INotebookBlock } from "models";
import { orderBlocks } from "helpers/notebookBlock";

import NotebookBlock from "../NotebookBlock";
import LoadingSpinner from "components/UI/LoadingSpinner";
import NotebookBlockDevider from "../NotebookBlockDevider";
import NotebookBlockDraggable from "../NotebookBlockDraggable";
import AddNotebookBlockModal from "components/modals/AddNotebookBlockModal";

interface NotebookProps {
	pageId: string;
}

const Notebook: React.FC<NotebookProps> = ({ pageId }) => {
	const [showModal, setShowModal] = useState(true);
	const [blockIsDragged, setBlockIsDragged] = useState(false);

	const router = useRouter();
	const { data, isError, isLoading } = useGetNotebookQuery(
		{ pageId, notebookId: router.query.n as string },
		{ skip: !router.query.n }
	);

	const notebookId = router.query.n as string;

	useEffect(() => {
		if (showModal !== true) setShowModal(true);
	}, [notebookId]);

	if (isError) {
		// TODO: make this look better
		return (
			<div>
				<span>Something went wrong loading this page, please try again later.</span>
			</div>
		);
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
				<div key={block.id} style={{ height: "auto" }}>
					<NotebookBlockDraggable
						notebookBlockId={block.id}
						onDragChange={(isDragged: boolean) => setBlockIsDragged(isDragged)}
					>
						<NotebookBlock
							type={block.type}
							content={block.content}
							pageId={pageId}
							notebookId={notebookId}
							id={block.id}
						/>
					</NotebookBlockDraggable>

					<NotebookBlockDevider
						previousBlockId={block.id}
						notebookId={notebookId}
						pageId={pageId}
						showDropzone={blockIsDragged}
					/>
				</div>
			))}

			{blocks.length === 0 && (
				<>
					<NotebookBlockDevider notebookId={notebookId} pageId={pageId} />
					<AddNotebookBlockModal
						isOpen={showModal && blocks.length === 0}
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
