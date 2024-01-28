import { alata } from "@fonts/fonts";
import { Metadata } from 'next';

import "../globals.css"

export const metadata: Metadata = {
	title: "makromusic Task | Not Found",
	description: 'makromusic Task',
}

const RootLayouts = async ({
	children,
}: {
	children: React.ReactNode;
}) => {


	return (
		<html lang="en">
			<body className={alata.className}>
				{children}
			</body>
		</html>
	);
}

export default RootLayouts;
