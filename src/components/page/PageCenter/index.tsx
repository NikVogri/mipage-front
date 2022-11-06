import { PageType } from "models";
import Notebook from "../../notebook/Notebook";
import Todo from "../../todo/Todo";

import styles from "./PageCenter.module.scss";

interface PageCenterProps {
	pageType: PageType;
	pageId: string;
}

export const PageCenter: React.FC<PageCenterProps> = ({ pageType, pageId }) => {
	return (
		<main className={`${styles.page__center} card`}>
			{pageType === PageType.todo && <Todo pageId={pageId} />}
			{pageType === PageType.notebook && <Notebook pageId={pageId} />}
		</main>
	);
};

export default PageCenter;
