import React from "react";

import Link from "next/link";

import styles from "./AddPageCard.module.scss";

const AddPageCard = (): JSX.Element => {
	return (
		<Link href={`/pages/new`}>
			<a title="Create new page" className={styles.page__card_wrapper}>
				<div className={styles.page__card}>
					<svg
						className={styles.svg}
						xmlns="http://www.w3.org/2000/svg"
						width="65"
						height="65"
						viewBox="0 0 24 24"
					>
						<g fill="none">
							<path
								d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							></path>
						</g>
					</svg>
				</div>
			</a>
		</Link>
	);
};

export default AddPageCard;
