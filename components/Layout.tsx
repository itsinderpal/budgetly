import React, { ReactNode } from "react";
import Head from "next/head";

type Props = {
	children?: ReactNode;
	title?: string;
};

const Layout = ({ children, title = "Budgetly" }: Props) => (
	<div>
		<Head>
			<title>{title}</title>
			<link rel="shortcut icon" href="favicon.svg" type="image/x-icon" />
			<meta charSet="utf-8" />
			<meta name="viewport" content="initial-scale=1.0, width=device-width" />
		</Head>
		{children}
	</div>
);

export default Layout;
