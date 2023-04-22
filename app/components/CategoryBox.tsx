"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ICategory } from "../@types/category";
import { useCallback } from "react";
import qs from "query-string";

type CategoryBoxProps = {
	selected?: boolean;
} & ICategory;
const CategoryBox: React.FC<CategoryBoxProps> = ({
	label,
	description,
	icon: Icon,
	selected,
}) => {
	const router = useRouter();
	const params = useSearchParams();

	const handleClick = useCallback(() => {
		let currentQuery = {};
		if (params) {
			// parse the params ot an object
			currentQuery = qs.parse(params.toString());
		}

		// Add the new category to query
		const updatedQuery: any = {
			...currentQuery,
			category: label,
		};

		// If selected category is already selected
		// remove it from query.
		// We want to deselct it if its already selected.
		if (params?.get("category") === label) {
			delete updatedQuery.category;
		}

		// Generate a new url string.
		const url = qs.stringifyUrl(
			{
				url: "/",
				query: updatedQuery,
			},
			{ skipNull: true }
		);

		// Pass the new url string
		router.push(url);
	}, [label, params, router]);

	return (
		<div
			onClick={handleClick}
			className={`
            flex 
            flex-col 
            items-center 
            justify-center 
            gap-2 
            p-3
            border-b-2
            hover:text-neutral-800
            transition
            cursor-pointer
            ${selected ? "border-b-neutral-800" : "border-transparent"}
            ${selected ? "text-neutral-800" : "text-neutral-500"}
        `}
		>
			<Icon size={26} />
			<div className="font-medium text-sm">{label}</div>
		</div>
	);
};

export default CategoryBox;
