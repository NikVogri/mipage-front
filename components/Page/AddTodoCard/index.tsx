import { Formik, Form, Field, FormikValues, FieldConfig } from "formik";
import { useCreateTodoBlockMutation } from "features/todo/todoApi";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";

import LoadingButton from "components/UI/LoadingButton";
import Modal from "react-modal";

import * as Yup from "yup";

import styles from "./AddTodoCard.module.scss";

interface AddTodoCardProps {
	token: string;
	pageId: string;
}

const createTodoBlockValidationSchema = Yup.object().shape({
	title: Yup.string().min(3, "Title must be at least 3 characters long").required("Title is required"),
});

const AddTodoCard: React.FC<AddTodoCardProps> = ({ token, pageId }) => {
	const [createdTodoBlock, { isLoading }] = useCreateTodoBlockMutation();
	const [modalIsOpen, setIsOpen] = useState(false);

	const handleSubmit = async (e: FormikValues) => {
		await createdTodoBlock({ title: e.title, color: e.color, token, pageId });
		setIsOpen(false);
	};

	return (
		<>
			<button className={styles.todo__card} title="Add a new todo list" onClick={() => setIsOpen(true)}>
				<FaPlus />
			</button>
			<Modal
				ariaHideApp={false}
				isOpen={modalIsOpen}
				contentLabel="Add todo list block"
				className={styles.add__todoblock__modal}
				overlayClassName={styles.add__todoblock__modal_overlay}
				onRequestClose={() => setIsOpen(false)}
			>
				{/* // TODO: Temp modal - create reusable modal with css style */}
				<h1 className="heading__primary">Add new todo block</h1>
				<hr />

				<Formik
					initialValues={{
						title: "",
						color: "#000000",
					}}
					validationSchema={createTodoBlockValidationSchema}
					onSubmit={handleSubmit}
				>
					<Form>
						<Field name="title">
							{({ field, form }: { field: FieldConfig; form: FormikValues }) => (
								<div className="form-group">
									<label className="label">Title</label>
									<input
										className={`form-control ${
											form.errors.title && form.touched.title ? "invalid" : ""
										}`}
										type="string"
										required
										{...field}
									/>
									{form.errors.title && form.touched.title && (
										<span className="form-error">{form.errors.title}</span>
									)}
								</div>
							)}
						</Field>
						<Field name="color">
							{({ field, form }: { field: FieldConfig; form: FormikValues }) => (
								<div className="form-group">
									<label className="label">Block header color</label>
									<input
										className={`form-control ${
											form.errors.color && form.touched.color ? "invalid" : ""
										} ${styles.color__picker}`}
										type="color"
										required
										{...field}
									/>
									{form.errors.color && form.touched.color && (
										<span className="form-error">{form.errors.color}</span>
									)}
								</div>
							)}
						</Field>

						<LoadingButton isLoading={isLoading} className="form-button" disabled={isLoading} type="submit">
							Submit
						</LoadingButton>
					</Form>
				</Formik>

				<br />

				<hr />
				<button onClick={() => setIsOpen(false)}>Close</button>
			</Modal>
		</>
	);
};

export default AddTodoCard;
