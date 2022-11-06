import Head from "next/head";

import { HiDocumentSearch, HiPlusSm } from "react-icons/hi";
import { getGreetingMessage } from "helpers/getGreetingMessage";
import { useGetUserPagesQuery } from "features/page/pagesApi";

import Link from "next/link";
import Container from "components/UI/Container";
import onlyAuth from "components/HOC/withAuth";
import StickyAddPageButton from "components/page/StickyAddPageButton";
import PagesDropdown from "components/page/PagesDropdown/PagesDropdown";
import SpinnerCentered from "components/UI/SpinnerCentered";
import useAuth from "hooks/useAuth";

import styles from "styles/pages/Pages.module.scss";

const Home = () => {
	const { isAuth, user } = useAuth();
	const { data: pages, isLoading } = useGetUserPagesQuery(null, { skip: !isAuth, refetchOnMountOrArgChange: true });

	return (
		<Container>
			<Head>
				<title>Your pages | Mipage</title>
			</Head>
			<div className={styles.welcome__msg}>
				<h1>
					{getGreetingMessage()}, {user!.username}!
				</h1>
				<p>Visit your pages or pages you are a member of now!</p>
			</div>

			{isLoading && <SpinnerCentered />}

			{!isLoading && pages?.length ? <PagesDropdown pages={pages!} userId={user!.id} /> : null}

			{!isLoading && !pages?.length && (
				<div className={styles.no__pages}>
					<HiDocumentSearch size={96} />
					<p>You {"don't"} have any pages yet, create one now!</p>
					<Link href="pages/new">
						<a className={styles.create__page__btn}>
							<HiPlusSm size={26} /> <span>New Page</span>
						</a>
					</Link>
				</div>
			)}

			<StickyAddPageButton />
		</Container>
	);
};

export default onlyAuth(Home, { forceRedirect: true });
