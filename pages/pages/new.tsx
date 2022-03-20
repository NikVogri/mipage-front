import * as Yup from "yup";
import Head from "next/head";
import { useState } from "react";
import { PageType } from "models";
import { useRouter } from "next/router";
import { Formik, Form, Field, FormikValues, useFormik } from "formik";
import { useCreatePageMutation } from "features/page/pagesApi";
import onlyAuth from "components/HOC/withAuth";

import PageTypeSelection from "components/Form/CreatePage/PageTypeSelection";
import PageAccessabilitySelection from "components/Form/CreatePage/PageAccessabilitySelection";
import Container from "components/UI/Container";
import LoadingButton from "components/UI/LoadingButton";

import ErrorFormMessage from "components/Form/ErrorFormMessage";

import styles from "../../styles/pages/New.module.scss";
import LoadingButtonPrimary from "components/UI/LoadingButtonPrimary/LoadingButtonPrimary";

const pageCreateValidationSchema = Yup.object().shape({
	title: Yup.string().max(255, "Title can't be longer than 255 characters").required("Title is required"),
	type: Yup.mixed().oneOf(["todo", "notebook"]),
	isPrivate: Yup.boolean(),
});

const CreateNewPage = () => {
	const router = useRouter();
	const [createPage, { isLoading, data, isSuccess, isError, error }] = useCreatePageMutation();

	const handleCreatePage = async (fv: FormikValues) => {
		await createPage({ title: fv.title, type: fv.type, isPrivate: fv.isPrivate });
	};

	const formik = useFormik({
		initialValues: {
			title: "",
			type: PageType.todo,
			isPrivate: false,
		},
		validationSchema: pageCreateValidationSchema,
		onSubmit: handleCreatePage,
	});

	if (isSuccess && data) {
		if (data?.type === PageType.notebook) {
			const notebookId = data.notebooks[0].id;
			router.push(`/pages/${data.id}?n=${notebookId}`);
		} else {
			router.push(`/pages/${data.id}`);
		}
	}

	return (
		<Container>
			<Head>
				<title>Create your page | Mipage</title>
			</Head>
			<h1 className="heading__primary">Create a new page</h1>
			<form onSubmit={formik.handleSubmit}>
				{isError && <ErrorFormMessage message={(error as any).data.message} />}

				<div>
					<h2 className="heading__section">Title</h2>
					<input
						className={`form-control ${formik.errors.title && formik.touched.title ? "invalid" : ""}`}
						type="title"
						name="title"
						id="title"
						required
						placeholder="My awesome page..."
						onChange={formik.handleChange}
						value={formik.values.title}
					/>
					{formik.errors.title && formik.touched.title && (
						<span className="form-error">{formik.errors.title}</span>
					)}
				</div>

				<PageTypeSelection
					setType={(type: PageType) => formik.setFieldValue("type", type)}
					pageType={formik.values.type}
				/>
				<PageAccessabilitySelection
					setPrivate={(isPrivate: boolean) => formik.setFieldValue("isPrivate", isPrivate)}
					isPrivate={formik.values.isPrivate}
				/>

				<LoadingButtonPrimary
					position="left"
					scheme="create"
					isLoading={isLoading}
					disabled={!formik.dirty || !formik.isValid}
				>
					Create page
				</LoadingButtonPrimary>
			</form>
		</Container>
	);
};

export default onlyAuth(CreateNewPage, { forceRedirect: true });
