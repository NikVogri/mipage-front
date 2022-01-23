import { Page } from "models";

import PageCard from "components/Page/PageCard";
import Link from "next/link";
import Container from "components/UI/Container";
import AddPageCard from "components/Page/AddPageCard";

import { useGetUserPagesQuery } from "features/page/pagesApi";

import styles from "styles/pages/Pages.module.scss";
import PageCardSkeleton from "components/UI/PageCardSkeleton";
import useWithAuth from "hooks/useWithAuth";
import StickyAddPageButton from "components/StickyAddPageButton";

const Home = () => {
	const { token } = useWithAuth();
	const { data: pages, isLoading } = useGetUserPagesQuery(token, { skip: !token });

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
			<h5 className={styles.heading}>My Pages</h5>
			{pages && !pages.length && (
				<p className={styles.no__found}>You {"don't"} have any pages yet, create one now!</p>
			)}
			<div className={styles.pages__container}>
				{pages &&
					pages.map((page: Page) => (
						<PageCard
							key={page.id}
							title={page.title}
							id={page.id}
							type={page.type}
							isPrivate={false}
							owner={page.owner}
							members={page.members}
							notebooks={page.notebooks}
						/>
					))}
				<AddPageCard />
			</div>
			<StickyAddPageButton />
			<Link href="/">
				<a>back</a>
			</Link>
		</Container>
	);
};

export default Home;
