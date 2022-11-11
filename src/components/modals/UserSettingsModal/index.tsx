import { Dispatch, SetStateAction, useState } from "react";
import { deleteUserAndLogout } from "features/auth/authSlice";
import { useAppDispatch } from "hooks/redux-hooks";

import UserProfileBasic from "components/user-profile/UserProfileBasic";
import DeleteConfirmation from "components/UI/DeleteConfirmation";
import LoadingButton from "components/UI/LoadingButton";
import Modal from "components/modals/BaseModal";

import styles from "./UserSettingsModal.module.scss";
import { useRouter } from "next/router";

interface UserSettingsModalProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	setIsClosed: () => void;
}

const UserSettingsModal: React.FC<UserSettingsModalProps> = ({ isOpen, setIsClosed, setIsOpen }) => {
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
	const dispatch = useAppDispatch();
	const router = useRouter();

	const handleDeleteAccount = async () => {
		const res = await dispatch(deleteUserAndLogout());

		if (res.meta.requestStatus === "fulfilled") {
			router.push("/");
		}
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
						<LoadingButton
							scheme="danger"
							position="left"
							onClick={() => setShowDeleteConfirmation(true)}
							isLoading={false}
							delay={250}
							className={styles.delete__btn}
						>
							Delete account
						</LoadingButton>
					)}
				</section>
			</div>
		</Modal>
	);
};

export default UserSettingsModal;
