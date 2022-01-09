import { PageMember, PageOwner, User } from "models";

import PageMembers from "../PageMembers";
import PageSettings from "../PageSettings";

import styles from "./PageRightSide.module.scss";

interface PageRightSideProps {
	owner: PageOwner;
	members: PageMember[];
}

const PageRightSide: React.FC<PageRightSideProps> = ({ owner, members }) => {
	return (
		<aside className={styles.page__right}>
			<PageSettings />
			<PageMembers members={members} owner={owner} />
		</aside>
	);
};

export default PageRightSide;
