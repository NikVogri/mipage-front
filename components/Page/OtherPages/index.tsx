import { useRouter } from "next/router";
import { PageType, SidebarPage } from "models";
import { useGetSidebarPagesQuery } from "features/page/pagesApi";

import Link from "next/link";
import LoadingSpinner from "components/LoadingSpinner";

import styles from "./OtherPages.module.scss";

interface OtherPagesProps {
	token: string;
}

const OtherPages: React.FC<OtherPagesProps> = ({ token }) => {
	const router = useRouter();
	const { data, isLoading, isError } = useGetSidebarPagesQuery(token, { skip: false });

	const isCurrentPage = (id: string) => {
		return id === router.query.id;
	};

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
			<h3>Other Pages</h3>
			<ul>
				{data!.map((page: SidebarPage) => {
					// TODO: split this into components
					if (page.type === PageType.todo) {
						return isCurrentPage(page.id) ? (
							<li key={page.id}>{page.title}</li>
						) : (
							<li key={page.id}>
								<Link href={`/pages/${page.id}`}>
									<a>{page.title}</a>
								</Link>
							</li>
						);
					}

					if (page.type === PageType.notebook) {
						return (
							<div>
								<p>{page.title}</p>
								<ul>
									{page.notebooks!.map((notebook) => (
										<li key={notebook.id}>
											<Link href={`/pages/${page.id}?n=${notebook.id}`}>
												<a>{notebook.title}</a>
											</Link>
										</li>
									))}
								</ul>
							</div>
						);
					}

					return <></>;
				})}
			</ul>
		</aside>
	);
};

export default OtherPages;
