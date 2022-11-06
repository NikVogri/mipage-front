import React from "react";
import { PageMember, PageOwner } from "models";

import MembersListItem from "components/members/MembersListItem";

import styles from "./MembersList.module.scss";

interface MembersListProps {
	users: PageMember[];
	owner: PageOwner;
	pageId: string;
}

const MembersList: React.FC<MembersListProps> = ({ owner, users, pageId }) => {
	if (users.length > 0) {
		return (
			<div className={styles.members__container}>
				<ul>
					{users.map((u: PageMember) => (
						<MembersListItem
							key={u.id}
							pageId={pageId}
							ownerId={owner.id}
							avatar={u.avatar}
							email={u.email}
							id={u.id}
							username={u.username}
						/>
					))}
				</ul>
			</div>
		);
	}

	return (
		<div className={styles.members__container}>
			<span className={styles.no__members}>No members yet</span>
		</div>
	);
};

export default MembersList;
