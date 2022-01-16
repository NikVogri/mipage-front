import { ReactElement } from "react";

import styles from "./EditorTool.module.scss";

interface EditorToolProps {
	onClick: () => void;
	icon: ReactElement<any, any>;
	active: boolean;
}

const EditorTool: React.FC<EditorToolProps> = ({ onClick, icon, active }) => {
	return (
		<button onClick={onClick} type="button" className={`${styles.tool} ${active ? styles.active : ""}`}>
			{icon}
		</button>
	);
};

export default EditorTool;
