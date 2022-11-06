import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { FormikValues, useFormik } from "formik";
import { useDeletePageMutation, useUpdatePageMutation } from "features/page/pagesApi";
import { useRouter } from "next/router";
import * as Yup from "yup";

import LoadingButton from "components/UI/LoadingButton";
import Modal from "components/UI/Modal";
import PageAccessabilitySelection from "components/Form/CreatePage/PageAccessabilitySelection";
import DeleteConfirmation from "components/DeleteConfirmation";

import styles from "./PageSettingsModal.module.scss";

interface PageSettingsModalProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	pageId: string;
	title: string;
	isPrivate: boolean;
}
const PageSettingsModal: React.FC<PageSettingsModalProps> = ({ isOpen, setIsOpen, pageId, title, isPrivate }) => {
	const [updatePage, { isLoading: isLoadingUpdate }] = useUpdatePageMutation();
	const [deletePage, { isLoading: isLoadingDelete }] = useDeletePageMutation();
	const [showDeletionPrompt, setShowDeletionPrompt] = useState(false);

	const router = useRouter();

	const handleUpdateSubmit = async (fv: FormikValues) => {
		await updatePage({ pageId, isPrivate: fv.isPrivate, title: fv.title });
	};

	const handlePageDelete = async () => {
		await deletePage({ pageId });
		router.push("/pages");
	};

	const formik = useFormik({
		initialValues: {
			title: title,
			isPrivate: isPrivate,
		},
		validationSchema: Yup.object({
			title: Yup.string().min(3, "Page title must be at least 3 characters long").required("Title is required"),
			isPrivate: Yup.boolean().required("Private status is required"),
		}),
		onSubmit: handleUpdateSubmit,
	});

	useEffect(() => {
		formik.setFieldValue("title", title);
		formik.setFieldValue("isPrivate", isPrivate);
	}, [isPrivate, title]); // eslint-disable-line react-hooks/exhaustive-deps

	const formValuesChanges = useMemo(() => {
		return formik.values.title !== title || formik.values.isPrivate !== isPrivate;
	}, [title, isPrivate, formik.values.title, formik.values.isPrivate]);

	if (showDeletionPrompt) {
		return (
			<Modal isOpen={isOpen} setIsOpen={setIsOpen} contentLabel="Page settings">
				<Modal.Head title="Page settings" closeModal={() => setIsOpen(false)} />
				<DeleteConfirmation
					isLoading={isLoadingDelete}
					text={`Are you sure you want to delete '${title}' page? This action cannot be undone.`}
					onCancel={() => setShowDeletionPrompt(false)}
					onDelete={handlePageDelete}
				/>
			</Modal>
		);
	}

	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen} contentLabel="Page settings">
			<div className={styles.page__settings}>
				<Modal.Head title="Page settings" closeModal={() => setIsOpen(false)} />
				<section className={styles.modal__section}>
					<h4>Page information</h4>
					<form onSubmit={formik.handleSubmit}>
						<div className="form-group">
							<label htmlFor="title">Title</label>
							<input
								className={`form-control form-control-modal ${
									formik.errors.title && formik.touched.title ? "invalid" : ""
								}`}
								id="title"
								type="string"
								value={formik.values.title}
								onChange={formik.handleChange}
								required
							/>
							{formik.errors.title && formik.touched.title && (
								<span className="form-error">{formik.errors.title}</span>
							)}
						</div>

						<PageAccessabilitySelection
							setPrivate={(isPrivate: boolean) => formik.setFieldValue("isPrivate", isPrivate)}
							isPrivate={formik.values.isPrivate}
						/>

						<div className={styles.btn__container}>
							<LoadingButton
								scheme="success"
								position="right"
								isLoading={isLoadingUpdate}
								disabled={isLoadingUpdate || !formValuesChanges}
								delay={250}
							>
								Save changes
							</LoadingButton>
						</div>
					</form>
				</section>
				<section className={styles.modal__section}>
					<h4>Dangerous actions</h4>
					<div className={styles.delete__btn__container}>
						<p>Delete this page, this action can not be undone!</p>
						<LoadingButton
							scheme="danger"
							position="center"
							onClick={() => setShowDeletionPrompt(true)}
							isLoading={false}
						>
							Delete page
						</LoadingButton>
					</div>
				</section>
			</div>
		</Modal>
	);
};

export default PageSettingsModal;
