import { MdOutlineTextFields, MdCode } from "react-icons/md";
import { NotebookBlockType, NotebookDeviderMenuItem } from "models";
import { useEffect, useRef, useState } from "react";

import styles from "./NotebookBlockDeviderMenu.module.scss";

interface NotebookBlockDeviderMenuProps {
	onSelect: (type: NotebookBlockType) => void;
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

const NotebookBlockDeviderMenu: React.FC<NotebookBlockDeviderMenuProps> = ({ onSelect }) => {
	const [position, setPosition] = useState<"top" | "bottom">("bottom");

	const menuRef = useRef<HTMLUListElement>(null);

	useEffect(() => {
		const rect = menuRef.current?.getBoundingClientRect()!;
		const isInViewPort = rect.bottom <= window.innerHeight;

		if (!isInViewPort) {
			setPosition("top");
		}
	}, []);

	return (
		<ul className={`${styles.menu} ${position ? styles[position] : ""}`} ref={menuRef}>
			{items.map((item) => (
				<li key={item.type}>
					<button onClick={() => onSelect(item.type)}>{item.icon}</button>
				</li>
			))}
		</ul>
	);
};

export default NotebookBlockDeviderMenu;
