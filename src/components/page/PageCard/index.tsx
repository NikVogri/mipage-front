import React from "react";
import { PageType } from "models";
import { BsBook, BsCardChecklist } from "react-icons/bs";
import { MdLock, MdPublic } from "react-icons/md";
import { pluralize, truncate } from "helpers/stringTools";

import Link from "next/link";

import styles from "./PageCard.module.scss";

interface PageItemProps {
	title: string;
	pageId: string;
	type: PageType;
	isPrivate: boolean;
	membersCount: number;
	notebookId: string;
}

const PageCard = ({ title, pageId, type, isPrivate, membersCount, notebookId }: PageItemProps): JSX.Element => {
	const totalMembers = membersCount + 1; // page members + this user
	let pageUrl = `/pages/${pageId}`;

	if (type === PageType.notebook && notebookId) {
		pageUrl += `?n=${notebookId}`;
	}

	return (
		<Link href={pageUrl}>
			<a className={styles.page__card} title={title}>
				<div className={styles.card__text}>
					<h3>{truncate(title, 35)}</h3>
					<p>
						{totalMembers} {pluralize("member", totalMembers)}
					</p>
				</div>

				<div className={styles.card__footer}>
					{type === PageType.notebook && <BsBook size={24} className={styles.visibility_icon} />}
					{type === PageType.todo && <BsCardChecklist size={24} className={styles.visibility_icon} />}

					{isPrivate ? (
						<MdLock size={24} className={styles.type_icon} />
					) : (
						<MdPublic size={24} className={styles.type_icon} />
					)}
				</div>
			</a>
		</Link>
	);
};

export default PageCard;
