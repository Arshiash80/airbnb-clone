"use client";

type MenuItemProps = {
	onClick: () => void;
	label: string;
};
const MenuItem: React.FC<MenuItemProps> = ({ label, onClick }) => {
	return (
		<div
			onClick={onClick}
			className="
            px-4
            py-3
            hover:bg-neutral-100
            transion
            font-semibold
        "
		>
			{label}
		</div>
	);
};

export default MenuItem;