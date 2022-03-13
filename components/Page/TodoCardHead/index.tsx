import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import { useRemoveTodoBlockMutation, useUpdateTodoBlockMutation } from "features/todo/todoApi";
import { useState } from "react";
import { FaCog, FaTrash } from "react-icons/fa";
import { FormikValues, useFormik } from "formik";
import { CirclePicker } from "react-color";

import LoadingButtonPrimary from "components/UI/LoadingButtonPrimary/LoadingButtonPrimary";
import Modal from "components/UI/Modal";

import * as Yup from "yup";

import styles from "./TodoCardHead.module.scss";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

interface TodoCardHeadProps {
	color: string;
	title: string;
	pageId: string;
	todoId: string;
}

const updateTodoBlockValidationSchema = Yup.object().shape({
	title: Yup.string().min(3, "Title must be at least 3 characters long").required("Title is required"),
	color: Yup.string().required("Color is required"),
});

const TodoCardHead: React.FC<TodoCardHeadProps> = ({ color, title, pageId, todoId }) => {
	const [removeTodoBlock, {}] = useRemoveTodoBlockMutation();
	const [updateTodoBlock, { isLoading }] = useUpdateTodoBlockMutation();

	const [modalIsOpen, setIsOpen] = useState(false);

	const handleUpdateSubmit = async (e: FormikValues) => {
		await updateTodoBlock({ title: e.title, color: e.color, pageId, todoId });
		setIsOpen(false);
	};

	const handleDeleteTodoList = async () => {
		const confirmed = confirm(`Are you sure you want to delete: ${title}?`);

		if (confirmed) {
			await removeTodoBlock({ pageId, todoId });
		}
	};

	const formik = useFormik({
		initialValues: {
			title,
			color,
		},
		validationSchema: updateTodoBlockValidationSchema,
		onSubmit: handleUpdateSubmit,
	});

	return (
		<div className={styles.card__top} style={{ backgroundColor: color }}>
			<Menu
				menuClassName={styles.menu}
				direction="right"
				menuButton={
					<MenuButton>
						<FaCog size={17} />
					</MenuButton>
				}
				transition
			>
				<MenuItem className={styles.menu_item} onClick={() => setIsOpen(true)}>
					<FaCog size={12} /> Settings
				</MenuItem>
				<MenuItem className={styles.menu_item} onClick={handleDeleteTodoList}>
					<FaTrash size={12} /> Delete
				</MenuItem>
			</Menu>

			<Modal isOpen={modalIsOpen} setIsOpen={setIsOpen} contentLabel="Update todo block">
				<Modal.Head title="Update todo block" closeModal={() => setIsOpen(false)} />

				<form onSubmit={formik.handleSubmit}>
					<div className="form-group">
						<label className="label">Title</label>
						<input
							className={`form-control form-control-modal ${
								formik.errors.title && formik.touched.title ? "invalid" : ""
							}`}
							type="string"
							name="title"
							value={formik.values.title}
							onChange={formik.handleChange}
							required
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
							<LoadingButtonPrimary
								position="right"
								scheme="create"
								isLoading={isLoading}
								disabled={!formik.dirty || !formik.isValid}
							>
								Save
							</LoadingButtonPrimary>
						</div>
					</Modal.Footer>
				</form>
			</Modal>
		</div>
	);
};

export default TodoCardHead;
