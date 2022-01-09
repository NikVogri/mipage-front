import { useRouter } from "next/router";
import { useGetSinglePageQuery } from "features/page/pagesApi";

import useWithAuth from "hooks/useWithAuth";

import styles from "../../styles/pages/Page.module.scss";
import PageLeftSide from "components/Page/PageLeftSide";
import PageRightSide from "components/Page/PageRightSide";
import PageCenter from "components/Page/PageCenter";
import SpinnerCentered from "components/UI/SpinnerCentered";
import PageErrorLoading from "components/Page/PageErrorLoading";

const Page = () => {
	const router = useRouter();
	const { token } = useWithAuth();
	const { data, isError, isLoading } = useGetSinglePageQuery(
		{ token, pageId: router.query.pageId as string },
		{ skip: false }
	);

	if (isError) {
		return <PageErrorLoading />;
	}

	if (isLoading) {
		return <SpinnerCentered />;
	}

	return (
		<main className={styles.page}>
			<PageLeftSide />
			<PageCenter pageType={data!.type} pageId={data!.id} />
			<PageRightSide members={data!.members} owner={data!.owner} />
		</main>
	);
};

export default Page;
