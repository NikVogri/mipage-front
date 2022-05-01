import * as Yup from "yup";
import { FormikValues, useFormik } from "formik";
import { useRouter } from "next/router";
import { useResetPasswordMutation } from "features/auth/authApi";

import Head from "next/head";
import LoadingButtonPrimary from "components/UI/LoadingButtonPrimary/LoadingButtonPrimary";
import FormFeedback from "components/FormFeedback/FormFeedback";

import styles from "../../styles/pages/ResetPassword.module.scss";
import useAuth from "hooks/useAuth";

const forgotPasswordValidationSchema = Yup.object().shape({
	password: Yup.string().min(6, "Password must be more than 6 characters long").required("Password is required"),
	passwordConfirm: Yup.string()
		.oneOf([Yup.ref("password"), null], "Passwords don't match")
		.required("Password confirmation is required"),
});

const ResetPassword = () => {
	const router = useRouter();
	const { isAuth } = useAuth();

	const [resetPassword, { isLoading, isSuccess, isError, error, data }] = useResetPasswordMutation();

	const handleSubmit = async (fv: FormikValues) => {
		const token = router.query.token as string;
		await resetPassword({ password: fv.password, token });
	};

	const formik = useFormik({
		initialValues: {
			password: "",
			passwordConfirm: "",
		},
		validationSchema: forgotPasswordValidationSchema,
		onSubmit: handleSubmit,
	});

	if (isAuth) {
		router.replace("/");
	}

	return (
		<main className={styles.resetPassword}>
			<Head>
				<title>Reset Password | Mipage</title>
			</Head>
			<div className={styles.resetPassword__container}>
				<form onSubmit={formik.handleSubmit}>
					<h1 className="heading__primary">Reset password</h1>

					{isSuccess && (
						<FormFeedback type="success">Password successfully changed, please login now</FormFeedback>
					)}
					{isError && (
						<FormFeedback type="error">
							{(error as any)?.status === 400 && (error as any)?.data?.message
								? (error as any)?.data?.message
								: "Something went wrong, please try again later"}
						</FormFeedback>
					)}

					<div className="form-group">
						<label className="label">New password</label>
						<input
							className={`form-control ${
								formik.errors.password && formik.touched.password ? "invalid" : ""
							}`}
							type="password"
							name="password"
							id="password"
							required
							value={formik.values.password}
							onChange={formik.handleChange}
						/>
						{formik.errors.password && formik.touched.password && (
							<span className="form-error">{formik.errors.password}</span>
						)}
					</div>

					<div className="form-group">
						<label className="label">Retype password</label>
						<input
							className={`form-control ${
								formik.errors.passwordConfirm && formik.touched.passwordConfirm ? "invalid" : ""
							}`}
							type="password"
							name="passwordConfirm"
							id="passwordConfirm"
							required
							value={formik.values.passwordConfirm}
							onChange={formik.handleChange}
						/>
						{formik.errors.passwordConfirm && formik.touched.passwordConfirm && (
							<span className="form-error">{formik.errors.passwordConfirm}</span>
						)}
					</div>

					<LoadingButtonPrimary
						isLoading={isLoading}
						disabled={isLoading || !formik.dirty || !formik.isValid || isSuccess}
					>
						Submit
					</LoadingButtonPrimary>
				</form>
				<p className={styles.copyright}>Copyright © {new Date().getFullYear()} MIPAGE</p>
			</div>
		</main>
	);
};

export default ResetPassword;