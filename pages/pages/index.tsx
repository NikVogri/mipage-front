import Head from "next/head";
import { Page } from "models";
import { useMemo } from "react";
import { MdAdd } from "react-icons/md";
import { HiDocumentSearch } from "react-icons/hi";
import { getGreetingMessage } from "helpers/getGreetingMessage";
import { useGetUserPagesQuery } from "features/page/pagesApi";

import Link from "next/link";
import Container from "components/UI/Container";
import onlyAuth from "components/HOC/withAuth";
import StickyAddPageButton from "components/StickyAddPageButton";
import useAuth from "hooks/useAuth";
import PagesCardsList from "components/Page/PagesCardsList";
import LoadingWrapper from "components/UI/LoadingWrapper";

import styles from "styles/pages/Pages.module.scss";

const Home = () => {
	const { isAuth, user } = useAuth();
	const { data: pages = [], isLoading } = useGetUserPagesQuery(null, { skip: !isAuth });

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

			<LoadingWrapper isLoading={isLoading} className={styles.loading__wrapper} spinnerCenter SpinnerSize={26}>
				{pages && !pages.length ? (
					<div className={styles.no__found}>
						<HiDocumentSearch size={128} />
						<p>You {"don't"} have any pages yet, create one now!</p>
						<Link href="pages/new">
							<a className={styles.create__page__btn}>
								<MdAdd size={26} /> <span>Create new page</span>
							</a>
						</Link>
					</div>
				) : (
					<div>
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
					</div>
				)}
			</LoadingWrapper>
			<StickyAddPageButton />

			<Link href="/">
				<a>back</a>
			</Link>
		</Container>
	);
};

export default onlyAuth(Home, { forceRedirect: true });
