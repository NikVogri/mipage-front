import { useState } from "react";

import Avatar from "../Avatar";
import ProfileCard from "../ProfileCard";

import styles from "./AvatarWithProfileCard.module.scss";

export interface AvatarWithProfileCardProps {
	userId: string;
	username: string;
	outline?: string;
	size?: "md" | "lg" | "sm";
	tooltip?: boolean;
}

const AvatarWithProfileCard = (props: AvatarWithProfileCardProps) => {
	const [showProfileCard, setShowProfileCard] = useState(false);

	return (
		<div className={styles.avatar__card__container}>
			<button className={styles.avatar__open__card__btn} type="button" onClick={() => setShowProfileCard(true)}>
				<Avatar {...props} />
			</button>
			{showProfileCard && (
				<div className={styles.avatar__profile__card}>
					<ProfileCard userId={props.userId} onFocusOut={() => setShowProfileCard(false)} />
				</div>
			)}
		</div>
	);
};

export default AvatarWithProfileCard;
