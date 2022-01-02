import Image from "next/image";

import styles from "./Avatar.module.scss";

export interface AvatarProps {
	avatar?: string | null;
	username: string;
}

function getRandomColor(string: string): string {
	const firstAlphabet = string.charAt(0).toLowerCase();
	const asciiCode = firstAlphabet.charCodeAt(0);
	const colorNum = asciiCode.toString() + asciiCode.toString() + asciiCode.toString();

	var num = Math.round(0xffffff * parseInt(colorNum));
	var r = (num >> 16) & 255;
	var g = (num >> 8) & 255;
	var b = num & 255;

	return `rgb(${r}, ${g}, ${b}, 0.3)`;
}

const Avatar: React.FC<AvatarProps> = ({ avatar, username }) => {
	if (!avatar) {
		return (
			<div className={styles.avatar} style={{ backgroundColor: getRandomColor(username) }}>
				<span>{username[0].toUpperCase()}</span>
			</div>
		);
	}

	return (
		<div className={styles.avatar}>
			<Image
				src={avatar}
				alt={username}
				className={`${styles.avatar} ${styles.image}`}
				width="100%"
				height="100%"
			/>
		</div>
	);
};

export default Avatar;
