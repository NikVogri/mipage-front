import React from "react";
import useAuth from "hooks/useAuth";
import { useRemoveMemberFromPageMutation } from "features/member/memberApi";
import { BiCrown } from "react-icons/bi";

import Avatar from "components/Avatar";
import LoadingButtonPrimary from "components/UI/LoadingButtonPrimary/LoadingButtonPrimary";

import styles from "./MembersListItem.module.scss";

interface MembersListItemProps {
	ownerId: string;
	id: string;
	pageId: string;
	avatar?: string | null;
	username: string;
	email: string;
}

const MembersListItem: React.FC<MembersListItemProps> = ({ ownerId, pageId, id, avatar, username }) => {
	let [removeMemberFromPage, { isLoading }] = useRemoveMemberFromPageMutation();
	const { user } = useAuth();

	const handleRemoveUserFromPage = async () => {
		await removeMemberFromPage({ id, pageId });
	};

	const authUserIsPageOwner = ownerId === user?.id;
	const memberIsPageOwner = ownerId === id;

	// Only an owner of page can controls members
	// Only display controls if the currently authenticated user is the owner of the page
	let controls = (
		<div className={styles.btn__container}>
			<LoadingButtonPrimary
				onClick={handleRemoveUserFromPage}
				disabled={isLoading}
				isLoading={isLoading}
				scheme="delete"
			>
				Remove
			</LoadingButtonPrimary>
		</div>
	);

	return (
		<li className={styles.member__list__item} key={id}>
			<div className={styles.results__username__container}>
				<Avatar username={username} avatar={avatar} size="md" />
				<span className={styles.results__username}>{username}</span>
			</div>
			{memberIsPageOwner ? <BiCrown size={22} className={styles.owner__indicator} /> : null}
			{authUserIsPageOwner && !memberIsPageOwner && controls}
		</li>
	);
};

export default MembersListItem;
