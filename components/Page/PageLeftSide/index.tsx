import { PageMember } from "models";
import { useRouter } from "next/router";

import OtherPages from "../OtherPages";
import PageMembers from "../PageMembers";
import PageSettings from "../PageSettings";

import useWithAuth from "hooks/useWithAuth";

import styles from "./PageLeftSide.module.scss";

interface PageLeftSideProps {
	members: PageMember[];
	owner: PageMember;
}

export const PageLeftSide: React.FC<PageLeftSideProps> = ({ members, owner }) => {
	const router = useRouter();
	const { token } = useWithAuth();

	return (
		<aside className={styles.left__side}>
			<PageSettings />
			<PageMembers members={members} owner={owner} token={token} pageId={router.query.pageId as string} />
			<OtherPages token={token} />
		</aside>
	);
};

export default PageLeftSide;
