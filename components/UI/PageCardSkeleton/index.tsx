import ContentLoader from "react-content-loader";

function PageCardSkeleton() {
	return (
		<ContentLoader
			speed={2}
			opacity={0.1}
			width={180}
			height={140}
			backgroundColor="#dfdddd"
			foregroundColor="#ffffff"
		>
			<rect width="180" height="140" rx="4" ry="4" />
		</ContentLoader>
	);
}

export default PageCardSkeleton;
