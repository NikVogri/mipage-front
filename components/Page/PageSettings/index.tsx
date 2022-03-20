import PageSettingsModal from "components/UI/modals/PageSettingsModal/PageSettingsModal";
import SidebarButton from "components/UI/SidebarButton/SidebarButton";
import { useState } from "react";
import { HiPencil } from "react-icons/hi";

import styles from "./PageSettings.module.scss";

interface PageSettingsProps {
	pageId: string;
	title: string;
	isPrivate: boolean;
}

const PageSettings: React.FC<PageSettingsProps> = ({ pageId, title, isPrivate }) => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<div className={`${styles.page__settings}`}>
				<h3>Settings</h3>
				<div className={styles.button_container}>
					<SidebarButton onClick={() => setShowModal(true)}>
						<HiPencil size={16} />
					</SidebarButton>
				</div>
			</div>
			<PageSettingsModal
				isOpen={showModal}
				setIsClosed={() => setShowModal(false)}
				setIsOpen={setShowModal}
				pageId={pageId}
				title={title}
				isPrivate={isPrivate}
			/>
		</>
	);
};

export default PageSettings;
