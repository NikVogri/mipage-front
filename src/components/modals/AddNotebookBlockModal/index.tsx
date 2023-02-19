import { Dispatch, SetStateAction, useState } from "react";
import { notebookblockTypes } from "config/notebook-block-types";
import { useCreateNotebookBlockMutation } from "features/notebook/notebookApi";

import LoadingButton from "components/UI/LoadingButton";
import Modal from "components/modals/BaseModal";
import SelectCard from "components/form/SelectCard";

import styles from "./AddNotebookBlockModal.module.scss";

interface AddNotebookModalProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	pageId: string;
	notebookId: string;
}

const AddNotebookBlockModal: React.FC<AddNotebookModalProps> = ({ isOpen, pageId, notebookId, setIsOpen }) => {
	const [selectedBlockType, setSelectedBlockType] = useState(notebookblockTypes[0].type);

	const [createNotebookBlock, { isLoading }] = useCreateNotebookBlockMutation();

	const handleAddNotebookBlock = async () => {
		await createNotebookBlock({ pageId, notebookId, type: selectedBlockType });
		setIsOpen(false);
	};

	return (
		<Modal isOpen={isOpen} setIsOpen={() => setIsOpen(true)} contentLabel="Let's start by adding a block!">
			<Modal.Head title="Let's start by adding a block!" closeModal={() => setIsOpen(false)} />

			<div className={styles.container}>
				<div className={styles.text}>
					<p>Your notebook is empty! To kick things off, let&apos;s first add a new block.</p>
				</div>
				<hr />

				<div className={styles.cards__container}>
					{notebookblockTypes.map((nbt) => (
						<SelectCard
							key={nbt.type}
							id={nbt.type}
							isActive={nbt.type === selectedBlockType}
							onSelect={() => setSelectedBlockType(nbt.type)}
							disabled={nbt.disabled}
						>
							<div
								className={`${styles.card__content} ${
									nbt.type === selectedBlockType ? styles.active : ""
								}`}
							>
								<span>{nbt.title}</span>
								{nbt.icon({ size: 64 })}
								<p>{nbt.subtitle}</p>
							</div>
						</SelectCard>
					))}
				</div>
			</div>

			<Modal.Footer>
				<div className={styles.btn__container}>
					<LoadingButton
						isLoading={isLoading}
						scheme="success"
						disabled={isLoading}
						delay={250}
						type="button"
						onClick={handleAddNotebookBlock}
					>
						Create
					</LoadingButton>
				</div>
			</Modal.Footer>
		</Modal>
	);
};

export default AddNotebookBlockModal;
