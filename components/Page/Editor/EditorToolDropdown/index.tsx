import { ReactElement, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";

import styles from "./EditorToolDropdown.module.scss";

interface EditorToolDropdownProps {
	onClick: () => void;
	icon: ReactElement<any, any>;
	active: boolean;
	dropdownChildren: any[];
}

const EditorToolDropdown: React.FC<EditorToolDropdownProps> = ({ onClick, icon, active, dropdownChildren }) => {
	const [showDropdown, setShowDropdown] = useState(false);
	return (
		<div>
			<div className={styles.primary_buttons}>
				<button type="button" className={`${styles.tool} ${active ? styles.active : ""}`}>
					{icon}
				</button>
				<button className={`${styles.tool} ${active ? styles.active : ""}`}>
					<AiFillCaretDown size={12} color="#fff" onClick={() => setShowDropdown(!showDropdown)} />
				</button>
			</div>
			{showDropdown && (
				<ul className={styles.dropdown}>
					{dropdownChildren.map((child) => (
						<li key={child.name}>
							<button>{child.text}</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default EditorToolDropdown;
