import React, { useState, useEffect } from "react";

const Net = ({ cards }) => {
	const [netAmt, setNetAmt] = useState("");

	const calculateNet = (cards) => {
		let total = 0;
		if (cards === undefined || Object.keys(cards).length === 0) {
			setNetAmt(0);
			return;
		}
		Object.keys(cards).map((card) => {
			cards[card].map((c) => {
				if (c.checked) {
					total = Number(total + Number(c.amount));
				}
				return;
			});
			setNetAmt(total);
		});
	};

	useEffect(() => {
		calculateNet(cards);
	}, [cards]);

	return (
		<div className="flex flex-col gap-y-2">
			<div className="flex justify-between border-b-2 border-gray-800 rounded-lg items-center p-2">
				<h1 className="text-2xl font-bold">Net Amount</h1>
			</div>
			<div className="grid grid-cols-1 gap-3">
				<div className="bg-card-100 p-4 flex justify-center rounded-lg gap-y-4 shadow-md row-span-4 font-bold text-2xl">
					${netAmt}
				</div>
			</div>
		</div>
	);
};

export default Net;
