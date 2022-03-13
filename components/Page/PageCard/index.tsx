import Link from "next/link";
import React from "react";
import { PageMember, PageOwner, PageType } from "models";
import Avatar from "components/Avatar";

import styles from "./PageCard.module.scss";
import { BsBook, BsCardChecklist } from "react-icons/bs";
import { MdLock, MdPublic } from "react-icons/md";

interface PageItemProps {
	title: string;
	id: string;
	type: PageType;
	isPrivate: boolean;
	owner: PageOwner;
	members: PageMember[];
	notebooks?: {
		id: string;
		title: string;
	}[];
}

const shortenText = (text: string, maxLen: number): string => {
	if (text.length >= maxLen) return text.substring(0, maxLen) + "...";
	return text;
};

const PageCard = ({ title, id, type, isPrivate, owner, members, notebooks }: PageItemProps): JSX.Element => {
	// TODO: Allow notebook page cards when implemented
	// <Link href={`/pages/${id}${type === PageType.notebook ? `?n=${notebooks?.[0]?.id}` : ""}`}>
	if (type === PageType.notebook) {
		return (
			<Link href={`#`}>
				<a className={`${styles.page__card} ${styles.disabled__card}`} title={title}>
					<div className={styles.card__text}>
						<h3>{shortenText(title, 35)}</h3>
						<p>
							{members.length + 1} {members.length + 1 > 1 ? "members" : "member"}
						</p>
					</div>

					<div className={styles.card__footer}>
						{type === PageType.notebook && <BsBook size={24} className={styles.visibility_icon} />}
						{isPrivate ? (
							<MdLock size={24} className={styles.type_icon} />
						) : (
							<MdPublic size={24} className={styles.type_icon} />
						)}
					</div>
					<h4>Notebook pages are currently disabled</h4>
				</a>
			</Link>
		);
	}

	return (
		<Link href={`/pages/${id}`}>
			<a className={styles.page__card} title={title}>
				<div className={styles.card__text}>
					<h3>{shortenText(title, 35)}</h3>
					<p>
						{members.length + 1} {members.length + 1 > 1 ? "members" : "member"}
					</p>
				</div>

				<div className={styles.card__footer}>
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
