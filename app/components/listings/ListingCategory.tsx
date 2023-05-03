"use client";

import type { IconType } from "react-icons";

type ListingCategoryProps = {
	/** Category Icon */
	icon: IconType;
	/** Category Label */
	label: string;
	/** Category description */
	description: string;
};
const ListingCategory: React.FC<ListingCategoryProps> = ({
	icon: Icon,
	label,
	description,
}) => {
	return (
		<div className="flex flex-col gap-6">
			<div className="flex flex-row items-center gap-4">
				<Icon size={40} className="text-neutral-600" />
				<div className="flex flex-col">
					<div className="text-lg font-semibold">{label}</div>
					<div className="text-neutral-500 font-light">{description}</div>
				</div>
			</div>
		</div>
	);
};

export default ListingCategory;
