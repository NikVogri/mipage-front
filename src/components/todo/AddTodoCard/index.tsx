import { FormikValues, useFormik } from "formik";
import { useCreateTodoBlockMutation } from "features/todo/todoApi";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import { CirclePicker } from "react-color";

import LoadingButton from "components/UI/LoadingButton";
import Modal from "components/modals/BaseModal";

import * as Yup from "yup";

import styles from "./AddTodoCard.module.scss";

interface AddTodoCardProps {
	pageId: string;
	todosCount: number | undefined;
}

const createTodoBlockValidationSchema = Yup.object().shape({
	title: Yup.string().min(3, "Title must be at least 3 characters long").required("Title is required"),
});

const AddTodoCard: React.FC<AddTodoCardProps> = ({ pageId, todosCount }) => {
	const [createdTodoBlock, { isLoading }] = useCreateTodoBlockMutation();
	const [modalIsOpen, setIsOpen] = useState(false);

	const handleSubmit = async (e: FormikValues) => {
		await createdTodoBlock({ title: e.title, color: e.color, pageId });
		setIsOpen(false);
	};

	const formik = useFormik({
		initialValues: {
			title: ``,
			color: "#000000",
		},
		validationSchema: createTodoBlockValidationSchema,
		onSubmit: handleSubmit,
	});

	useEffect(() => {
		formik.setFieldValue("title", `Todo #${(todosCount || 0) + 1}`);
	}, [todosCount]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<>
			<button className={styles.todo__card} title="Add a new todo list" onClick={() => setIsOpen(true)}>
				<FaPlus />
			</button>

			<Modal isOpen={modalIsOpen} setIsOpen={setIsOpen} contentLabel="Add a new todo block">
				<Modal.Head title="Add a new todo block" closeModal={() => setIsOpen(false)} />

				<form onSubmit={formik.handleSubmit}>
					<div className="form-group">
						<label className="label">Title</label>
						<input
							className={`form-control form-control-modal ${
								formik.errors.title && formik.touched.title ? "invalid" : ""
							}`}
							type="string"
							required
							name="title"
							id="title"
							value={formik.values.title}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
						/>
						{formik.errors.title && formik.touched.title && (
							<span className="form-error">{formik.errors.title}</span>
						)}
					</div>

					<div className={`form-group ${styles.color__picker}`}>
						<label className="label">Header color</label>
						<CirclePicker
							width="100%"
							onChange={({ hex }) => formik.setFieldValue("color", hex)}
							key={formik.values.color}
							color={formik.values.color}
						/>
					</div>

					<Modal.Footer>
						<div className={styles.btn__container}>
							<LoadingButton scheme="success" position="right" isLoading={isLoading} delay={250}>
								Submit
							</LoadingButton>
						</div>
					</Modal.Footer>
				</form>
			</Modal>
		</>
	);
};

export default AddTodoCard;
