import * as Yup from "yup";
import { FormikValues, useFormik } from "formik";
import { useForgotPasswordMutation } from "features/auth/authApi";

import Head from "next/head";
import LoadingButton from "components/UI/LoadingButton";
import FormFeedback from "components/form/FormFeedback";

import styles from "styles/pages/ForgotPassword.module.scss";

const forgotPasswordValidationSchema = Yup.object().shape({
	email: Yup.string().email("Enter a valid email address").required("Email is required"),
});

const ForgotPassword = () => {
	const [forgotPassword, { isLoading, isSuccess, isError }] = useForgotPasswordMutation();

	const handleSubmit = async (fv: FormikValues) => {
		await forgotPassword({ email: fv.email });
	};

	const formik = useFormik({
		initialValues: {
			email: "",
		},
		validationSchema: forgotPasswordValidationSchema,
		onSubmit: handleSubmit,
	});

	return (
		<main className={styles.forgotPassword}>
			<Head>
				<title>Reset Password | Mipage</title>
			</Head>
			<div className={styles.forgotPassword__container}>
				<form onSubmit={formik.handleSubmit}>
					<h1 className="heading__primary">Request a password reset</h1>

					{isSuccess && (
						<FormFeedback type="success">
							We have sent you an e-mail with instructions on how to reset your password if your account
							exists.
						</FormFeedback>
					)}

					{isError && <FormFeedback type="danger">Something went wrong, please try again later</FormFeedback>}

					<div className="form-group">
						<label className="label">Your email address</label>
						<input
							className={`form-control ${formik.errors.email && formik.touched.email ? "invalid" : ""}`}
							type="email"
							name="email"
							id="email"
							required
							value={formik.values.email}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
						/>
						{formik.errors.email && formik.touched.email && (
							<span className="form-error">{formik.errors.email}</span>
						)}
					</div>

					<LoadingButton
						isLoading={isLoading}
						disabled={isLoading || !formik.dirty || !formik.isValid || isSuccess}
						delay={250}
						className={styles.forgot__password__btn}
						type="submit"
					>
						Request reset
					</LoadingButton>
				</form>
				<p className={styles.copyright}>Copyright © {new Date().getFullYear()} MIPAGE</p>
			</div>
		</main>
	);
};

export default ForgotPassword;
