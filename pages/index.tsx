import React, { useState } from "react";
import type { NextPage } from "next";
import styled from "styled-components";
import { customScrollbar, theme } from "../styles/theme";
import Image from "next/image";

import Chart from "../components/Chart";
import getOctave from "../libs/getOctave";

const Home: NextPage = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<HomeSection>
			<h1>
				<Image
					src={"/images/logo.png"}
					layout="responsive"
					width={150}
					height={0}
					alt={"microphone"}
				/>
			</h1>

			<MicBtn
				onClick={() => {
					getOctave();
					setIsOpen(true);
				}}
			>
				<Image
					src={"/images/microphone.png"}
					layout="responsive"
					width={150}
					height={0}
					alt={"microphone"}
				/>
			</MicBtn>

			<Chart />
		</HomeSection>
	);
};

const HomeSection = styled.main`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	position: relative;
	width: 100vw;
	height: 100vh;
	margin: 0;
	padding: 1rem;
	box-sizing: border-box;
	${customScrollbar}

	h1 {
		display: block;
	}
`;

const MicBtn = styled.button`
	display: block;
	width: 9rem;
	height: 9rem;
	border-radius: 50%;
	padding: 1rem;
	box-sizing: border-box;
	background: ${theme.color.orange};
	cursor: pointer;
	filter: drop-shadow(0px 18px 42px rgba(249, 143, 84, 0.55));

	&:hover {
		background: ${theme.color.darkOrange};
	}
`;

export default Home;
