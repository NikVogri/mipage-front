import { MdOutlineTextFields, MdCode } from "react-icons/md";
import { NotebookBlockType, NotebookDeviderMenuItem } from "models";

import styles from "./NotebookBlockDeviderMenu.module.scss";

interface NotebookBlockDeviderMenuProps {
	onSelect: (type: NotebookBlockType) => void;
	show: boolean;
}

const items: NotebookDeviderMenuItem[] = [
	{
		icon: <MdOutlineTextFields size={22} />,
		type: NotebookBlockType.richText,
	},
	{
		icon: <MdCode size={22} />,
		type: NotebookBlockType.code,
	},
];

const NotebookBlockDeviderMenu: React.FC<NotebookBlockDeviderMenuProps> = ({ onSelect, show }) => {
	return (
		<ul className={`${styles.menu} ${show ? styles.show : ""}`}>
			{items.map((item) => (
				<li>
					<button onClick={() => onSelect(item.type)}>{item.icon}</button>
				</li>
			))}
		</ul>
	);
};

export default NotebookBlockDeviderMenu;
