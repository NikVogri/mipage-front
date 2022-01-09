import useWithAuth from "hooks/useWithAuth";
import { PageType } from "models";
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
			{/* {page?.banner?.active && <Banner />} TODO: uncomment this and remove below line*/}
			{/* <Banner /> */}
			{pageType === PageType.todo && <Todo pageId={pageId} token={token} />}
			{/* {pageType === PageType.notebook && <Notebook pageId={pageId} token={token} />} */}
		</main>
	);
};

export default PageCenter;
