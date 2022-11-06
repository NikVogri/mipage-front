import BaseModal from "react-modal";
import { IoMdClose } from "react-icons/io";

import styles from "./BaseModal.module.scss";

interface ModalProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	children: React.ReactNode;
	contentLabel: string;
	className?: string;
}

interface FooterModalProps {
	children?: React.ReactNode;
}

interface HeadModalProps {
	title: string;
	children?: React.ReactNode;
	closeModal?: () => void;
}

const Modal = ({ isOpen, setIsOpen, children, contentLabel, className }: ModalProps) => {
	return (
		<BaseModal
			ariaHideApp={false}
			isOpen={isOpen}
			contentLabel={contentLabel}
			className={`${styles.modal} ${className ?? className}`}
			overlayClassName={styles.modal__background}
			onRequestClose={() => setIsOpen(false)}
			preventScroll={true}
		>
			<div className={styles.modal__body}>{children}</div>
		</BaseModal>
	);
};

const Head: React.FC<HeadModalProps> = ({ children, title, closeModal }) => {
	return (
		<div className={`${styles.modal__head} modal__head`}>
			<button onClick={closeModal} className={styles.close__btn} title="Close modal">
				<IoMdClose />
			</button>

			<h2 className={styles.modal__title}>{title}</h2>
			{children}
		</div>
	);
};

const Footer: React.FC<FooterModalProps> = ({ children }) => {
	return <div className={`${styles.modal__footer} modal__footer`}>{children}</div>;
};

Modal.Head = Head;
Modal.Footer = Footer;

export default Modal;
