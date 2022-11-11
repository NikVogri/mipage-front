import { useCreateTodoItemCommentMutation } from "features/comment/commentApi";
import { TodoItemComment } from "models";
import { FormikValues, useFormik } from "formik";
import * as Yup from "yup";

import Avatar from "components/UI/Avatar";
import LoadingButton from "components/UI/LoadingButton";

import styles from "./CreateCommentForm.module.scss";

interface CreateCommentFormProps {
	username: string;
	avatar?: string;
	pageId: string;
	todoItemId: string;
	onCommentAdded: (comment: TodoItemComment) => void;
}

const commentBodyValidationSchema = Yup.object().shape({
	body: Yup.string().min(1).max(4096).required(),
});

const CreateCommentForm: React.FC<CreateCommentFormProps> = ({
	username,
	avatar,
	pageId,
	todoItemId,
	onCommentAdded,
}) => {
	const [createComment, { isLoading }] = useCreateTodoItemCommentMutation();

	const handleSubmit = async (fv: FormikValues) => {
		const todoComment = await createComment({ body: fv.body, pageId, todoItemId }).unwrap();
		formik.resetForm();

		if (todoComment) {
			onCommentAdded(todoComment);
		}
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
					<div>
						<Avatar tooltip={false} size="md" username={username} avatar={avatar} />
					</div>

					<div className={styles.comment__input__input_container}>
						<input
							className={`form-control form-control-modal ${
								formik.errors.body && formik.touched.body ? "invalid" : ""
							}`}
							type="text"
							value={formik.values.body}
							disabled={isLoading}
							id="body"
							name="body"
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
						/>

						{formik.errors.body && formik.touched.body && (
							<span className="form-error">{formik.errors.body}</span>
						)}
					</div>
				</div>
				<div className={styles.btn__container}>
					<LoadingButton
						disabled={!formik.isValid || isLoading || !formik.dirty}
						isLoading={isLoading}
						delay={250}
						position="right"
						scheme="success"
					>
						Submit
					</LoadingButton>
				</div>
			</form>
		</div>
	);
};

export default CreateCommentForm;
