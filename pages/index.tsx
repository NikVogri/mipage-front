import useAuth from "hooks/useAuth";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { MdAccountCircle, MdAppRegistration, MdBuildCircle, MdCreate, MdSupervisedUserCircle } from "react-icons/md";

import styles from "../styles/pages/Index.module.scss";

const Home: NextPage = () => {
	const { isAuth } = useAuth();
	return (
		<div className={styles.container}>
			<Head>
				<title>Mipage | Your own digital notebook</title>
			</Head>

			<main className={styles.under__construction__container}>
				<MdBuildCircle size={84} />
				<h1>Thank you for visiting Mipage</h1>
				<h2>Mipage is currently under construction and some functionality might not work as expected.</h2>

				{isAuth ? (
					<Link href="/pages">
						<a className={styles.register}>Visit your pages</a>
					</Link>
				) : (
					<Link href="/register">
						<a className={styles.register}>
							<MdAccountCircle size={18} />
							Create your account now!
						</a>
					</Link>
				)}

				<p>Created with {"❤️"} in Slovenia</p>
			</main>
		</div>
	);
};

export default Home;
