import { Page, PageType } from "models";
import { MdLock, MdPublic } from "react-icons/md";
import { BsBook, BsCardChecklist } from "react-icons/bs";

import styles from "./NavPageSearchResultList.module.scss";
import Link from "next/link";

interface NavPageSearchResultListItemProps {
	page: Page;
	onSelect: (pageId: string) => void;
}

const NavPageSearchResultListItem: React.FC<NavPageSearchResultListItemProps> = ({ page, onSelect }) => {
	return (
		<li onClick={() => onSelect(page.id)}>
			<Link href={`/pages/${page.id}`}>
				<a className={styles.result__list__item}>
					<div>
						{page.type === PageType.notebook && <BsBook size={18} className={styles.visibility_icon} />}
						{page.type === PageType.todo && (
							<BsCardChecklist size={18} className={styles.visibility_icon} />
						)}
					</div>
					<p>{page.title}</p>
					<div>
						{page.isPrivate ? (
							<MdLock size={21} className={styles.type_icon} />
						) : (
							<MdPublic size={21} className={styles.type_icon} />
						)}
					</div>
				</a>
			</Link>
		</li>
	);
};

interface NavPageSearchResultListProps {
	hits: Page[];
	onHideList: () => void;
	onSelect: (pageId: string) => void;
}

const NavPageSearchResultList: React.FC<NavPageSearchResultListProps> = ({ hits, onHideList, onSelect }) => {
	if (!hits.length) {
		return (
			<div className={styles.result__container}>
				<p className={styles.no__hits}>No pages found...</p>
			</div>
		);
	}

	return (
		<div className={styles.result__container}>
			<ul>
				{hits.map((h) => (
					<NavPageSearchResultListItem key={h.id} page={h} onSelect={onSelect} />
				))}
			</ul>
		</div>
	);
};

export default NavPageSearchResultList;
