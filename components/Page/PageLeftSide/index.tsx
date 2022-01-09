import useWithAuth from "hooks/useWithAuth";

import OtherPages from "../OtherPages";

import styles from "./PageLeftSide.module.scss";

export const PageLeftSide: React.FC = () => {
	const { token } = useWithAuth();

	return (
		<aside className={styles.left__side}>
			<OtherPages token={token} />
		</aside>
	);
};

export default PageLeftSide;
