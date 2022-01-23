import * as Yup from "yup";
import { useState } from "react";
import { PageType } from "models";
import { useRouter } from "next/router";
import { Formik, Form, Field, FormikValues } from "formik";
import { useCreatePageMutation } from "features/page/pagesApi";

import PageTypeSelection from "components/Form/CreatePage/PageTypeSelection";
import PageAccessabilitySelection from "components/Form/CreatePage/PageAccessabilitySelection";
import Container from "components/UI/Container";
import LoadingButton from "components/UI/LoadingButton";

import ErrorFormMessage from "components/Form/ErrorFormMessage";
import useWithAuth from "hooks/useWithAuth";

import styles from "../../styles/pages/New.module.scss";

const pageTitleValidationSchema = Yup.object().shape({
	title: Yup.string().max(255, "Title can't be longer than 255 characters").required("Title is required"),
});

const CreateNewPage = () => {
	const { token } = useWithAuth();
	const router = useRouter();
	const [createPage, { isLoading, data, isSuccess, isError, error }] = useCreatePageMutation();

	const [selectedType, setSelectedType] = useState<PageType>(PageType.notebook);
	const [isPrivate, setIsPrivate] = useState(false);

	const handleCreatePage = async (fv: FormikValues) => {
		const page = {
			title: fv.title,
			type: selectedType,
			isPrivate,
		};

		await createPage({ pageData: page, token });
	};

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
			<h1 className="heading__primary">Create a new page</h1>
			<Formik
				initialValues={{ title: "" }}
				validationSchema={pageTitleValidationSchema}
				onSubmit={handleCreatePage}
			>
				<Form>
					{isError && <ErrorFormMessage message={(error as any).data.message} />}
					<Field name="title">
						{({ field, form }: { field: string; form: FormikValues }) => (
							<div>
								<h2 className="heading__section">Title</h2>
								<input
									className={`form-control ${
										form.errors.title && form.touched.title ? "invalid" : ""
									}`}
									type="title"
									required
									placeholder="title"
									{...field}
								/>
								{form.errors.title && form.touched.title && (
									<span className="form-error">{form.errors.title}</span>
								)}
							</div>
						)}
					</Field>
					<PageTypeSelection setType={(type: PageType) => setSelectedType(type)} pageType={selectedType} />
					<PageAccessabilitySelection
						setPrivate={(isPrivate: boolean) => setIsPrivate(isPrivate)}
						isPrivate={isPrivate}
					/>
					<LoadingButton type="submit" isLoading={isLoading}>
						Create page
					</LoadingButton>
				</Form>
			</Formik>
		</Container>
	);
};

export default CreateNewPage;
