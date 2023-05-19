import { DefaultTheme, css } from "styled-components";

export const theme: DefaultTheme = {
	color: {
		white: "#F8F8F8",
		black: "#1E1E1E",
		gray: "#F2F2F2",
		orange: "#E9844D",
		darkOrange: "#CE7949",
	},
};

const customMediaQuery = (maxWidth: number): string =>
	`@media (max-width: ${maxWidth}px)`;

export const media = {
	custom: customMediaQuery,
	pc: customMediaQuery(1440),
	tablet: customMediaQuery(768),
	mobile: customMediaQuery(576),
};

export const customScrollbar = css`
	overflow-y: auto;
	overflow-x: hidden;

	&::-webkit-scrollbar {
		width: 8px;
	}

	&::-webkit-scrollbar-thumb {
		height: 30%;
		background: ${theme.color.gray};
		border-radius: 8px;
	}

	&::-webkit-scrollbar-track {
		background: none;
	}
`;
