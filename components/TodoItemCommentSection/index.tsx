import CommentListList from "components/comments/CommentList";
import CreateCommentForm from "components/comments/CreateCommentForm";
import useAuth from "hooks/useAuth";
import { MdComment } from "react-icons/md";

import styles from "./TodoItemCommentSection.module.scss";

interface TodoItemCommentSectionProps {}

const TodoItemCommentSection: React.FC<TodoItemCommentSectionProps> = ({}) => {
	// todo fetch comments
	const { user } = useAuth();
	const comments = [] as any;

	const handleCreateComment = () => {};

	return (
		<div>
			<h3>
				<MdComment size={22} />
				Comments
			</h3>
			<section>
				<CreateCommentForm username={user?.username!} avatar={user?.avatar!} onSubmit={handleCreateComment} />
				<hr />
				<CommentListList comments={comments} />
			</section>
		</div>
	);
};

export default TodoItemCommentSection;
