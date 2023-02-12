import { useRef, useState } from "react";
import { logout } from "features/auth/authSlice";
import { useRouter } from "next/router";
import { useAppDispatch } from "hooks/redux-hooks";

import useDetectClickOutside from "hooks/useDetectClickOutside";

import UserProfileModal from "components/modals/UserProfileModal";
import UserSettingsModal from "components/modals/UserSettingsModal";

import styles from "./UserNavSettingsList.module.scss";
import UserNavSettingsListItem from "components/navigation/UserNavSettingsListItem";

interface UserNavSettingsListProps {
	onClose: () => void;
	show: boolean;
	username: string;
}

const UserNavSettingsList: React.FC<UserNavSettingsListProps> = ({ onClose, show }) => {
	const [showUserProfileModal, setShowUserProfileModal] = useState(false);
	const [showUserSettingsModal, setShowUserSettingsModal] = useState(false);

	const dispatch = useAppDispatch();
	const router = useRouter();

	const handleUserLogout = async () => {
		await dispatch(logout());
		onClose();
		router.push("/login");
	};

	const handleOpenProfile = () => {
		setShowUserProfileModal(true);
		onClose();
	};

	const handleOpenSettings = () => {
		setShowUserSettingsModal(true);
		onClose();
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
					<UserNavSettingsListItem title="My pages" onClick={handleVisitMyPages} />
					<UserNavSettingsListItem title="Profile" onClick={handleOpenProfile} />
					<UserNavSettingsListItem title="Settings" onClick={handleOpenSettings} />
					<UserNavSettingsListItem title="Create a page" onClick={handleCreatePage} />
					<hr />
					<UserNavSettingsListItem title="Logout" onClick={handleUserLogout} className={styles.dangerous} />
				</ul>
			</div>

			{showUserProfileModal && (
				<UserProfileModal
					isOpen={showUserProfileModal}
					setIsClosed={() => setShowUserProfileModal(false)}
					setIsOpen={setShowUserProfileModal}
				/>
			)}

			{showUserSettingsModal && (
				<UserSettingsModal
					isOpen={showUserSettingsModal}
					setIsClosed={() => setShowUserSettingsModal(false)}
					setIsOpen={setShowUserSettingsModal}
				/>
			)}
		</>
	);
};

export default UserNavSettingsList;
