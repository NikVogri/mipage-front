import useWithAuth from "hooks/useWithAuth";
import { PageMember } from "models";

import OtherPages from "../OtherPages";
import PageMembers from "../PageMembers";
import PageSettings from "../PageSettings";

import styles from "./PageLeftSide.module.scss";

interface PageLeftSideProps {
	members: PageMember[];
	owner: PageMember;
}

export const PageLeftSide: React.FC<PageLeftSideProps> = ({ members, owner }) => {
	const { token } = useWithAuth();

	return (
		<aside className={styles.left__side}>
			<PageSettings />
			<PageMembers members={members} owner={owner} />
			<OtherPages token={token} />
		</aside>
	);
};

export default PageLeftSide;
