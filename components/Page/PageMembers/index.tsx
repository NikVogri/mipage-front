import { PageMember, PageOwner } from "models";

import Avatar from "components/Avatar";

import styles from "./PageMembers.module.scss";

interface PageMembersProps {
	owner: PageOwner;
	members: PageMember[];
}

export const PageMembers: React.FC<PageMembersProps> = ({ owner, members }) => {
	return (
		<div className={`card ${styles.page__members}`}>
			<h3>Members ({members.length + 1})</h3>
			<ul className={styles.members__container}>
				<li style={{ transform: `translateX(-${0 * 20}px)`, zIndex: `${8 - -1}` }}>
					<Avatar
						key={owner?.id}
						username={owner?.username}
						avatar={owner?.avatar}
						outline="#fd6868"
						size="md"
					/>
				</li>

				{members.slice(0, 7).map((m, index) => (
					<li key={index} style={{ transform: `translateX(-${(index + 1) * 10}px)`, zIndex: `${8 - index}` }}>
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
	);
};

export default PageMembers;
