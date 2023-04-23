import Head from "next/head";
import { useGetSinglePageQuery, useGetSinglePublicPageQuery } from "features/page/pagesApi";
import { useRouter } from "next/router";
import { PageType } from "models";

import PageCenter from "components/page/PageCenter";
import PageErrorLoading from "components/page/PageErrorLoading";
import FullPageLoadingSpinner from "components/UI/FullPageLoadingSpinner";
import PageLeftSide from "components/page/PageLeftSide";
import useAuth from "hooks/useAuth";

import styles from "styles/pages/Page.module.scss";

const Page = () => {
	const router = useRouter();
	const { isAuth } = useAuth({ onlyAuth: false });

	const pageId = router.query.pageId as string;

	const {
		data: dataPublic,
		isError: isErrorPub,
		isLoading: isLoadingPub,
	} = useGetSinglePublicPageQuery({ pageId }, { skip: !pageId || isAuth });

	const {
		data: dataPrivate,
		isError: isErrorPrivate,
		isLoading: isLoadingPrivate,
	} = useGetSinglePageQuery({ pageId }, { skip: !pageId || !isAuth });

	if (isErrorPrivate || isErrorPub) {
		return <PageErrorLoading />;
	}

	if (isLoadingPrivate || isLoadingPub) {
		return <FullPageLoadingSpinner isLoading />;
	}

	const data = dataPrivate ?? dataPublic;

	if (!data) {
		return <PageErrorLoading />;
	}

	if (data.type === PageType.notebook && !router.query.n) {
		// TODO: Edge case - force open "Add a new notebook" modal if notebooks array is empty.
		router.replace(`${router.asPath}?n=${data.notebooks[0].id}`);
	}

	return (
		<main className={styles.page}>
			<Head>
				<title>{data!.title} | Mipage</title>
			</Head>
			<PageLeftSide members={data!.members} owner={data!.owner} title={data!.title} isPrivate={data!.isPrivate} />
			<PageCenter pageType={data!.type} pageId={data!.id} />
		</main>
	);
};

export default Page;
