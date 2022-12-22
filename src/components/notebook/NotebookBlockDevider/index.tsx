import { useEffect, useRef, useState } from "react";

import { useCreateNotebookBlockMutation } from "features/notebook/notebookApi";
import { HiPlus } from "react-icons/hi";
import { NotebookBlockType } from "models";

import NotebookBlockDeviderMenu from "../NotebookBlockDeviderMenu";

import styles from "./NotebookBlockDevider.module.scss";

interface NotebookBlockDeviderProps {
	notebookId: string;
	pageId: string;
}

const NotebookBlockDevider: React.FC<NotebookBlockDeviderProps> = ({ pageId, notebookId }) => {
	const [createNotebookBlock] = useCreateNotebookBlockMutation();
	const [showMenu, setShowMenu] = useState(false);
	const wrapperRef = useRef<HTMLDivElement>(null);

	const handleAddNotebookBlock = async (type: NotebookBlockType) => {
		await createNotebookBlock({ pageId, notebookId, type });
		setShowMenu(false);
	};

	useEffect(() => {
		const clickHandler = (event: MouseEvent) => {
			if (!wrapperRef.current?.contains(event.target as Node)) {
				setShowMenu(false);
			}
		};

		addEventListener("click", clickHandler);
		return () => removeEventListener("click", clickHandler);
	}, []);

	return (
		<div ref={wrapperRef} className={styles.devider}>
			<div className={styles.devider__control} onClick={() => setShowMenu(true)}>
				<div className={`${styles.left__icon} ${showMenu ? styles.active : ""}`}>
					<HiPlus size={24} />
				</div>
				<div className={`${styles.right__line} ${showMenu ? styles.active : ""}`}></div>
			</div>
			<NotebookBlockDeviderMenu onSelect={handleAddNotebookBlock} show={showMenu} />
		</div>
	);
};

export default NotebookBlockDevider;
