import { Page } from "models";

import PageCard from "components/Page/PageCard";
import Link from "next/link";
import Container from "components/UI/Container";
import AddPageCard from "components/Page/AddPageCard";

import { useGetUserPagesQuery } from "features/page/pagesApi";
import { HiOutlinePlus } from "react-icons/hi";

import styles from "styles/pages/Pages.module.scss";
import PageCardSkeleton from "components/UI/PageCardSkeleton";

const Home = () => {
	const { data: pages, isLoading } = useGetUserPagesQuery(null, { skip: false });

	return (
		<Container>
			<h5 className={styles.heading}>My Pages</h5>
			{pages && <p className={styles.no__found}>You {"don't"} have any pages yet, create one now!</p>}
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
						/>
					))}
				<AddPageCard />
			</div>
			<div className={styles.sticky__rb}>
				<Link href="/pages/new">
					<a className="h-full w-full flex items-center justify-center">
						<HiOutlinePlus color="white" size={20} />
					</a>
				</Link>
			</div>
			<Link href="/">
				<a>back</a>
			</Link>
		</Container>
	);
};

export default Home;
