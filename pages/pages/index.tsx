import Head from "next/head";
import { Page } from "models";

import PageCard from "components/Page/PageCard";
import Link from "next/link";
import Container from "components/UI/Container";
import AddPageCard from "components/Page/AddPageCard";

import { useGetUserPagesQuery } from "features/page/pagesApi";

import PageCardSkeleton from "components/UI/PageCardSkeleton";
import StickyAddPageButton from "components/StickyAddPageButton";
import useAuth from "hooks/useAuth";
import onlyAuth from "components/HOC/withAuth";

import styles from "styles/pages/Pages.module.scss";
import { getGreetingMessage } from "helpers/getGreetingMessage";
import PagesCardsList from "components/Page/PagesCardsList";
import { useMemo } from "react";

const Home = () => {
	const { isAuth, user } = useAuth();
	const { data: pages, isLoading } = useGetUserPagesQuery(null, { skip: !isAuth });

	const sortedPages = useMemo(() => {
		const output: {
			yourPages: Page[];
			allPages: Page[];
			memberOfPages: Page[];
		} = { yourPages: [], allPages: [], memberOfPages: [] };

		output.allPages = pages || [];
		output.memberOfPages = pages?.filter((page: Page) => page.members.some((member) => member.id === user?.id))!;
		output.yourPages = pages?.filter((page: Page) => page.owner.id === user?.id)!;

		return output;
	}, [pages, user?.id]);

	if (isLoading) {
		return (
			<Container>
				<h5 className={styles.heading}>My Pages</h5>
				<div className={styles.pages__container}>
					{new Array(5).fill(0).map((_, i) => (
						<PageCardSkeleton key={i} />
					))}
				</div>
			</Container>
		);
	}

	return (
		<Container>
			<Head>
				<title>Your pages | Mipage</title>
			</Head>
			<div className={styles.welcome__msg}>
				<h1>
					{getGreetingMessage()}, {user?.username}!
				</h1>
				<p>Visit your pages or pages you are a member of now!</p>
			</div>

			{pages && !pages.length && (
				<p className={styles.no__found}>You {"don't"} have any pages yet, create one now!</p>
			)}

			<PagesCardsList
				pages={sortedPages.yourPages}
				title="Your pages"
				showItemsInit={!!sortedPages.yourPages.length}
			/>
			<PagesCardsList
				pages={sortedPages.memberOfPages}
				title="Pages you are a member of"
				showItemsInit={!!sortedPages.memberOfPages.length}
			/>
			<PagesCardsList pages={sortedPages.allPages} title="All pages" showItemsInit />

			<StickyAddPageButton />
			<Link href="/">
				<a>back</a>
			</Link>
		</Container>
	);
};

export default onlyAuth(Home, { forceRedirect: true });
