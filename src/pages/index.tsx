import Link from "next/link";
import type { NextPage } from "next";
import { MdArrowDownward } from "react-icons/md";
import { useRouter } from "next/router";

import TaskSvg from "components/svg/Task";
import ChatSvg from "components/svg/Chat";
import WorldSvg from "components/svg/World";
import Head from "next/head";

import styles from "styles/pages/Index.module.scss";

const Home: NextPage = () => {
	const router = useRouter();

	return (
		<main className={styles.index}>
			<Head>
				<title>Mipage - Your own digital notebook</title>
				<meta charSet="utf-8"></meta>
				<meta
					name="description"
					content="Create your own digital notebooks and todo lists and share them with your team members"
				></meta>
				<meta
					name="viewport"
					content="width=device-width,minimum-scale=1.0,initial-scale=1,user-scalable=yes"
				></meta>
				<meta name="apple-mobile-web-app-capable" content="yes"></meta>
				<meta name="theme-color" content="#18191a"></meta>
				<meta name="msapplication-config" content="https://www.mipage.me/sitemap.xml"></meta>
				<meta property="og:title" content="Mipage - Your own digital notebook"></meta>
				<meta property="og:url" content="https://mipage.me"></meta>
				<meta property="og:site_name" content="Mipage"></meta>
				<meta
					property="og:description"
					content="Create your own digital notebooks and todo lists and share them with your team members"
				></meta>

				<meta name="keywords" content="digital notebook, notebook, todo, todo list, teamwork"></meta>
				<meta name="twitter:card" content="summary"></meta>
				<meta name="twitter:url" content="https://mipage.me"></meta>
				<meta name="twitter:title" content="Mipage - Your own digital notebook"></meta>
				<meta
					name="twitter:description"
					content="Create your own digital notebooks and todo lists and share them with your team members"
				></meta>
			</Head>

			<div className={styles.header}>
				<h2>Mipage</h2>
				<h1>
					<span>Your own</span> <span>Digital</span> <span>Notebook</span>
				</h1>
			</div>
			<div className={styles.container}>
				<button className={styles.down__indicator} onClick={() => router.push("#start")}>
					<MdArrowDownward size={28} />
				</button>
			</div>
			<hr />
			<div className={styles.container}>
				<section className={styles.section} id="start">
					<WorldSvg />
					<div className={styles.text__container}>
						<h2>Access your pages from anywhere</h2>
						<p>Access your pages from anywhere in the world on any device!</p>
					</div>
				</section>
			</div>
			<hr />
			<div className={styles.container}>
				<section className={styles.section} id="start">
					<div className={styles.text__container}>
						<h2>Create your tasks</h2>
						<p>Create and track your tasks using the intuitive UI built specifically for you!</p>
					</div>
					<TaskSvg />
				</section>
			</div>
			<hr />
			<div className={styles.container}>
				<section className={styles.section}>
					<ChatSvg />
					<div className={styles.text__container}>
						<h2>Communicate</h2>
						<p>Communicate with your team members on all the little details!</p>
					</div>
				</section>
			</div>
			<footer className={styles.footer}>
				<h3>Get started now</h3>
				<Link href="/register">
					<a className={styles.btn}>Join Now</a>
				</Link>
			</footer>
		</main>
	);
};

export default Home;
