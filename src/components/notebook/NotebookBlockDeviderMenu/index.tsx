import { NotebookBlockType } from "models";
import { useEffect, useRef, useState } from "react";
import { notebookblockTypes } from "config/notebook-block-types";

import styles from "./NotebookBlockDeviderMenu.module.scss";

interface NotebookBlockDeviderMenuProps {
	onSelect: (type: NotebookBlockType) => void;
}

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
			{notebookblockTypes.map((nbt) => (
				<li key={nbt.type}>
					<button onClick={() => onSelect(nbt.type)}>{nbt.icon({ size: 22 })}</button>
				</li>
			))}
		</ul>
	);
};

export default NotebookBlockDeviderMenu;
