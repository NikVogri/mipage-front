import useAuth from "hooks/useAuth";
import { FormikValues, useFormik } from "formik";

import * as Yup from "yup";

import styles from "./UserProfileUpdateInfoTab.module.scss";
import { updatePersonalInfo } from "features/auth/authSlice";
import { useAppDispatch } from "hooks/redux-hooks";

const UserProfileUpdateInfoTab: React.FC = () => {
	const { user } = useAuth();
	const dispatch = useAppDispatch();

	const handleUpdateSubmit = async (fv: FormikValues) => {
		const { username, bio } = fv;

		if (username && bio) {
			await dispatch(updatePersonalInfo({ username, bio }));
			formik.resetForm({ values: { username, bio } });
		}
	};

	const formik = useFormik({
		initialValues: {
			username: user?.username,
			bio: user?.bio || "",
		},
		validationSchema: Yup.object({
			username: Yup.string()
				.min(3, "Username must be at least 3 characters long")
				.required("Username is required"),
			bio: Yup.string().max(1024, "Bio can not be longer than 1024 characters"),
		}),
		onSubmit: handleUpdateSubmit,
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<div className={styles.form__body}>
				<div className="form-group">
					<label htmlFor="username">Username</label>
					<input
						className={`form-control form-control-modal ${
							formik.errors.username && formik.touched.username ? "invalid" : ""
						}`}
						id="username"
						type="string"
						value={formik.values.username}
						onChange={formik.handleChange}
						required
					/>
					{formik.errors.username && formik.touched.username && (
						<span className="form-error">{formik.errors.username}</span>
					)}
				</div>

				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input
						className={`form-control form-control-modal`}
						type="string"
						value={user?.email}
						required
						disabled
						id="email"
						style={{ cursor: "not-allowed" }}
					/>
				</div>

				<div>
					<div className="form-group">
						<label htmlFor="bio">Biography</label>
						<textarea
							className={`form-control form-control-modal`}
							value={formik.values.bio}
							onChange={formik.handleChange}
							id="bio"
							name="bio"
							rows={5}
						></textarea>
						{formik.errors.bio && formik.touched.bio && (
							<span className="form-error">{formik.errors.bio}</span>
						)}
					</div>
				</div>
			</div>
			<div className={styles.save__btn__container}>
				<button
					className={`form-button btn-md btn-create`}
					onClick={handleUpdateSubmit}
					disabled={!formik.isValid || !formik.dirty}
				>
					Save changes
				</button>
			</div>
		</form>
	);
};

export default UserProfileUpdateInfoTab;
