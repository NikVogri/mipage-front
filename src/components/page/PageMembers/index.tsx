import Avatar from "components/UI/Avatar";
import { useState } from "react";
import { PageMember, PageOwner } from "models";
import { HiDotsHorizontal } from "react-icons/hi";

import MembersModal from "components/modals/MembersModal";

import styles from "./PageMembers.module.scss";

interface PageMembersProps {
	owner: PageOwner;
	members: PageMember[];
	pageId: string;
}

export const PageMembers: React.FC<PageMembersProps> = ({ owner, members, pageId }) => {
	const [showMembersModal, setShowMembersModal] = useState(false);

	return (
		<>
			<div className={`${styles.page__members}`}>
				<div className={styles.card_head_container}>
					<h3>Members ({members.length + 1})</h3>
					<div className={styles.button_container}>
						<button onClick={() => setShowMembersModal(true)}>
							<HiDotsHorizontal size={16} />
						</button>
					</div>
				</div>

				{/* TODO: make this look better */}
				<ul className={styles.members__container}>
					<li style={{ transform: `translateX(-${0 * 20}px)`, zIndex: `30` }}>
						<Avatar
							key={owner?.id}
							username={owner?.username}
							avatar={owner?.avatar}
							outline="#fd6868"
							size="md"
						/>
					</li>

					{members.slice(0, 7).map((m, index) => (
						<li
							key={index}
							style={{ transform: `translateX(-${(index + 1) * 10}px)`, zIndex: `${8 - index}` }}
						>
							<Avatar key={m.id} username={m.username} avatar={m.avatar} size="md" />
						</li>
					))}

					{members.length - 7 > 0 && (
						<li style={{ transform: `translateX(-${(7 + 1) * 10}px)`, zIndex: `1` }}>
							<Avatar.Additional additionalCount={members.length - 7} size="md" />
						</li>
					)}
				</ul>
			</div>
			{showMembersModal && (
				<MembersModal
					owner={owner}
					isOpen={showMembersModal}
					setIsClosed={() => setShowMembersModal(false)}
					setIsOpen={setShowMembersModal}
					pageId={pageId}
					members={members}
				/>
			)}
		</>
	);
};

export default PageMembers;
