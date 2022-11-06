import * as Yup from "yup";
import { PageType } from "models";
import { useRouter } from "next/router";
import { FormikValues, useFormik } from "formik";
import { useCreatePageMutation } from "features/page/pagesApi";
import onlyAuth from "components/HOC/withAuth";

import Head from "next/head";
import PageTypeSelection from "components/form/PageTypeSelection";
import PageAccessabilitySelection from "components/form/PageAccessabilitySelection";
import Container from "components/UI/Container";
import LoadingButton from "components/UI/LoadingButton";
import FormFeedback from "components/form/FormFeedback";

const pageCreateValidationSchema = Yup.object().shape({
	title: Yup.string()
		.max(255, "Title can't be longer than 255 characters")
		.min(3, "Title should be 3 or more characters long")
		.required("Title is required"),
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
				{isError && <FormFeedback type="error">{(error as any).data.message}</FormFeedback>}

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

				<LoadingButton
					position="left"
					scheme="success"
					isLoading={isLoading}
					disabled={!formik.dirty || !formik.isValid || isLoading}
					delay={250}
				>
					Create page
				</LoadingButton>
			</form>
		</Container>
	);
};

export default onlyAuth(CreateNewPage, { forceRedirect: true });
