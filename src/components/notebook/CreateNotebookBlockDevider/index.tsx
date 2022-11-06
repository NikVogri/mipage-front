import { useEffect, useRef, useState } from "react";

import { useCreateNotebookBlockMutation } from "features/notebook/notebookApi";
import { MdOutlineTextFields, MdCode, MdImage } from "react-icons/md";
import { NotebookBlockType } from "models";

import styles from "./CreateNotebookBlockDevider.module.scss";

interface CreateNotebookBlockDeviderProps {
	notebookId: string;
	pageId: string;
}

const CreateNotebookBlockDevider: React.FC<CreateNotebookBlockDeviderProps> = ({ pageId, notebookId }) => {
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
		<div ref={wrapperRef}>
			<div className={styles.line}>
				<button onClick={() => setShowMenu(!showMenu)}>| New Block |</button>
			</div>
			<div className={`${styles.head} ${showMenu ? styles.active : ""}`}>
				<button onClick={() => handleAddNotebookBlock(NotebookBlockType.richText)}>
					<MdOutlineTextFields size={26} />
				</button>
				<button onClick={() => handleAddNotebookBlock(NotebookBlockType.code)}>
					<MdCode size={26} />
				</button>
				<button onClick={() => handleAddNotebookBlock(NotebookBlockType.image)}>
					<MdImage size={26} />
				</button>
			</div>
		</div>
	);
};

export default CreateNotebookBlockDevider;
