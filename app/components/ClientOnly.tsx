"use client";
import { useEffect, useState } from "react";

type ClientOnlyProps = {
	children: React.ReactNode;
};
/**
 * Wrap client components wich might cause hydration error.
 * @param children React.ReactNode
 * @returns JSX
 */
const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
	const [hasMounted, setHasMounted] = useState(false);
	useEffect(() => {
		setHasMounted(true);
	}, []);

	if (!hasMounted) return null;

	return <>{children}</>;
};

export default ClientOnly;
