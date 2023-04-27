"use client";

import { SafeUser } from "../@types/user";

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

type HeartButtonProps = {
	/** Id of the listing */
	listingId: string;
	/** Optinal currently logged in user */
	currentUser?: SafeUser | null;
};
const HeartButton: React.FC<HeartButtonProps> = ({
	listingId,
	currentUser,
}) => {
	/**
	 * Has selected as favorite
	 * @default false
	 */
	const hasFavorite = false;

	/**
	 * Handle favorite pressed.
	 */
	const toggleFavoritte = () => {
		// TODO: Favorite button pressed
	};

	return (
		<div
			onClick={toggleFavoritte}
			className="relative hover:opacity-80 transition cursor-pointer"
		>
			{/* Outer Heart outline */}
			<AiOutlineHeart
				size={28}
				className="fill-white absolute -top-[2px] -right-[2px]"
			/>

			{/* inner Heart fill */}
			<AiFillHeart
				size={24}
				className={hasFavorite ? "fill-rose-500" : "fill-neutral-500/70"}
			/>
		</div>
	);
};

export default HeartButton;
