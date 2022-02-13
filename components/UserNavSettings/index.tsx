import { useState } from "react";

import Avatar from "components/Avatar";
import UserSettingsList from "components/UserSettingsList";

import styles from "./UserNavSettings.module.scss";
import UserProfileModal from "components/UI/modals/UserProfile";

interface UserNavSettingsProps {
	username: string;
	avatar?: string | null;
}

const UserNavSettings: React.FC<UserNavSettingsProps> = ({ username, avatar }) => {
	const [showDropdown, setShowDropdown] = useState(false);

	return (
		<div className={styles.user__nav__icon}>
			<button onClick={() => setShowDropdown(!showDropdown)} title={username}>
				<Avatar username={username} avatar={avatar} tooltip={false} />
			</button>
			<UserSettingsList onClose={() => setShowDropdown(false)} show={showDropdown} username={username} />
		</div>
	);
};

export default UserNavSettings;
