import { useState } from "react";

import Avatar from "components/UI/Avatar";
import UserNavSettingsList from "components/navigation/UserNavSettingsList";

import styles from "./UserNavSettings.module.scss";

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
			<UserNavSettingsList onClose={() => setShowDropdown(false)} show={showDropdown} username={username} />
		</div>
	);
};

export default UserNavSettings;
