import * as Yup from "yup";
import Link from "next/link";
import { Formik, Field, Form, FormikValues } from "formik";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { clearAuthError, login, selectAuth, selectAuthError } from "features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";

import LoadingButton from "components/UI/LoadingButton";

import styles from "styles/pages/Login.module.scss";
import ErrorFormMessage from "components/Form/ErrorFormMessage";

const loginValidationSchema = Yup.object().shape({
	email: Yup.string().email("Email needs to be an email address").required("Email is required"),
	password: Yup.string().required("Password is required"),
});

const Login = () => {
	const { isAuth, loading } = useAppSelector(selectAuth);
	const authError = useAppSelector(selectAuthError);
	const dispatch = useAppDispatch();
	const router = useRouter();

	useEffect(() => {
		if (isAuth) {
			router.push("/pages");
		}

		return () => {
			dispatch(clearAuthError());
		};
	}, [dispatch, isAuth, router]);

	const handleSubmit = async (fv: FormikValues) => {
		const res = await dispatch(login({ email: fv.email, password: fv.password }));

		if (!res.error) {
			router.push("/pages");
		}
	};

	return (
		<main className={styles.login}>
			<div className={styles.login__container}>
				<Formik
					initialValues={{
						email: "",
						password: "",
					}}
					validationSchema={loginValidationSchema}
					onSubmit={handleSubmit}
				>
					<Form>
						<h1 className="heading__primary">Login to your account</h1>
						{authError && <ErrorFormMessage message={authError} />}
						<Field name="email">
							{({ field, form }: { field: string; form: FormikValues }) => (
								<div className="form-group">
									<label className="label">Your email address</label>
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

						<Field name="password">
							{({ field, form }: { field: string; form: FormikValues }) => (
								<div className="form-group">
									<label className="label">Your password</label>
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
						<LoadingButton isLoading={loading} className="form-button" disabled={loading} type="submit">
							Submit
						</LoadingButton>
					</Form>
				</Formik>
				<Link href="/register">
					<a className={`${styles.secondary__btn} block mt-5`}>{"Don't"} have an account? Register</a>
				</Link>
				<p className={styles.copyright}>Copyright © {new Date().getFullYear()} MIPAGE</p>
			</div>
		</main>
	);
};

export default Login;
