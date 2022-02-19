import useAuth from "hooks/useAuth";

import Avatar from "components/Avatar";

import styles from "./UserProfileBasic.module.scss";

const UserProfileBasic: React.FC = () => {
	const { user } = useAuth();

	return (
		<div className={styles.profile__about}>
			<Avatar size="lg" avatar={user?.avatar} username={user?.username!} tooltip={false} />

			<div className={styles.profile__about__info}>
				<h5>{user?.username}</h5>
				<span>Registered: {new Date(user?.createdAt!).toLocaleDateString()}</span>
			</div>
		</div>
	);
};

export default UserProfileBasic;
