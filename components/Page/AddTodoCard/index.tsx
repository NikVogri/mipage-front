import { Formik, Form, Field, FormikValues, FieldConfig } from "formik";
import { useCreateTodoBlockMutation } from "features/todo/todoApi";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { CirclePicker } from "react-color";

import LoadingButton from "components/UI/LoadingButton";
import Modal from "components/UI/Modal";

import * as Yup from "yup";

import styles from "./AddTodoCard.module.scss";

interface AddTodoCardProps {
	token: string;
	pageId: string;
	todosCount: number | undefined;
}

const createTodoBlockValidationSchema = Yup.object().shape({
	title: Yup.string().min(3, "Title must be at least 3 characters long").required("Title is required"),
});

const AddTodoCard: React.FC<AddTodoCardProps> = ({ token, pageId, todosCount }) => {
	const [createdTodoBlock, { isLoading }] = useCreateTodoBlockMutation();
	const [modalIsOpen, setIsOpen] = useState(false);
	const [selectedColor, setSelectedColor] = useState("#000000");

	const handleSubmit = async (e: FormikValues) => {
		if (selectedColor && e.title) {
			await createdTodoBlock({ title: e.title, color: selectedColor, token, pageId });
			setIsOpen(false);
		}
	};

	return (
		<>
			<button className={styles.todo__card} title="Add a new todo list" onClick={() => setIsOpen(true)}>
				<FaPlus />
			</button>

			<Modal isOpen={modalIsOpen} setIsOpen={setIsOpen} contentLabel="Add a new todo block">
				<Modal.Head title="Add a new todo block" closeModal={() => setIsOpen(false)} />

				<Formik
					initialValues={{
						title: `Todo #${(todosCount || 0) + 1}`,
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
									Submit
								</LoadingButton>
							</div>
						</Modal.Footer>
					</Form>
				</Formik>
			</Modal>
		</>
	);
};

export default AddTodoCard;
