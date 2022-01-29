import useWithAuth from "hooks/useWithAuth";
import { useGetSinglePageQuery } from "features/page/pagesApi";
import { useRouter } from "next/router";

import PageCenter from "components/Page/PageCenter";
import PageErrorLoading from "components/Page/PageErrorLoading";
import PageLeftSide from "components/Page/PageLeftSide";
import PageRightSide from "components/Page/PageRightSide";
import SpinnerCentered from "components/UI/SpinnerCentered";

import styles from "../../styles/pages/Page.module.scss";

const Page = () => {
	const router = useRouter();
	const { token } = useWithAuth();

	const { data, isError, isLoading } = useGetSinglePageQuery(
		{ token, pageId: router.query.pageId as string },
		{ skip: !process.browser || !router.query.pageId }
	);

	if (isError) {
		return <PageErrorLoading />;
	}

	if (isLoading || !data) {
		return <SpinnerCentered />;
	}

	return (
		<main className={styles.page}>
			<PageLeftSide members={data!.members} owner={data!.owner} />
			<PageCenter pageType={data!.type} pageId={data!.id} />
		</main>
	);
};

export default Page;
