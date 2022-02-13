import { PageMember } from "models";
import { useRouter } from "next/router";
import YourPagesSidebar from "../YourPagesSidebar";
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
			<YourPagesSidebar />
			<div className={styles.copyright__container}>
				<p>Created with {"❤️"} in Slovenia</p>
				<p>Mipage &#169; {new Date().getFullYear()}</p>
			</div>
		</aside>
	);
};

export default PageLeftSide;
