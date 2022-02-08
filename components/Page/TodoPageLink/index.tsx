import { BsCardChecklist } from "react-icons/bs";

import Link from "next/link";

import styles from "./TodoPageLink.module.scss";
import { truncate } from "helpers/truncateText";

interface TodoPageLinkProps {
	title: string;
	pageId: string;
	active: boolean;
}

const TodoPageLink: React.FC<TodoPageLinkProps> = ({ title, pageId, active }) => {
	return (
		<div className={styles.container}>
			<Link href={`/pages/${pageId}`}>
				<a className={`${styles.todo_link} ${active ? styles.active : ""}`}>
					<BsCardChecklist size={18} />
					<h4>{truncate(title, 32)}</h4>
				</a>
			</Link>
		</div>
	);
};

export default TodoPageLink;
