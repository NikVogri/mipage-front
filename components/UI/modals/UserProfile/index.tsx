import Avatar from "components/Avatar";
import DeleteConfirmation from "components/DeleteConfirmation";
import Modal from "components/UI/Modal";
import { Formik, Form, Field, FieldConfig, FormikValues } from "formik";
import useAuth from "hooks/useAuth";
import { Dispatch, SetStateAction, useState } from "react";
import * as Yup from "yup";

import styles from "./UserProfile.module.scss";

interface UserProfileModalProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	setIsClosed: () => void;
}

const updateUserValidationSchema = Yup.object().shape({
	title: Yup.string().min(3, "Title must be at least 3 characters long").required("Title is required"),
});

const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, setIsClosed, setIsOpen }) => {
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
	const { user } = useAuth();

	const handleUpdateSubmit = () => {};
	const handleDeleteAccount = () => {};

	const isLoading = false;

	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen} contentLabel="Update todo block">
			<div className={styles.profile}>
				<Modal.Head title="User profile" closeModal={() => setIsOpen(false)} />
				<section className={styles.modal__section}>
					<h4>Profile</h4>
					<Formik
						initialValues={{
							username: user?.username,
							avatar: user?.avatar || "",
						}}
						validationSchema={updateUserValidationSchema}
						onSubmit={handleUpdateSubmit}
					>
						<Form>
							<div className={styles.form__body}>
								<div className={styles.left}>
									<Avatar
										size="lg"
										avatar={user?.avatar}
										username={user?.username!}
										tooltip={false}
									/>
								</div>
								<div className={styles.right}>
									<Field name="username">
										{({ field, form }: { field: FieldConfig; form: FormikValues }) => (
											<div className="form-group">
												<input
													className={`form-control form-control-modal ${
														form.errors.username && form.touched.username ? "invalid" : ""
													}`}
													type="string"
													required
													{...field}
												/>
												{form.errors.username && form.touched.username && (
													<span className="form-error">{form.errors.username}</span>
												)}
											</div>
										)}
									</Field>
								</div>
							</div>
							<div className={styles.save__btn__container}>
								<button className={`form-button btn-md btn-create`} onClick={handleUpdateSubmit}>
									Save changes
								</button>
							</div>
						</Form>
					</Formik>
				</section>

				<section className={styles.modal__section}>
					<h4>Security</h4>
				</section>

				<section className={styles.modal__section}>
					<h4>Account</h4>
					{showDeleteConfirmation && (
						<DeleteConfirmation
							onDelete={handleDeleteAccount}
							onCancel={() => setShowDeleteConfirmation(false)}
							text="Are you sure you want to delete your account? This action is irreversible and all your data including
							your pages will be lost."
						/>
					)}
					{!showDeleteConfirmation && (
						<button className={`form-button btn-md`} onClick={() => setShowDeleteConfirmation(true)}>
							Delete account
						</button>
					)}
				</section>
			</div>
		</Modal>
	);
};

export default UserProfileModal;
