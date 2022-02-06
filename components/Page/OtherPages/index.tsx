import { useRouter } from "next/router";
import { PageType, SidebarPage } from "models";
import { useGetSidebarPagesQuery } from "features/page/pagesApi";

import Link from "next/link";
import LoadingSpinner from "components/LoadingSpinner";

import styles from "./OtherPages.module.scss";
import NotebooksLinkDropdown from "../NotebooksLinkDropdown";
import TodoPageLink from "../TodoPageLink";
import { BsPlus } from "react-icons/bs";

interface OtherPagesProps {}

const OtherPages: React.FC<OtherPagesProps> = () => {
	const router = useRouter();
	const { data, isLoading, isError } = useGetSidebarPagesQuery(null, { skip: false });

	if (isLoading) {
		return (
			<aside className={`card ${styles.other__pages}`}>
				<LoadingSpinner />
			</aside>
		);
	}

	if (isError) {
		<aside className={`card ${styles.other__pages}`}>
			<p>Could not load</p>
		</aside>;
	}

	return (
		<aside className={`card ${styles.other__pages}`}>
			<div className={styles.card_head_container}>
				<h3>Other Pages</h3>
				<Link href="/pages/new">
					<a className={styles.create_page_btn} title="Create a new page">
						<BsPlus size={32} />
					</a>
				</Link>
			</div>
			<ul className={styles.other__pages_list}>
				{data!.map((page: SidebarPage) => {
					if (page.type === PageType.todo) {
						return (
							<TodoPageLink
								pageId={page.id}
								title={page.title}
								active={router.query.pageId === page.id}
							/>
						);
					}

					if (page.type === PageType.notebook) {
						return (
							<NotebooksLinkDropdown
								pageId={page.id}
								notebooks={page.notebooks!}
								title={page.title}
								activeNotebookId={router.query.n as string | undefined}
								active={router.query.pageId === page.id}
							/>
						);
					}

					return <></>;
				})}
			</ul>
		</aside>
	);
};

export default OtherPages;
