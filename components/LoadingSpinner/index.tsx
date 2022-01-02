import { ImSpinner8 } from "react-icons/im";

interface LoadingSpinnerProps {
	size?: number;
	className?: string;
}

const LoadingSpinner = ({ size, className }: LoadingSpinnerProps) => {
	console.log(size);
	return <ImSpinner8 className={`animate-spin ${className}`} size={size ? size : 32} />;
};

export default LoadingSpinner;
