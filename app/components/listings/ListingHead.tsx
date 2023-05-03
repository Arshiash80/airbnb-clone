"use client";
import Image from "next/image";
import { SafeUser } from "@/app/@types/user";
import useCountries from "@/app/hooks/useCountries";
import Heading from "../Heading";
import HeartButton from "../HeartButton";

type ListingHeadProps = {
	/** Listing ID */
	id: string;
	/** Listing title */
	title: string;
	/** Listin image source */
	imageSrc: string;
	/** Listing location value */
	locationValue: string;
	/** Optional currently logged in user */
	currentUser?: SafeUser | null;
};
const ListingHead: React.FC<ListingHeadProps> = ({
	id,
	title,
	imageSrc,
	locationValue,
	currentUser,
}) => {
	const { getByValue } = useCountries();
	const location = getByValue(locationValue);

	return (
		<>
			{/* Lisitng heading */}
			<Heading
				title={title}
				subTitle={`${location?.region}, ${location?.label}`}
			/>
			{/* Listing Image */}
			<div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
				<Image
					alt="Image"
					src={imageSrc}
					fill
					className="object-cover w-full"
				/>
				<div className="absolute top-5 right-5">
					<HeartButton listingId={id} currentUser={currentUser} />
				</div>
			</div>
		</>
	);
};

export default ListingHead;
