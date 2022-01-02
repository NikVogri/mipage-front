interface ErrorFormMessageProps {
	message: string;
}
const ErrorFormMessage = ({ message }: ErrorFormMessageProps) => {
	return (
		<div className="text-red-500 text-center text-3xl p-3 border border-red-500 rounded">
			<span>{message}</span>
		</div>
	);
};

export default ErrorFormMessage;
