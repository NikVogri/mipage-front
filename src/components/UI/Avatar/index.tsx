import { getRgbaFromChar } from "helpers/color";

import styles from "./Avatar.module.scss";

export interface AvatarProps {
	avatar?: string | null;
	username: string;
	outline?: string;
	size?: "md" | "lg" | "sm";
	tooltip?: boolean;
}

const Avatar = ({ username, outline, size, tooltip = true }: AvatarProps) => {
	return (
		<div
			className={`${styles.avatar} ${size ? styles[size] : ""}`}
			style={{
				border: outline ? `solid 2px ${outline}` : undefined,
				backgroundColor: getRgbaFromChar(username, 0.5),
			}}
		>
			<span>{username[0]?.toUpperCase()}</span>

			{tooltip && <div className={styles.additional__info}>{username}</div>}
		</div>
	);
};

export interface AvatarAdditionalProps {
	additionalCount: number;
	size?: "md";
	outline?: string;
}

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
