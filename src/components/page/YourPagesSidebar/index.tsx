import { useRouter } from "next/router";
import { PageType, SidebarPage } from "models";
import { useGetSidebarPagesQuery } from "features/page/pagesApi";
import { HiPlus } from "react-icons/hi";

import Link from "next/link";
import NotebooksLinkDropdown from "../../notebook/NotebooksLinkDropdown";
import TodoPageLink from "../../todo/TodoPageLink";
import RectangleSkeleton from "components/skeletons/RectangleSkeleton";

import styles from "./YourPagesSidebar.module.scss";

interface YourPagesSidebarProps {}

const YourPagesSidebar: React.FC<YourPagesSidebarProps> = () => {
	const router = useRouter();
	const { data, isError, isLoading } = useGetSidebarPagesQuery(null, { skip: false });

	if (isError) {
		<aside className={`card ${styles.your__pages__sidebar}`}>
			<p>Could not load</p>
		</aside>;
	}

	return (
		<aside className={`${styles.your__pages__sidebar}`}>
			<div className={styles.card_head_container}>
				<h3>Your Pages</h3>
				<Link href="/pages/new">
					<a className={styles.create_page_url} title="Create a new page">
						<HiPlus size={16} />
					</a>
				</Link>
			</div>
			{isLoading && (
				<>
					<RectangleSkeleton height={35} width={"100%"} styles={{ marginBottom: 5 }} />
					<RectangleSkeleton height={35} width={"100%"} styles={{ marginBottom: 5 }} />
					<RectangleSkeleton height={35} width={"100%"} styles={{ marginBottom: 5 }} />
					<RectangleSkeleton height={35} width={"100%"} styles={{ marginBottom: 5 }} />
				</>
			)}

			{data && (
				<ul className={styles.your__pages__sidebar_list}>
					{data!.map((page: SidebarPage, index) => {
						if (page.type === PageType.todo) {
							return (
								<TodoPageLink
									key={index}
									pageId={page.id}
									title={page.title}
									active={router.query.pageId === page.id}
									isOwner={page.isOwner}
								/>
							);
						}

						if (page.type === PageType.notebook) {
							return (
								<NotebooksLinkDropdown
									key={index}
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
			)}
		</aside>
	);
};

export default YourPagesSidebar;
