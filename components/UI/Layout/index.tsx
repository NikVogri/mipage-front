import Header from "../Header";

interface LayoutInterface {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutInterface> = ({ children }) => {
	return (
		<div>
			<Header />
			{children}
		</div>
	);
};

export default Layout;
