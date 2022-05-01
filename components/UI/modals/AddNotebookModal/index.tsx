import { Field, FieldConfig, Form, Formik, FormikValues, useFormik } from "formik";
import { Dispatch, SetStateAction } from "react";
import { useCreateNotebookMutation } from "features/notebook/notebookApi";
import * as Yup from "yup";

import LoadingButtonPrimary from "components/UI/LoadingButtonPrimary/LoadingButtonPrimary";
import Modal from "components/UI/Modal";

import styles from "./AddNotebookModal.module.scss";

interface AddNotebookModalProps {
	notebooksCount: number;
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	setIsClosed: () => void;
	pageId: string;
}

const createNotebookValidationSchema = Yup.object().shape({
	title: Yup.string().min(3, "Title must be at least 3 characters long").required("Title is required"),
});

const AddNotebookModal: React.FC<AddNotebookModalProps> = ({
	isOpen,
	setIsOpen,
	setIsClosed,
	notebooksCount,
	pageId,
}) => {
	const [createNotebook, { isLoading }] = useCreateNotebookMutation();

	const handleCreateNotebook = async (fv: FormikValues) => {
		await createNotebook({ title: fv.title, pageId });
		setIsClosed();
	};

	const formik = useFormik({
		initialValues: {
			title: "",
		},
		onSubmit: handleCreateNotebook,
		validationSchema: createNotebookValidationSchema,
	});

	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen} contentLabel="Add a new todo block">
			<Modal.Head title="Add a new notebook" closeModal={setIsClosed} />

			<Formik
				initialValues={{
					title: `My notebook #${notebooksCount + 1}`,
				}}
				validationSchema={createNotebookValidationSchema}
				onSubmit={handleCreateNotebook}
			>
				<form className={styles.form} onSubmit={formik.handleSubmit}>
					<div className="form-group">
						<label className="label">Title</label>
						<input
							className={`form-control form-control-modal ${
								formik.errors.title && formik.touched.title ? "invalid" : ""
							}`}
							name="title"
							type="string"
							required
							value={formik.values.title}
							onChange={formik.handleChange}
						/>
						{formik.errors.title && formik.touched.title && (
							<span className="form-error">{formik.errors.title}</span>
						)}
					</div>

					<Modal.Footer>
						<div className={styles.btn__container}>
							<LoadingButtonPrimary
								isLoading={isLoading}
								scheme="create"
								disabled={isLoading}
								delay={250}
							>
								Submit
							</LoadingButtonPrimary>
						</div>
					</Modal.Footer>
				</form>
			</Formik>
		</Modal>
	);
};

export default AddNotebookModal;
