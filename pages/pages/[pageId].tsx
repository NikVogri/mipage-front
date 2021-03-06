import Head from "next/head";
import { useGetSinglePageQuery, useGetSinglePublicPageQuery } from "features/page/pagesApi";
import { useRouter } from "next/router";

import PageCenter from "components/Page/PageCenter";
import PageErrorLoading from "components/Page/PageErrorLoading";
import PageLeftSide from "components/Page/PageLeftSide";
import SpinnerCentered from "components/UI/SpinnerCentered";

import styles from "../../styles/pages/Page.module.scss";
import onlyAuth from "components/HOC/withAuth";
import useAuth from "hooks/useAuth";

const Page = () => {
	const router = useRouter();
	const { isAuth } = useAuth();

	const pageId = router.query.pageId as string;

	const {
		data: dataPublic,
		isError: isErrorPub,
		isLoading: isLoadingPub,
	} = useGetSinglePublicPageQuery({ pageId }, { skip: isAuth });

	const {
		data: dataPrivate,
		isError: isErrorPrivate,
		isLoading: isLoadingPrivate,
	} = useGetSinglePageQuery({ pageId }, { skip: !isAuth });

	if (isErrorPrivate || isErrorPub) {
		return <PageErrorLoading />;
	}

	if (isLoadingPrivate || isLoadingPub) {
		return <SpinnerCentered />;
	}

	const data = dataPrivate ?? dataPublic;

	if (!data) {
		return <PageErrorLoading />;
	}

	return (
		<main className={styles.page}>
			<Head>
				<title>{data!.title} | Mipage</title>
			</Head>
			<PageLeftSide members={data!.members} owner={data!.owner} title={data!.title} isPrivate={data!.private} />
			<PageCenter pageType={data!.type} pageId={data!.id} />
		</main>
	);
};

export default onlyAuth(Page, { forceRedirect: true, allowException: true });
