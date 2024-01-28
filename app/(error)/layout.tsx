import { Metadata } from 'next';

export const metadata: Metadata = {
	title: "makromusic Task | Not Found",
	description: 'makromusic Task',
}

export default function ErrorLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>{children}</>
	);
}
