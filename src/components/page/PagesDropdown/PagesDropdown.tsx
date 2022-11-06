import React, { useEffect, useState } from "react";

import { Page } from "models";

import PagesCardsList from "../PagesCardsList";

interface SortedPages {
	your: Page[];
	all: Page[];
	memberOf: Page[];
}

interface PagesDropdownProps {
	pages: Page[];
	userId: string;
}

const PagesDropdown: React.FC<PagesDropdownProps> = ({ pages, userId }) => {
	const [sortedPages, setSortedPages] = useState<SortedPages>({
		all: [],
		your: [],
		memberOf: [],
	});

	useEffect(() => {
		setSortedPages((sp) => {
			const sorted = { ...sp };

			sorted.all = pages || [];
			sorted.memberOf = pages.filter((page: Page) => page.members.some((member) => member.id === userId))!;
			sorted.your = pages.filter((page: Page) => page.owner.id === userId)!;

			return sorted;
		});
	}, [pages, userId]);

	const hasOwnPages = !!sortedPages.your.length;
	const isMemberOfOtherPages = !!sortedPages.memberOf.length;

	return (
		<>
			<PagesCardsList pages={sortedPages.your} title="Your pages" showItemsInit={hasOwnPages} />
			<PagesCardsList
				pages={sortedPages.memberOf}
				title="Pages you are a member of"
				showItemsInit={isMemberOfOtherPages}
			/>
			<PagesCardsList pages={sortedPages.all} title="All pages" showItemsInit />
		</>
	);
};

export default PagesDropdown;
