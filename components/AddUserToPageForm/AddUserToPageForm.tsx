import React from "react";
import { useAddMemberToPageMutation } from "features/member/memberApi";
import { FormikValues, useFormik } from "formik";
import * as Yup from "yup";

import FormFeedback from "components/FormFeedback/FormFeedback";
import LoadingButtonPrimary from "components/UI/LoadingButtonPrimary/LoadingButtonPrimary";

import styles from "./AddUserToPageForm.module.scss";

interface AddUserToPageFormProps {
	pageId: string;
}

const userEmailValidationSchema = Yup.object().shape({
	email: Yup.string().email("Invalid email").required("Email is required"),
});

const AddUserToPageForm: React.FC<AddUserToPageFormProps> = ({ pageId }) => {
	let [addMemberToPage, { isLoading, error, isError, isSuccess }] = useAddMemberToPageMutation();

	const handleAddUserToPage = async (fv: FormikValues) => {
		await addMemberToPage({ email: fv.email, pageId });
	};

	const formik = useFormik({
		initialValues: {
			email: "",
		},
		onSubmit: handleAddUserToPage,
		validationSchema: userEmailValidationSchema,
	});

	return (
		<form className={styles.search__for_users__form} onSubmit={formik.handleSubmit}>
			<div className={styles.form__feedback__container}>
				{isError && <FormFeedback type="error">{(error as any).data.message}</FormFeedback>}
				{isSuccess && (
					<FormFeedback type="success">
						User was successfully added to the page if they have an acconut
					</FormFeedback>
				)}
			</div>

			<div className="form-group">
				<label className="label">Email</label>
				<input
					className={`form-control form-control-modal ${
						formik.errors.email && formik.touched.email ? "invalid" : ""
					}`}
					type="email"
					name="email"
					value={formik.values.email}
					onChange={formik.handleChange}
					required
				/>
				{formik.errors.email && formik.touched.email && (
					<span className="form-error">{formik.errors.email}</span>
				)}
			</div>

			<div className={styles.btn__container}>
				<LoadingButtonPrimary
					isLoading={isLoading}
					disabled={isLoading || !formik.dirty || !formik.isValid}
					scheme="create"
					position="right"
				>
					Add
				</LoadingButtonPrimary>
			</div>
		</form>
	);
};

export default AddUserToPageForm;
