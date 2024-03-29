import Modal from "components/modals/BaseModal";
import UserProfileBasic from "components/user-profile/UserProfileBasic";
import UserProfileUpdateInfoTab from "components/user-profile/UserProfileUpdateInfoTab";
import { Dispatch, SetStateAction } from "react";

import styles from "./UserProfile.module.scss";

interface UserProfileModalProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	setIsClosed: () => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, setIsClosed, setIsOpen }) => {
	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen} contentLabel="User profile">
			<div className={styles.profile}>
				<Modal.Head title="User profile" closeModal={() => setIsOpen(false)} />
				<section className={styles.modal__section}>
					<h4>Profile</h4>
					<UserProfileBasic />
					<hr />
					<UserProfileUpdateInfoTab />
				</section>
			</div>
		</Modal>
	);
};

export default UserProfileModal;
