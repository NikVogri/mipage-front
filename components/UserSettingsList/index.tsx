import { useRef } from "react";
import { logout } from "features/auth/authSlice";
import { useRouter } from "next/router";
import { useAppDispatch } from "hooks/redux-hooks";

import useDetectClickOutside from "hooks/useDetectClickOutside";

import styles from "./UserSettingsList.module.scss";

interface UserSettingsListProps {
	onClose: () => void;
	show: boolean;
	username: string;
}

const UserSettingsList: React.FC<UserSettingsListProps> = ({ onClose, show, username }) => {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const handleUserLogout = async () => {
		await dispatch(logout());
	};

	const handleOpenProfile = () => {
		// TODO: implement profile settings modal modal
	};

	const handleCreatePage = () => {
		router.push("/pages/new");
		onClose();
	};

	const settingsListRef = useRef(null);
	useDetectClickOutside(settingsListRef, () => show && onClose());

	return (
		<div className={`${styles.user__nav__settings__list} ${show ? styles.active : ""}`} ref={settingsListRef}>
			<h3>{username}</h3>
			<ul className={styles.settings__container}>
				<li className={styles.setttings__list__item}>
					<button onClick={handleOpenProfile}>
						<h4>Profile</h4>
					</button>
				</li>
				<li className={styles.setttings__list__item}>
					<button onClick={handleCreatePage}>
						<h4>Create a page</h4>
					</button>
				</li>
				<li className={styles.setttings__list__item}>
					<button onClick={handleUserLogout}>
						<h4>Logout</h4>
					</button>
				</li>
			</ul>
		</div>
	);
};

export default UserSettingsList;
