import React, { useEffect } from "react";
import Link from "next/link";
import * as Yup from "yup";

import { Formik, Form, Field, FormikValues } from "formik";
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { clearAuthError, selectAuth, signup } from "features/auth/authSlice";
import { useRouter } from "next/router";

import LoadingButton from "components/UI/LoadingButton";

import styles from "../styles/pages/Register.module.scss";

const signupValidationSchema = Yup.object().shape({
	email: Yup.string().email("Please enter a correct email address").required("Email is required"),
	username: Yup.string()
		.min(5, "Username must be more than 5 characters long")
		.max(50, "Max 50 characters")
		.required("Username is required"),
	password: Yup.string().min(6, "Password must be more than 6 characters long").required("Password is required"),
	passwordConfirm: Yup.string().oneOf([Yup.ref("password"), null], "Passwords don't match"),
});

const Register = () => {
	const { isAuth, loading } = useAppSelector(selectAuth);
	const dispatch = useAppDispatch();
	const authError = useAppSelector((state) => state.auth.error);
	const router = useRouter();

	useEffect(() => {
		if (isAuth) {
			router.push("/pages");
		}

		return () => {
			dispatch(clearAuthError());
		};
	}, [dispatch, isAuth, router]);

	const handleSubmit = async (fv: { email: string; username: string; password: string }) => {
		const res = await dispatch(signup(fv));

		if (!res.error) {
			router.push("/login");
		}
	};

	return (
		<main className={styles.register}>
			<div className={styles.register__container}>
				<Formik
					initialValues={{
						email: "",
						username: "",
						password: "",
						passwordConfirm: "",
					}}
					validationSchema={signupValidationSchema}
					onSubmit={handleSubmit}
				>
					<Form>
						<h1 className="heading__primary">Create your account</h1>
						{authError && (
							<p className="text-red-500 text-center text-3xl p-3 border border-red-500 rounded">
								{authError}
							</p>
						)}
						<Field name="email">
							{({ field, form }: { field: string; form: FormikValues }) => (
								<div className="form-group">
									<label className="label">Email</label>
									<input
										className={`form-control ${
											form.errors.email && form.touched.email ? "invalid" : ""
										}`}
										type="email"
										required
										{...field}
									/>
									{form.errors.email && form.touched.email && (
										<span className="form-error">{form.errors.email}</span>
									)}
								</div>
							)}
						</Field>

						<Field name="username">
							{({ field, form }: { field: string; form: FormikValues }) => (
								<div className="form-group">
									<label className="label">Username</label>
									<input
										className={`form-control ${
											form.errors.username && form.touched.username ? "invalid" : ""
										}`}
										type="text"
										required
										{...field}
									/>
									{form.errors.username && form.touched.username && (
										<span className="form-error">{form.errors.username}</span>
									)}
								</div>
							)}
						</Field>

						<Field name="password">
							{({ field, form }: { field: string; form: FormikValues }) => (
								<div className="form-group">
									<label className="label">Password</label>
									<input
										className={`form-control ${
											form.errors.password && form.touched.password ? "invalid" : ""
										}`}
										type="password"
										required
										{...field}
									/>
									{form.errors.password && form.touched.password && (
										<span className="form-error">{form.errors.password}</span>
									)}
								</div>
							)}
						</Field>

						<Field name="passwordConfirm">
							{({ field, form }: { field: string; form: FormikValues }) => (
								<div className="form-group">
									<label className="label">Confirm password</label>
									<input
										className={`form-control ${
											form.errors.password && form.touched.passwordConfirm ? "invalid" : ""
										}`}
										type="password"
										required
										{...field}
									/>
									{form.errors.password && form.touched.passwordConfirm && (
										<span className="form-error">{form.errors.passwordConfirm}</span>
									)}
								</div>
							)}
						</Field>

						<LoadingButton className="form-button" isLoading={loading} disabled={loading}>
							Submit
						</LoadingButton>
					</Form>
				</Formik>
				<Link href="/login">
					<a className={`${styles.secondary__btn} block mt-5`}>Already have an account? Login</a>
				</Link>
				<p className={styles.copyright}>Copyright © {new Date().getFullYear()} MIPAGE</p>
			</div>
		</main>
	);
};

export default Register;
