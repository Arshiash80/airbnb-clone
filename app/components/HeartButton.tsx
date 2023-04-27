"use client";

import { SafeUser } from "../@types/user";

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import useFavorite from "../hooks/useFavorite";

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
	const { hasFavorited, toggleFavorite } = useFavorite({
		listingId,
		currentUser,
	});

	return (
		<div
			onClick={toggleFavorite}
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
				className={hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"}
			/>
		</div>
	);
};

export default HeartButton;
