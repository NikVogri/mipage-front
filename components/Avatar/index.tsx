import Image from "next/image";

import styles from "./Avatar.module.scss";

export interface AvatarProps {
	avatar?: string | null;
	username: string;
	outline?: string;
	size?: "md" | "lg" | "sm";
	tooltip?: boolean;
}
export interface AvatarAdditionalProps {
	additionalCount: number;
	size?: "md";
	outline?: string;
}

function getRandomColor(string: string): string {
	const firstAlphabet = string.charAt(0).toLowerCase();
	const asciiCode = firstAlphabet.charCodeAt(0);
	const colorNum = asciiCode.toString() + asciiCode.toString() + asciiCode.toString();

	var num = Math.round(0xffffff * parseInt(colorNum));
	var r = (num >> 16) & 255;
	var g = (num >> 8) & 255;
	var b = num & 255;

	return `rgb(${r}, ${g}, ${b}, 0.5)`;
}

const Avatar = ({ avatar, username, outline, size, tooltip = true }: AvatarProps) => {
	if (!avatar) {
		return (
			<div
				className={`${styles.avatar} ${size ? styles[size] : ""}`}
				style={{
					backgroundColor: getRandomColor(username),
					border: outline ? `solid 2px ${outline}` : undefined,
				}}
			>
				<span>{username[0].toUpperCase()}</span>

				{tooltip && <div className={styles.additional__info}>{username}</div>}
			</div>
		);
	}

	return (
		<div
			className={`${styles.avatar} ${size ? styles[size] : ""}`}
			style={{
				border: outline ? `solid 2px ${outline}` : undefined,
			}}
		>
			<Image
				unoptimized // TODO: remove this line
				src={avatar}
				alt={username}
				className={`${styles.avatar} ${styles.image}`}
				width="100%"
				height="100%"
			/>
			{tooltip && <div className={styles.additional__info}>{username}</div>}
		</div>
	);
};

const Additional: React.FC<AvatarAdditionalProps> = ({ additionalCount, outline, size }) => {
	return (
		<div>
			<div
				className={`${styles.avatar} ${size ? styles[size] : ""}`}
				style={{
					backgroundColor: "#ccc",
					color: "black",
					zIndex: 0,
					border: outline ? `solid 2px ${outline}` : undefined,
				}}
			>
				+{additionalCount}
			</div>
		</div>
	);
};

Avatar.Additional = Additional;

export default Avatar;
