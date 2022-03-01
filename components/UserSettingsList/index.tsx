import { useRef, useState } from "react";
import { logout } from "features/auth/authSlice";
import { useRouter } from "next/router";
import { useAppDispatch } from "hooks/redux-hooks";

import useDetectClickOutside from "hooks/useDetectClickOutside";

import styles from "./UserSettingsList.module.scss";
import UserProfileModal from "components/UI/modals/UserProfile";
import UserSettingsModal from "components/UI/modals/UserSettingsModal";

interface UserSettingsListProps {
	onClose: () => void;
	show: boolean;
	username: string;
}

const UserSettingsList: React.FC<UserSettingsListProps> = ({ onClose, show }) => {
	const [showUserProfileModal, setShowUserProfileModal] = useState(false);
	const [showUserSettingsModal, setShowUserSettingsModal] = useState(false);

	const dispatch = useAppDispatch();
	const router = useRouter();

	const handleUserLogout = async () => {
		await dispatch(logout());
	};

	const handleOpenProfile = () => {
		setShowUserProfileModal(true);
	};

	const handleOpenSettings = () => {
		setShowUserSettingsModal(true);
	};

	const handleCreatePage = () => {
		router.push("/pages/new");
		onClose();
	};

	const handleVisitMyPages = () => {
		router.push("/pages");
		onClose();
	};

	const settingsListRef = useRef(null);
	useDetectClickOutside(settingsListRef, () => show && onClose());

	return (
		<>
			<div className={`${styles.user__nav__settings__list} ${show ? styles.active : ""}`} ref={settingsListRef}>
				<ul className={styles.settings__container}>
					<li className={styles.setttings__list__item}>
						<button onClick={handleVisitMyPages}>
							<h4>My pages</h4>
						</button>
					</li>
					<li className={styles.setttings__list__item}>
						<button onClick={handleOpenProfile}>
							<h4>Profile</h4>
						</button>
					</li>
					<li className={styles.setttings__list__item}>
						<button onClick={handleOpenSettings}>
							<h4>Settings</h4>
						</button>
					</li>
					<li className={styles.setttings__list__item}>
						<button onClick={handleCreatePage}>
							<h4>Create a page</h4>
						</button>
					</li>

					<hr />
					<li className={styles.setttings__list__item}>
						<button onClick={handleUserLogout}>
							<h4>Logout</h4>
						</button>
					</li>
				</ul>
			</div>

			<UserProfileModal
				isOpen={showUserProfileModal}
				setIsClosed={() => setShowUserProfileModal(false)}
				setIsOpen={setShowUserProfileModal}
			/>

			<UserSettingsModal
				isOpen={showUserSettingsModal}
				setIsClosed={() => setShowUserSettingsModal(false)}
				setIsOpen={setShowUserSettingsModal}
			/>
		</>
	);
};

export default UserSettingsList;
