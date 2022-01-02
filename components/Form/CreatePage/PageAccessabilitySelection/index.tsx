import SelectCard from "components/Form/SelectCard";
import { useState } from "react";

import { MdPublic, MdLock } from "react-icons/md";

import styles from "./PageAccessabilitySelection.module.scss";

interface PageAccessabilityStepProps {
	setPrivate: (isPrivate: boolean) => void;
	isPrivate: boolean;
}

const PageAccessabilitySelection: React.FC<PageAccessabilityStepProps> = ({ setPrivate, isPrivate }) => {
	return (
		<>
			<h2 className="heading__section">Select page visibility</h2>
			<div className={styles.selection__container}>
				<SelectCard id="public" isActive={!isPrivate} onSelect={() => setPrivate(false)}>
					<h3 className={styles.title}>Public</h3>
					<MdPublic size={64} />
					<p className={styles.description}>Accessible to anyone with a link</p>
				</SelectCard>
				<SelectCard id="private" isActive={isPrivate} onSelect={() => setPrivate(true)}>
					<h3 className={styles.title}>Private</h3>
					<MdLock size={64} />
					<p className={styles.description}>Only invited users can access this page</p>
				</SelectCard>
			</div>
		</>
	);
};

export default PageAccessabilitySelection;
