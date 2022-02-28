import CommentListList from "components/comments/CommentList";
import CreateCommentForm from "components/comments/CreateCommentForm";
import LoadingWrapper from "components/UI/LoadingWrapper";
import { useGetTodoItemCommentsQuery } from "features/comment/commentApi";
import useAuth from "hooks/useAuth";
import { MdComment } from "react-icons/md";

import styles from "./TodoItemCommentSection.module.scss";

interface TodoItemCommentSectionProps {
	pageId: string;
	todoItemId: string;
}

const TodoItemCommentSection: React.FC<TodoItemCommentSectionProps> = ({ pageId, todoItemId }) => {
	const { user } = useAuth();
	const { data, isLoading } = useGetTodoItemCommentsQuery({ pageId, todoItemId });

	const handleCreateComment = () => {};

	return (
		<div>
			{isLoading ? <div>Loading...</div> : null}
			<h3>
				<MdComment size={22} />
				Comments
			</h3>
			<section>
				<CreateCommentForm username={user?.username!} avatar={user?.avatar!} onSubmit={handleCreateComment} />
				<hr />
				<LoadingWrapper isLoading={isLoading} delay={0}>
					<CommentListList comments={data!} />
				</LoadingWrapper>
			</section>
		</div>
	);
};

export default TodoItemCommentSection;
