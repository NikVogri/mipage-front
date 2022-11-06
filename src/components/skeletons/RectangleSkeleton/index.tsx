import React from "react";
import ContentLoader from "react-content-loader";

interface RectangleSkeletonProps {
	height: number | string;
	width: number | string;
	styles?: React.CSSProperties;
}

const RectangleSkeleton: React.FC<RectangleSkeletonProps> = ({ width, height, styles }) => {
	return (
		<ContentLoader
			speed={2.5}
			style={styles}
			opacity={0.2}
			width={width}
			height={height}
			backgroundColor="#000"
			foregroundColor="#111"
		>
			<rect width="100%" height="100%" />
		</ContentLoader>
	);
};

export default RectangleSkeleton;
