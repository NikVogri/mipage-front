import React, { useEffect, useState } from "react";

import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { selectIsAuth, signup } from "features/auth/authSlice";
import usePush from "hooks/usePush";

import Link from "next/link";
import Head from "next/head";
import LoadingButton from "components/UI/LoadingButton";

import * as Yup from "yup";

import styles from "styles/pages/Register.module.scss";

const signupValidationSchema = Yup.object().shape({
	email: Yup.string().email("Enter a valid email address").required("Email is required"),
	username: Yup.string()
		.min(5, "Username must be at least 5 characters long")
		.max(50, "Max 50 characters")
		.required("Username is required"),
	password: Yup.string()
		.min(8, "Password must be more 8 or more characters long")
		.matches(
			/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
			"Password must include at least 1 uppercase letter and at least 1 number"
		)
		.required("Password is required"),
	passwordConfirm: Yup.string()
		.oneOf([Yup.ref("password"), null], "Passwords don't match")
		.required("Password confirmation is required"),
});

const Register = () => {
	const isAuth = useAppSelector(selectIsAuth);

	const [loading, setLoading] = useState(false);
	const dispatch = useAppDispatch();
	const push = usePush();

	useEffect(() => {
		if (isAuth) {
			push("/pages");
		}
	}, [isAuth, push, dispatch]);

	const handleSubmit = async (fv: { email: string; username: string; password: string }) => {
		setLoading(true);
		const res = await dispatch(signup(fv));
		setLoading(false);

		if (res.meta.requestStatus === "fulfilled") {
			push("/login");
		}
	};

	const formik = useFormik({
		initialValues: {
			email: "",
			username: "",
			password: "",
			passwordConfirm: "",
		},
		validationSchema: signupValidationSchema,
		onSubmit: handleSubmit,
	});

	return (
		<main className={styles.register}>
			<Head>
				<title>Register | Mipage</title>
			</Head>
			<div className={styles.register__container}>
				<form onSubmit={formik.handleSubmit}>
					<h1 className="heading__primary">Create your account</h1>

					<div className="form-group">
						<label className="label">Email</label>
						<input
							className={`form-control ${formik.errors.email && formik.touched.email ? "invalid" : ""}`}
							type="email"
							name="email"
							id="email"
							value={formik.values.email}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							required
						/>
						{formik.errors.email && formik.touched.email && (
							<span className="form-error">{formik.errors.email}</span>
						)}
					</div>

					<div className="form-group">
						<label className="label">Username</label>
						<input
							className={`form-control ${
								formik.errors.username && formik.touched.username ? "invalid" : ""
							}`}
							type="text"
							name="username"
							id="username"
							value={formik.values.username}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							required
						/>
						{formik.errors.username && formik.touched.username && (
							<span className="form-error">{formik.errors.username}</span>
						)}
					</div>

					<div className="form-group">
						<label className="label">Password</label>
						<input
							className={`form-control ${
								formik.errors.password && formik.touched.password ? "invalid" : ""
							}`}
							type="password"
							required
							name="password"
							id="password"
							value={formik.values.password}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
						/>
						{formik.errors.password && formik.touched.password && (
							<span className="form-error">{formik.errors.password}</span>
						)}
					</div>

					<div className="form-group">
						<label className="label">Confirm password</label>
						<input
							className={`form-control ${
								formik.errors.password && formik.touched.passwordConfirm ? "invalid" : ""
							}`}
							type="password"
							required
							name="passwordConfirm"
							id="passwordConfirm"
							value={formik.values.passwordConfirm}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
						/>
						{formik.errors.passwordConfirm && formik.touched.passwordConfirm && (
							<span className="form-error">{formik.errors.passwordConfirm}</span>
						)}
					</div>

					<LoadingButton
						isLoading={loading}
						disabled={loading || !formik.dirty || !formik.isValid}
						delay={250}
						className={styles.register__btn}
						type="submit"
					>
						Create an account
					</LoadingButton>
				</form>

				<Link href="/login">
					<a className={`${styles.secondary__btn} block mt-5`}>Already have an account? Login</a>
				</Link>
				<p className={styles.copyright}>Copyright © {new Date().getFullYear()} MIPAGE</p>
			</div>
		</main>
	);
};

export default Register;
