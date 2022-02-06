import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import { useRemoveTodoBlockMutation, useUpdateTodoBlockMutation } from "features/todo/todoApi";
import { useState } from "react";
import { FaCog, FaTrash } from "react-icons/fa";

import LoadingButton from "components/UI/LoadingButton";
import Modal from "components/UI/Modal";

import * as Yup from "yup";

import styles from "./TodoCardHead.module.scss";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { Field, FieldConfig, Form, Formik, FormikValues } from "formik";
import { CirclePicker } from "react-color";
interface TodoCardHeadProps {
	color: string;
	title: string;
	pageId: string;
	todoId: string;
}

const createTodoBlockValidationSchema = Yup.object().shape({
	title: Yup.string().min(3, "Title must be at least 3 characters long").required("Title is required"),
});

const TodoCardHead: React.FC<TodoCardHeadProps> = ({ color, title, pageId, todoId }) => {
	const [removeTodoBlock, {}] = useRemoveTodoBlockMutation();
	const [updateTodoBlock, { isLoading }] = useUpdateTodoBlockMutation();

	const [modalIsOpen, setIsOpen] = useState(false);
	const [selectedColor, setSelectedColor] = useState(color);

	const handleUpdateSubmit = async (e: FormikValues) => {
		if (selectedColor && e.title) {
			await updateTodoBlock({ title: e.title, color: selectedColor, pageId, todoId });
			setIsOpen(false);
		}
	};

	const handleDeleteTodoList = async () => {
		const confirmed = confirm(`Are you sure you want to delete: ${title}?`);

		if (confirmed) {
			await removeTodoBlock({ pageId, todoId });
		}
	};

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

				<Formik
					initialValues={{
						title,
					}}
					validationSchema={createTodoBlockValidationSchema}
					onSubmit={handleUpdateSubmit}
				>
					<Form>
						<Field name="title">
							{({ field, form }: { field: FieldConfig; form: FormikValues }) => (
								<div className="form-group">
									<label className="label">Title</label>
									<input
										className={`form-control form-control-modal ${
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

						<div className={`form-group ${styles.color__picker}`}>
							<label className="label">Header color</label>
							<CirclePicker width="100%" onChange={({ hex }) => setSelectedColor(hex)} />
						</div>

						<Modal.Footer>
							<div className={styles.btn__container}>
								<LoadingButton isLoading={isLoading} className="btn-create btn-md" type="submit">
									Save
								</LoadingButton>
							</div>
						</Modal.Footer>
					</Form>
				</Formik>
			</Modal>
		</div>
	);
};

export default TodoCardHead;
