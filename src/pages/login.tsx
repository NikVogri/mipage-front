import * as Yup from "yup";
import Head from "next/head";
import Link from "next/link";
import { FormikValues, useFormik } from "formik";
import { useEffect } from "react";
import { clearAuthError, login, selectIsAuth, selectLoading } from "features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";

import LoadingButton from "components/UI/LoadingButton";

import usePush from "hooks/usePush";

import styles from "styles/pages/Login.module.scss";

const loginValidationSchema = Yup.object().shape({
	email: Yup.string().email("Enter a valid email address").required("Email is required"),
	password: Yup.string().required("Password is required"),
});

const Login = () => {
	const isAuth = useAppSelector(selectIsAuth);
	const loading = useAppSelector(selectLoading);

	const dispatch = useAppDispatch();
	const push = usePush();

	const handleSubmit = async (fv: FormikValues) => {
		await dispatch(login({ email: fv.email, password: fv.password }));
	};

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: loginValidationSchema,
		onSubmit: handleSubmit,
	});

	useEffect(() => {
		dispatch(clearAuthError());

		if (isAuth) {
			push("/pages");
		}
	}, [isAuth, push, dispatch]);

	return (
		<main className={styles.login}>
			<Head>
				<title>Login | Mipage</title>
			</Head>
			<div className={styles.login__container}>
				<form onSubmit={formik.handleSubmit}>
					<h1 className="heading__primary">Login to your account</h1>

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

					<div className="form-group">
						<label className="label">Your password</label>
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

					<LoadingButton
						isLoading={loading}
						disabled={loading || !formik.dirty || !formik.isValid}
						delay={250}
						className={styles.login__btn}
					>
						Login
					</LoadingButton>
				</form>

				<Link href="/register">
					<a className={`${styles.secondary__btn} block mt-5`}>{"Don't"} have an account? Register</a>
				</Link>
				<Link href="/reset-password">
					<a className={`${styles.secondary__btn} block mt-5`}>Forgot password</a>
				</Link>
				<p className={styles.copyright}>Copyright © {new Date().getFullYear()} MIPAGE</p>
			</div>
		</main>
	);
};

export default Login;
