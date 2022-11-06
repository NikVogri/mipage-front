import Link from "next/link";
import { HiOutlinePlus } from "react-icons/hi";

import styles from "./StickyAddPageButton.module.scss";

function StickyAddPageButton() {
	return (
		<div className={styles.add_page_btn}>
			<Link href="/pages/new">
				<a className="h-full w-full flex items-center justify-center">
					<HiOutlinePlus color="white" size={20} />
				</a>
			</Link>
		</div>
	);
}

export default StickyAddPageButton;
