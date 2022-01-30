import { PageMember, PageOwner } from "models";
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useMemo, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import { useAddMemberToPageMutation, useRemoveMemberFromPageMutation } from "features/member/memberApi";
import { useLazyGetUsersQuery } from "features/user/userApi";

import LoadingWrapper from "components/UI/LoadingWrapper";
import Modal from "components/UI/Modal";
import Avatar from "components/Avatar";

import styles from "./PageMembers.module.scss";
import useWithAuth from "hooks/useWithAuth";
interface PageMembersProps {
	owner: PageOwner;
	members: PageMember[];
	pageId: string;
}
interface AddMembersModalProps {
	isOpen: boolean;
	token: string;
	pageId: string;
	members: PageMember[];
	owner: PageOwner;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	setIsClosed: () => void;
}

const AddMembersModal: React.FC<AddMembersModalProps> = ({
	isOpen,
	setIsOpen,
	setIsClosed,
	token,
	pageId,
	members,
	owner,
}) => {
	const [fetchUserList, { data, isFetching: isFetchingUserList }] = useLazyGetUsersQuery();
	let [addMemberToPage, { isLoading: isLoadingAddMember }] = useAddMemberToPageMutation();
	let [removeMemberFromPage, { isLoading: isLoadingRemoveMember }] = useRemoveMemberFromPageMutation();

	const [toInviteUserEmail, setToInviteUserEmail] = useState("");
	const [toRemoveUser, setToRemoveUser] = useState("");

	const handleSearchUser = async (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.value.length) return;
		await fetchUserList({ query: e.target.value, token });
	};

	const handleAddUserToPage = async (email: string) => {
		setToInviteUserEmail(email);
		await addMemberToPage({ email, token, pageId });
		setToInviteUserEmail("");
	};

	const handleRemoveUserFromPage = async (id: string) => {
		setToRemoveUser(id);
		await removeMemberFromPage({ id, token, pageId });
		setToRemoveUser("");
	};

	const memberOrOwner = useCallback(
		(id: string) => members.some((m: PageMember) => m.id === id) || owner?.id === id,
		[members, owner.id]
	);

	const users = useMemo(() => (data ? data : [owner, ...members]), [data, members, owner]);

	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen} contentLabel="Manage page members">
			<Modal.Head title="Manage page members" closeModal={setIsClosed} />
			<form className={styles.search__for_users__form}>
				<div className="form-group">
					<label className="label" htmlFor="search-for-users">
						Search for users by their username or email
					</label>
					<DebounceInput
						id="search-for-users"
						minLength={2}
						debounceTimeout={500}
						onChange={handleSearchUser}
						className="form-control form-control-modal"
					/>
				</div>
			</form>

			{isFetchingUserList && (
				<LoadingWrapper isLoading={true} size={24} className={styles.loader} delay={0}>
					<span></span>
				</LoadingWrapper>
			)}
			{!isFetchingUserList && (
				<div className={styles.user__results}>
					{!users.length && <span className={styles.user__results__no__found}>No users found</span>}
					{users.length > 0 && (
						<ul>
							{users.map((u) => (
								<li className={styles.user__item} key={u.id}>
									<div className={styles.results__username__container}>
										<Avatar username={u.username} avatar={u.avatar} size="md" />
										<span className={styles.results__username}>{u.username}</span>
									</div>
									<span>{u.email}</span>
									{memberOrOwner(u.id) ? (
										owner.id === u.id ? (
											<button
												title="Remove from page"
												className={styles.owner__btn}
												disabled={true}
											>
												Owner
											</button>
										) : (
											<LoadingWrapper
												isLoading={isLoadingRemoveMember && u.id === toRemoveUser}
												size={16}
												delay={500}
												className={styles.loader__invite}
											>
												<button
													title="Remove from page"
													onClick={() => handleRemoveUserFromPage(u.id)}
													className={styles.kick__btn}
													disabled={isLoadingRemoveMember}
												>
													Kick
												</button>
											</LoadingWrapper>
										)
									) : (
										<LoadingWrapper
											isLoading={isLoadingAddMember && u.email === toInviteUserEmail}
											size={16}
											delay={500}
											className={styles.loader__invite}
										>
											<button
												title="Add to page"
												onClick={() => handleAddUserToPage(u.email)}
												disabled={isLoadingAddMember}
											>
												Add
											</button>
										</LoadingWrapper>
									)}
								</li>
							))}
						</ul>
					)}
				</div>
			)}
		</Modal>
	);
};

export const PageMembers: React.FC<PageMembersProps> = ({ owner, members, pageId }) => {
	const [showInviteMembersModal, setShowInviteMembersModal] = useState(false);
	const { id, token } = useWithAuth();

	return (
		<>
			<div className={`card ${styles.page__members}`}>
				<h3>Members ({members.length + 1})</h3>

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

				{owner.id === id && (
					<div className={styles.button_container}>
						<button
							className="form-button btn-md"
							title="Add new members"
							onClick={() => setShowInviteMembersModal(true)}
						>
							Manage members
						</button>
					</div>
				)}
			</div>
			<AddMembersModal
				token={token}
				owner={owner}
				isOpen={showInviteMembersModal}
				setIsClosed={() => setShowInviteMembersModal(false)}
				setIsOpen={setShowInviteMembersModal}
				pageId={pageId}
				members={members}
			/>
		</>
	);
};

export default PageMembers;
