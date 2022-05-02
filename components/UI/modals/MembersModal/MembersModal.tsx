import { PageMember, PageOwner } from "models";
import { Dispatch, SetStateAction, useMemo } from "react";

import MembersList from "components/MembersList/MembersList";
import LoadingWrapper from "components/UI/LoadingWrapper";
import Modal from "components/UI/Modal";

import styles from "./MembersModal.module.scss";
import useAuth from "hooks/useAuth";
import AddUserToPageForm from "components/AddUserToPageForm/AddUserToPageForm";

interface AddMembersModalProps {
	isOpen: boolean;
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
	pageId,
	members,
	owner,
}) => {
	const { user } = useAuth();
	const authUserIsPageOwner = owner.id === user?.id;
	const sortedMembersWithOwner = useMemo(() => [owner, ...members], [owner, members]);

	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen} contentLabel="Page members">
			<Modal.Head title="Members" closeModal={setIsClosed} />

			{authUserIsPageOwner && <AddUserToPageForm pageId={pageId} />}

			{!members && (
				<LoadingWrapper isLoading={true} size={24} className={styles.loader} delay={0}>
					<span></span>
				</LoadingWrapper>
			)}

			<MembersList owner={owner} users={sortedMembersWithOwner} pageId={pageId} />
		</Modal>
	);
};

export default AddMembersModal;
