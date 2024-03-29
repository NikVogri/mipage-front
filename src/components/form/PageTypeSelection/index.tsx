import { PageType } from "models";
import { BsCardChecklist, BsBook } from "react-icons/bs";

import SelectCard from "components/form/SelectCard";

import styles from "./PageTypeSelection.module.scss";

interface PageTypeStepProps {
	setType: (pageType: PageType) => void;
	pageType: PageType;
}

const PageTypeSelection: React.FC<PageTypeStepProps> = ({ setType, pageType }) => {
	return (
		<>
			<h2 className={styles.heading__section}>Select page type</h2>

			<div className={styles.selection__container}>
				<SelectCard id="todo" isActive={pageType === PageType.todo} onSelect={() => setType(PageType.todo)}>
					<h3 className={styles.title}>Todo List</h3>
					<BsCardChecklist size={64} />
					<p className={styles.description}>Never forget anything, create multiple to-do lists</p>
				</SelectCard>
				<SelectCard
					id="notebook"
					isActive={pageType === PageType.notebook}
					onSelect={() => setType(PageType.notebook)}
				>
					<h3 className={styles.title}>Notebook</h3>
					<BsBook size={64} />
					<p className={styles.description}>Your own accessible anywhere digital notebook</p>
				</SelectCard>
			</div>
		</>
	);
};

export default PageTypeSelection;
