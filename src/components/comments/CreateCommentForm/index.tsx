import { useCreateTodoItemCommentMutation } from "features/comment/commentApi";
import { TodoItemComment } from "models";
import { FormikValues, useFormik } from "formik";
import { EditorState } from "draft-js";
import { useState } from "react";
import * as Yup from "yup";

import LoadingButton from "components/UI/LoadingButton";
import WYSIWYG from "components/UI/WYSIWYG";

import styles from "./CreateCommentForm.module.scss";

interface CreateCommentFormProps {
	pageId: string;
	todoItemId: string;
}

const commentBodyValidationSchema = Yup.object().shape({
	body: Yup.string().min(1).max(4096).required(),
});

const CreateCommentForm: React.FC<CreateCommentFormProps> = ({ pageId, todoItemId }) => {
	const [editorState, setEditorState] = useState(EditorState.createEmpty());
	const [createComment, { isLoading }] = useCreateTodoItemCommentMutation();

	const handleSubmit = async (fv: FormikValues) => {
		await createComment({ body: fv.body, pageId, todoItemId }).unwrap();
		setEditorState(EditorState.createEmpty());
		formik.resetForm();
	};

	const formik = useFormik({
		initialValues: {
			body: "",
		},
		onSubmit: handleSubmit,
		validationSchema: commentBodyValidationSchema,
	});

	return (
		<div className={styles.add__new__comment}>
			<form onSubmit={formik.handleSubmit}>
				<div className={styles.comment__input}>
					<div className={styles.comment__input__input_container}>
						<WYSIWYG
							editorState={editorState}
							onStateUpdate={setEditorState}
							onHtmlChange={(val) => formik.setFieldValue("body", val, true)}
							tags={["Bold", "Italic", "Monospace", "OL", "UL", "Underline"]}
						/>
					</div>
				</div>
				<div className={styles.btn__container}>
					<LoadingButton
						disabled={!formik.isValid || isLoading || !formik.dirty}
						isLoading={isLoading}
						delay={250}
						position="right"
						scheme="success"
						type="submit"
					>
						Submit
					</LoadingButton>
				</div>
			</form>
		</div>
	);
};

export default CreateCommentForm;
