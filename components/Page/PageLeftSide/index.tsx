import { PageMember } from "models";
import { useRouter } from "next/router";

import OtherPages from "../OtherPages";
import PageMembers from "../PageMembers";
import PageSettings from "../PageSettings";

import styles from "./PageLeftSide.module.scss";

interface PageLeftSideProps {
	members: PageMember[];
	owner: PageMember;
}

export const PageLeftSide: React.FC<PageLeftSideProps> = ({ members, owner }) => {
	const router = useRouter();

	return (
		<aside className={styles.left__side}>
			<PageSettings />
			<PageMembers members={members} owner={owner} pageId={router.query.pageId as string} />
			<OtherPages />
		</aside>
	);
};

export default PageLeftSide;
