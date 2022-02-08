import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
	return (
		<div>
			<Head>
				<title>Mipage | Your own digital notebook</title>
			</Head>

			<main>
				<h1>hello</h1>
			</main>
			<Link href="/pages">
				<a>pages</a>
			</Link>
		</div>
	);
};

export default Home;
