import { PageMember } from "models";
import { useRouter } from "next/router";
import useAuth from "hooks/useAuth";

import YourPagesSidebar from "../YourPagesSidebar";
import PageMembers from "../PageMembers";
import PageSettings from "../PageSettings";

import styles from "./PageLeftSide.module.scss";

interface PageLeftSideProps {
	members: PageMember[];
	owner: PageMember;
	title: string;
	isPrivate: boolean;
}

export const PageLeftSide: React.FC<PageLeftSideProps> = ({ members, owner, title, isPrivate }) => {
	const router = useRouter();
	const { isAuth } = useAuth();

	return (
		<aside className={styles.left__side}>
			{isAuth && <PageSettings pageId={router.query.pageId as string} title={title} isPrivate={isPrivate} />}
			<PageMembers members={members} owner={owner} pageId={router.query.pageId as string} />
			{isAuth && <YourPagesSidebar />}
			<div className={styles.copyright__container}>
				<p>Created with {"❤️"} in Slovenia</p>
				<p>Mipage &#169; {new Date().getFullYear()}</p>
			</div>
		</aside>
	);
};

export default PageLeftSide;
