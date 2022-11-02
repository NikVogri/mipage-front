import { BsCardChecklist } from "react-icons/bs";
import { truncate } from "helpers/stringTools";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import { HiDotsHorizontal } from "react-icons/hi";
import { useState } from "react";
import { useLeavePageMutation } from "features/member/memberApi";
import { useRouter } from "next/router";

import Link from "next/link";

import styles from "./TodoPageLink.module.scss";

interface TodoPageLinkProps {
	title: string;
	pageId: string;
	active: boolean;
	isOwner: boolean;
}

const TodoPageLink: React.FC<TodoPageLinkProps> = ({ title, pageId, active, isOwner }) => {
	const [leavePage] = useLeavePageMutation();
	const [menuCanBeShown, setMenuCanBeShown] = useState(true);

	const router = useRouter();

	const handleLeavePage = async () => {
		await leavePage({ pageId });
		router.replace("/pages");
	};

	return (
		<div
			className={`${styles.container} ${active ? styles.active : ""}`}
			onMouseLeave={() => setMenuCanBeShown(false)}
			onMouseEnter={() => setMenuCanBeShown(true)}
		>
			<Link href={`/pages/${pageId}`}>
				<a className={styles.todo_link}>
					<BsCardChecklist size={18} />
					<h4>{truncate(title, 32)}</h4>
				</a>
			</Link>
			{!isOwner && menuCanBeShown && (
				<Menu
					menuClassName={styles.menu}
					direction="top"
					position="anchor"
					className={styles.menu}
					menuButton={
						<MenuButton>
							<HiDotsHorizontal size={16} />
						</MenuButton>
					}
					transition
				>
					<MenuItem className={`${styles.menu__item} ${styles.dangerous}`} onClick={handleLeavePage}>
						Leave page
					</MenuItem>
				</Menu>
			)}
		</div>
	);
};

export default TodoPageLink;
