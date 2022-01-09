import { PageMember, PageOwner, User } from "models";

import Avatar from "components/Avatar";

import styles from "./PageMembers.module.scss";

interface PageMembersProps {
	owner: PageOwner;
	members: PageMember[];
}

export const PageMembers: React.FC<PageMembersProps> = ({ owner, members }) => {
	return (
		<div className="card">
			<h3>Owner</h3>
			<Avatar username={owner.username} avatar={owner.avatar} />
			<p>{owner.username}</p>
			<h3>Members</h3>
			<ul>
				{members.map((m) => (
					<Avatar key={m.id} username={m.username} avatar={m.avatar} />
				))}
			</ul>
		</div>
	);
};

export default PageMembers;
