import { useState } from "react";

import styles from "./HoverPopover.module.scss";

interface PopoverProps {
	children: React.ReactNode;
	text: string;
}
const HoverPopover: React.FC<PopoverProps> = ({ children, text }) => {
	const [showPopover, setShowPopover] = useState(false);

	return (
		<div className={styles.popover__parent}>
			<div onMouseOver={() => setShowPopover(true)} onMouseLeave={() => setShowPopover(false)}>
				{children}
			</div>
			{showPopover && <div className={styles.popover__content}>{text}</div>}
		</div>
	);
};

export default HoverPopover;
