import { IoMdMenu } from "react-icons/io";

import UserNavSettings from "components/navigation/UserNavSettings";
import useAuth from "hooks/useAuth";
import Link from "next/link";
import Notifications from "../../navigation/NavNotifications";
import NavPageSearch from "components/navigation/NavPageSearch";

import styles from "./Header.module.scss";
import { useAppDispatch } from "hooks/redux-hooks";
import { togglePageSidebar } from "features/ui/uiSlice";
import { useRouter } from "next/router";

const Header: React.FC = () => {
	const { isAuth, user } = useAuth();
	const router = useRouter();
	const dispatch = useAppDispatch();

	const isPageSite = router.query.pageId ? true : false;

	return (
		<nav className={styles.header}>
			{isAuth ? (
				<div className={styles.header__container}>
					<div className={styles.header__container__left}>
						{isPageSite && (
							<button
								className={styles.only__mobile}
								onClick={() => {
									dispatch(togglePageSidebar());
								}}
							>
								<IoMdMenu size={24} />
							</button>
						)}
					</div>
					<div className={styles.header__container__center}>
						<NavPageSearch />
					</div>
					<div className={styles.header__container__right}>
						<Notifications />
						<UserNavSettings username={user?.username!} avatar={user?.avatar} />
					</div>
				</div>
			) : (
				<div className={styles.header__container}>
					<div className={styles.header__container__left}></div>
					<div className={styles.header__container__right}>
						<Link href="/login">
							<a className={`${styles.auth__btn} ${styles.auth__btn_login}`}>Login</a>
						</Link>
						<Link href="/register">
							<a className={`${styles.auth__btn} ${styles.auth__btn_register}`}>Get started</a>
						</Link>
					</div>
				</div>
			)}
		</nav>
	);
};

export default Header;
