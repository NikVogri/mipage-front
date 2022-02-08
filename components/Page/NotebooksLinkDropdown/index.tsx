import { SidebarNotebook } from "models";
import { Dispatch, SetStateAction, useState } from "react";

import Link from "next/link";

import styles from "./NotebooksLinkDropdown.module.scss";
import { HiChevronDown, HiPlus } from "react-icons/hi";
import { BsBook } from "react-icons/bs";
import Modal from "components/UI/Modal";
import LoadingButton from "components/UI/LoadingButton";
import * as Yup from "yup";
import { Field, FieldConfig, Form, Formik, FormikValues } from "formik";
import { useCreateNotebookMutation } from "features/notebook/notebookApi";
import { truncate } from "helpers/truncateText";

interface NotebooksLinkDropdownProps {
	pageId: string;
	notebooks: SidebarNotebook[];
	title: string;
	active: boolean;
	activeNotebookId?: string;
}

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
	);
};

const NotebooksLinkDropdown: React.FC<NotebooksLinkDropdownProps> = ({
	pageId,
	notebooks,
	title,
	active,
	activeNotebookId,
}) => {
	const [showDropdown, setShowDropdown] = useState(false);
	const [showAddNotebookModal, setShowAddNotebookModal] = useState(false);

	return (
		<>
			<div className={`${styles.container} ${active ? styles.active : null}`}>
				<div className={styles.head}>
					<button onClick={() => setShowDropdown(!showDropdown)}>
						<div className={styles.title}>
							<BsBook size={18} />
							<h4>{truncate(title, 32)}</h4>
						</div>
					</button>
					{showDropdown && (
						<div className={styles.btn__settings__container}>
							<button title="Add a Notebook" onClick={() => setShowAddNotebookModal(true)}>
								<HiPlus size={16} />
							</button>
						</div>
					)}
				</div>

				<ul
					className={`${styles.dropdown_list} ${
						active || showDropdown || !notebooks.length ? styles.open : ""
					}`}
				>
					{!notebooks.length && <span>No notebooks yet, add one now!</span>}
					{notebooks.map((notebook) => (
						<li
							key={notebook.id}
							className={active && activeNotebookId === notebook.id ? styles.active : ""}
						>
							<Link href={`/pages/${pageId}?n=${notebook.id}`}>
								<a>{notebook.title}</a>
							</Link>
						</li>
					))}
				</ul>
			</div>
			<AddNotebookModal
				pageId={pageId}
				notebooksCount={notebooks.length}
				isOpen={showAddNotebookModal}
				setIsClosed={() => setShowAddNotebookModal(false)}
				setIsOpen={setShowAddNotebookModal}
			/>
		</>
	);
};

export default NotebooksLinkDropdown;