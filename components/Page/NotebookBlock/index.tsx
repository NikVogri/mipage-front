import { NotebookBlockType } from "models";

import CodeBlock from "../CodeBlock";
import ImageBlock from "../ImageBlock";
import RichTextBlock from "../RichTextBlock";

interface NotebookBlockProps {
	type: NotebookBlockType;
	content: string;
	token: string;
	pageId: string;
	notebookId: string;
	id: string;
}

const NotebookBlock: React.FC<NotebookBlockProps> = ({ type, content, pageId, notebookId, id, token }) => {
	switch (type) {
		case NotebookBlockType.richText:
			return <RichTextBlock content={content} pageId={pageId} notebookId={notebookId} id={id} token={token} />;
		case NotebookBlockType.code:
			return <CodeBlock />;
		case NotebookBlockType.image:
			return <ImageBlock />;
	}
};

export default NotebookBlock;
