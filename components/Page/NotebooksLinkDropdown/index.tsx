import { useState } from "react";
import { SidebarNotebook } from "models";
import { truncate } from "helpers/stringTools";
import { BsBook } from "react-icons/bs";
import { HiPlus } from "react-icons/hi";

import Link from "next/link";
import AddNotebookModal from "components/UI/modals/AddNotebookModal";

import styles from "./NotebooksLinkDropdown.module.scss";

interface NotebooksLinkDropdownProps {
	pageId: string;
	notebooks: SidebarNotebook[];
	title: string;
	active: boolean;
	activeNotebookId?: string;
}

const NotebooksLinkDropdown: React.FC<NotebooksLinkDropdownProps> = ({
	pageId,
	notebooks,
	title,
	active,
	activeNotebookId,
}) => {
	const [showDropdown, setShowDropdown] = useState(false);
	const [showAddNotebookModal, setShowAddNotebookModal] = useState(false);

	return (
		<>
			<div className={`${styles.container} ${active ? styles.active : null}`}>
				<div className={styles.head}>
					<button onClick={() => setShowDropdown(!showDropdown)}>
						<div className={styles.title}>
							<BsBook size={18} />
							<h4>{truncate(title, 32)}</h4>
						</div>
					</button>
					{showDropdown && (
						<div className={styles.btn__settings__container}>
							<button title="Add a Notebook" onClick={() => setShowAddNotebookModal(true)}>
								<HiPlus size={16} />
							</button>
						</div>
					)}
				</div>

				<ul
					className={`${styles.dropdown_list} ${
						active || showDropdown || !notebooks.length ? styles.open : ""
					}`}
				>
					{!notebooks.length && <span>No notebooks yet, add one now!</span>}
					{notebooks.map((notebook) => (
						<li
							key={notebook.id}
							className={active && activeNotebookId === notebook.id ? styles.active : ""}
						>
							<Link href={`/pages/${pageId}?n=${notebook.id}`}>
								<a>{notebook.title}</a>
							</Link>
						</li>
					))}
				</ul>
			</div>
			<AddNotebookModal
				pageId={pageId}
				notebooksCount={notebooks.length}
				isOpen={showAddNotebookModal}
				setIsClosed={() => setShowAddNotebookModal(false)}
				setIsOpen={setShowAddNotebookModal}
			/>
		</>
	);
};

export default NotebooksLinkDropdown;
