import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";

import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import RentModal from "./components/modals/RentModal";

import { getCurrentUser } from "./actions/getCurrentUser";

export const metadata = {
	title: "Airbnb",
	description: "Airbnb clone",
};

const font = Nunito({ subsets: ["latin"] });

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const currentUser = await getCurrentUser();

	return (
		<html lang="en">
			<body className={font.className}>
				<ClientOnly>
					<Navbar currentUser={currentUser} />
					<ToasterProvider />
					<RegisterModal />
					<LoginModal />
					<RentModal />
				</ClientOnly>
				<div className="pb-2 pt-28">{children}</div>
			</body>
		</html>
	);
}
