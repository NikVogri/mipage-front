import { useGetUserPagesQuery } from "features/page/pagesApi";
import { Page } from "models";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import useDetectClickOutside from "hooks/useDetectClickOutside";

import Fuse from "fuse.js";
import NavPageSearchResultList from "../NavPageSearchResultList";

import styles from "./NavPageSearch.module.scss";

interface NavPageSearchProps {}

const NavPageSearch: React.FC<NavPageSearchProps> = ({}) => {
	const router = useRouter();

	const { data, isLoading } = useGetUserPagesQuery(null);

	const [showList, setShowList] = useState(false);
	const [query, setQuery] = useState("");
	const [pagesResult, setPageResults] = useState<Page[]>(data ?? []);

	const pageSearchContainerRef = useRef(null);
	useDetectClickOutside(pageSearchContainerRef, () => {
		if (showList) setShowList(false);
	});

	useEffect(() => {
		if (data && !pagesResult.length) {
			const sortedPages = [...data].sort(
				(a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
			);

			setPageResults(sortedPages);
		}
	}, [data, showList]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const fuse = new Fuse(data ?? [], {
			shouldSort: true,
			threshold: 0.5,
			keys: [
				{
					name: "title",
					weight: 5,
				},
				{
					name: "members",
					weight: 0.25,
				},
				{
					name: "owner.username",
					weight: 0.5,
				},
			],
		});

		setQuery(e.target.value);
		setShowList(true);

		const results = fuse.search(e.target.value);
		const pages = results.map((i) => i.item);
		setPageResults(pages);
	};

	const handlePageSelect = (pageId: string) => {
		router.push(`/pages/${pageId}`);
		setShowList(false);
		setQuery("");
		setPageResults(data ?? []);
	};

	return (
		<div className={`${styles.page__search}`} ref={pageSearchContainerRef}>
			<input
				placeholder="Search pages by title, member or owner!"
				type="text"
				disabled={isLoading}
				onChange={handleChange}
				value={query}
				required
				onFocus={() => setShowList(true)}
			/>
			{showList && (
				<NavPageSearchResultList
					hits={pagesResult}
					onHideList={() => setShowList(false)}
					onSelect={handlePageSelect}
				/>
			)}
		</div>
	);
};

export default NavPageSearch;
