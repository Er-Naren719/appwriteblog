import React, { forwardRef, useId } from "react";

function Select({ label, options, className = "", ...props }, ref) {
	const uniqueId = useId();
	return (
		<div className="w-full">
			{label && (
				<label className="inline-block mb-1 pl-1" htmlFor={uniqueId}>
					{label}
				</label>
			)}
			<select
				className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
				ref={ref}
				id={uniqueId}
				{...props}
			>
				{options?.map((option, index) => (
					<option key={index} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
}

export default forwardRef(Select);
