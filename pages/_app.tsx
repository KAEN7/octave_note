import React from "react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import Head from "next/head";
import { DefaultSeo } from "next-seo";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import { theme } from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<RecoilRoot>
			<Head>
				<title>Octave Note</title>
				<meta
					name="description"
					content="옥타브, 음정 측정 웹사이트입니다. 당신의 옥타브를 확인해보세요"
				/>
				<meta name="keywords" content="옥타브, 음정, octave, note, tone" />
				<meta name="author" content="kaen" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<DefaultSeo
				title="Octave Note"
				description="옥타브, 음정 측정 웹사이트입니다. 당신의 옥타브를 확인해보세요"
				canonical="https://kaen.site"
				openGraph={{
					type: "website",
					url: "https://kaen.site",
					title: "Octave Note",
					description:
						"옥타브, 음정 측정 웹사이트입니다. 당신의 옥타브를 확인해보세요",
					images: [{ url: "https://images/seo_bg.png" }],
					site_name: "KAEN",
				}}
			/>

			<ThemeProvider theme={theme}>
				<Component {...pageProps} />
			</ThemeProvider>
		</RecoilRoot>
	);
}

export default MyApp;
