import { useEffect, useState } from "react";
import { MdContentCopy } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";

import styles from "./CodeBlockCopyButton.module.scss";

interface CodeBlockCopyButtonProps {
	code: string;
}

const CodeBlockCopyButton: React.FC<CodeBlockCopyButtonProps> = ({ code }) => {
	const [clicked, setClicked] = useState(false);

	useEffect(() => {
		let timeout: NodeJS.Timeout;

		if (clicked) {
			timeout = setTimeout(() => setClicked(false), 1500);
		}

		return () => clearTimeout(timeout);
	}, [clicked]);

	const handleCopyClick = () => {
		navigator.clipboard.writeText(code);
		setClicked(true);
	};

	return (
		<button className={`${styles.button} ${clicked ? styles.active : ""}`} onClick={handleCopyClick} title="Copy">
			{clicked ? <IoMdCheckmark size={18} /> : <MdContentCopy size={18} />}
		</button>
	);
};

export default CodeBlockCopyButton;
