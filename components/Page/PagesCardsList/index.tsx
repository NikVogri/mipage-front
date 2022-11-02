import { Page } from "models";
import { useEffect, useState } from "react";
import { HiChevronDown } from "react-icons/hi";

import PageCard from "../PageCard";

import styles from "./PagesCardsList.module.scss";

interface PagesCardsListProps {
	pages: Page[];
	title: string;
	showItemsInit?: boolean;
}

export const PagesCardsList: React.FC<PagesCardsListProps> = ({ pages, title, showItemsInit = false }) => {
	const [showItems, setShowItems] = useState(showItemsInit);

	useEffect(() => {
		setShowItems(showItemsInit);
	}, [showItemsInit]);

	return (
		<div>
			{title && (
				<div className={styles.items__controlls}>
					<h5>{title}</h5>
					<hr />
					<button title={showItems ? "Hide" : "Expand"} onClick={() => setShowItems(!showItems)}>
						<HiChevronDown size={20} />
					</button>
				</div>
			)}

			<div className={`${styles.pages__cards__list} ${showItems ? styles.active : ""}`}>
				{pages?.length ? (
					pages.map((page: Page) => (
						<PageCard
							key={page.id}
							title={page.title}
							id={page.id}
							type={page.type}
							isPrivate={page.private}
							owner={page.owner}
							members={page.members}
							notebooks={page.notebooks}
						/>
					))
				) : (
					<span>No pages found</span>
				)}
			</div>
		</div>
	);
};

export default PagesCardsList;
