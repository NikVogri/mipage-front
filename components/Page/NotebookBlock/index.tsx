import { NotebookBlockType } from "models";

import CodeBlock from "../CodeBlock";
import ImageBlock from "../ImageBlock";
import RichTextBlock from "../RichTextBlock";

interface NotebookBlockProps {
	type: NotebookBlockType;
	content: string;
	pageId: string;
	notebookId: string;
	id: string;
}

const NotebookBlock: React.FC<NotebookBlockProps> = ({ type, content, pageId, notebookId, id }) => {
	switch (type) {
		case NotebookBlockType.richText:
			return <RichTextBlock content={content} pageId={pageId} notebookId={notebookId} id={id} />;
		case NotebookBlockType.code:
			return <CodeBlock />;
		case NotebookBlockType.image:
			return <ImageBlock />;
	}
};

export default NotebookBlock;
