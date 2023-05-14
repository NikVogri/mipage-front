import { useRef } from "react";
import { useGetProfileQuery } from "features/users/usersApi";
import { formatToBasicDate } from "helpers/date";
import useDetectClickOutside from "hooks/useDetectClickOutside";

import Avatar from "../Avatar";
import LoadingSpinner from "../LoadingSpinner";

import styles from "./ProfileCard.module.scss";

export interface ProfileCardProps {
	userId: string;
	onFocusOut: () => void;
}

const ProfileCard = ({ userId, onFocusOut }: ProfileCardProps) => {
	const { data, isLoading, isError } = useGetProfileQuery({ userId }, { skip: false });

	const cardRef = useRef(null);
	useDetectClickOutside(cardRef, onFocusOut);

	if (isLoading) {
		return (
			<div className={styles.card__container} ref={cardRef}>
				<LoadingSpinner className={styles.loading__spinner} size={24} />
			</div>
		);
	}

	if (isError) {
		return (
			<div className={styles.card__container} ref={cardRef}>
				<p className={styles.error__message}>
					Unable to load user profile at this time; please try again later.
				</p>
			</div>
		);
	}

	return (
		<div className={styles.card__container} ref={cardRef}>
			<div className={styles.profile__card}>
				<div className={styles.profile__card__head}>
					<Avatar username={data!.username} size="md" tooltip={false} />
					<div className={styles.profile__card__head__info}>
						<h3>{data!.username}</h3>
						<span>Joined {formatToBasicDate(new Date(data!.joinedAt), true)}</span>
					</div>
				</div>
				<hr />
				<div className={styles.profile__card__body}>
					<p>{data!.bio ?? `I haven't set my bio yet!`}</p>
				</div>
			</div>
		</div>
	);
};

export default ProfileCard;
