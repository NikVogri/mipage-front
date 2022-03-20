import { Dispatch, SetStateAction, useState } from "react";
import { deleteUserAndLogout } from "features/auth/authSlice";
import { useAppDispatch } from "hooks/redux-hooks";

import UserProfileBasic from "components/UserProfileBasic";
import DeleteConfirmation from "components/DeleteConfirmation";
import LoadingButtonPrimary from "components/UI/LoadingButtonPrimary/LoadingButtonPrimary";
import Modal from "components/UI/Modal";

import styles from "./UserSettingsModal.module.scss";

interface UserSettingsModalProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	setIsClosed: () => void;
}

const UserSettingsModal: React.FC<UserSettingsModalProps> = ({ isOpen, setIsClosed, setIsOpen }) => {
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
	const dispatch = useAppDispatch();

	const handleDeleteAccount = async () => {
		await dispatch(deleteUserAndLogout());
	};

	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen} contentLabel="Account settings">
			<div className={styles.profile}>
				<Modal.Head title="Account settings" closeModal={() => setIsOpen(false)} />
				<section className={styles.modal__section}>
					<UserProfileBasic />
					<hr />
					<h4>Delete</h4>
					<p>Delete your account and all your pages</p>
					{showDeleteConfirmation && (
						<DeleteConfirmation
							onDelete={handleDeleteAccount}
							onCancel={() => setShowDeleteConfirmation(false)}
							text="Are you sure you want to delete your account? This action is irreversible and all your data including
							your pages will be lost."
						/>
					)}
					{!showDeleteConfirmation && (
						<LoadingButtonPrimary
							scheme="delete"
							position="left"
							onClick={() => setShowDeleteConfirmation(true)}
							isLoading={false}
						>
							Delete account
						</LoadingButtonPrimary>
					)}
				</section>
			</div>
		</Modal>
	);
};

export default UserSettingsModal;
