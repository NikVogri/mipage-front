import useWithAuth from "hooks/useWithAuth";
import { PageType } from "models";
import Notebook from "../Notebook";
import Todo from "../Todo";

import styles from "./PageCenter.module.scss";

interface PageCenterProps {
	pageType: PageType;
	pageId: string;
}

export const PageCenter: React.FC<PageCenterProps> = ({ pageType, pageId }) => {
	const { token } = useWithAuth();
	return (
		<main className={`${styles.page__center} card`}>
			{pageType === PageType.todo && <Todo pageId={pageId} token={token} />}
			{pageType === PageType.notebook && <Notebook pageId={pageId} token={token} />}
		</main>
	);
};

export default PageCenter;
