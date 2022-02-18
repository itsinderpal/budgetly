import React, { useState, useEffect } from "react";

const Debt = ({ getAllCardsForNet, cards }) => {
	const [addDebtPopup, setAddDebtPopup] = useState(false);
	const [debEdit, setDebEdit] = useState({
		editing: false,
		id: "",
	});
	const [debt, setDebt] = useState({
		name: "",
		amount: "",
		checked: false,
	});
	const [debtEdit, setDebtEdit] = useState({
		name: "",
		amount: "",
		checked: false,
	});
	const [debts, setDebts] = useState([]);

	const checkEmptyValues = (obj) => {
		if (Object.keys(obj).length === 0) {
			alert("Object is empty");
			return false;
		} else if (Object.values(obj).some((value) => value === null || value === "")) {
			alert("Please enter all values.");
			return false;
		}
		return true;
	};

	const handleDebt = (type, payload = {}) => {
		let newDebts;
		switch (type) {
			case "addDebt":
				if (checkEmptyValues(payload)) {
					let newDebt = {
						id: Date.now(),
						name: payload.name,
						amount: payload.amount,
					};
					setDebts([...debts, newDebt]);
					setDebt({ ...debt, name: "", amount: "" });
					setAddDebtPopup(!addDebtPopup);
					return;
				}
				return;
			case "deleteDebt":
				newDebts = debts.filter((debt) => debt.id !== payload.id);
				setDebts(newDebts);
				return;
			case "editDebt":
				if (checkEmptyValues(payload)) {
					newDebts = debts.map((debt) => {
						if (debt.id === payload.id) {
							return { ...debt, name: payload.name, amount: payload.amount };
						}
						return debt;
					});
					setDebts(newDebts);
					setDebEdit({ ...debEdit, editing: false, id: "" });
					setDebtEdit({ ...debtEdit, name: "", amount: "" });
					return;
				}
				return;
			case "editChecked":
				newDebts = debts.map((debt) => {
					if (debt.id === payload.id) {
						return { ...debt, checked: !debt.checked };
					}
					return debt;
				});
				setDebts(newDebts);
				return;
			default:
				return;
		}
	};

	useEffect(() => {
		getAllCardsForNet(debts, "debt");
	}, [debts]);

	useEffect(() => {
		Object.keys(cards).map((card) => {
			if (card === "debt") {
				setDebt(cards[card]);
			}
		});
	}, []);

	return (
		<div className="flex flex-col gap-y-2 pb-6">
			<div className="flex justify-between border-b-2 border-gray-800 items-center py-2">
				<h1 className="text-2xl font-bold">Debts</h1>
				<button
					className="p-2 bg-purple-300 rounded-lg hover:bg-purple-400 flex items-center gap-x-1"
					onClick={() => setAddDebtPopup(!addDebtPopup)}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<span>ADD</span>
				</button>
			</div>
			{addDebtPopup ? (
				<div className="flex flex-col items-center bg-[#C9E3AC] rounded-lg p-4 gap-y-4">
					<h2 className="text-2xl underline">Add debt</h2>
					<div className="flex flex-col gap-y-4">
						<div className="flex justify-between items-center gap-x-2">
							<label htmlFor="debName">Name:</label>
							<input
								type="text"
								id="debName"
								value={debt.name}
								className="p-1 outline-none rounded-lg focus:bg-gray-200"
								onChange={(e) => setDebt({ ...debt, name: e.target.value })}
							/>
						</div>
						<div className="flex justify-between items-center gap-x-2">
							<label htmlFor="debAmt">Amount:</label>
							<input
								type="number"
								id="debAmt"
								className="p-1 outline-none rounded-lg focus:bg-gray-200"
								value={debt.amount}
								onChange={(e) => setDebt({ ...debt, amount: e.target.value })}
							/>
						</div>
					</div>
					<div className="flex items-center gap-x-4">
						<button
							type="submit"
							className="p-2 bg-purple-300 rounded-lg hover:bg-purple-400"
							onClick={() => handleDebt("addDebt", { ...debt })}>
							Add
						</button>
						<button
							type="submit"
							className="p-2 bg-purple-300 rounded-lg hover:bg-purple-400"
							onClick={() => setAddDebtPopup(!addDebtPopup)}>
							Cancel
						</button>
					</div>
				</div>
			) : (
				""
			)}
			<div>
				<div className="grid grid-cols-2 gap-3">
					{debts.map((debt) => {
						return (
							<div
								key={debt.id}
								className="bg-gray-200 p-4 flex flex-col rounded-lg gap-y-4 shadow-md row-span-4">
								{!(debEdit && debt.id === debEdit.id) ? (
									<>
										<div className="flex flex-col gap-y-4">
											<div className="flex justify-center items-center gap-x-1">
												<div
													onClick={() => handleDebt("editChecked", { ...debt })}
													className="cursor-pointer">
													{debt.checked ? (
														<svg
															xmlns="http://www.w3.org/2000/svg"
															className="h-5 w-5"
															viewBox="0 0 20 20"
															fill="#3A7D44">
															<path
																fillRule="evenodd"
																d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
																clipRule="evenodd"
															/>
														</svg>
													) : (
														<svg
															xmlns="http://www.w3.org/2000/svg"
															className="h-6 w-6"
															fill="#FF1053"
															viewBox="0 0 24 24"
															stroke="transparent">
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
																d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
															/>
														</svg>
													)}
												</div>
												<h2>{debt.name}</h2>
											</div>
											<h2 className="py-8 m-auto text-2xl font-bold">${debt.amount}</h2>
										</div>
										<div className="flex justify-between">
											<button
												onClick={() => {
													setDebtEdit({ ...debt });
													setDebEdit({ ...debEdit, editing: true, id: debt.id });
												}}>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-6 w-6"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor">
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
													/>
												</svg>
											</button>
											<button onClick={() => handleDebt("deleteDebt", { ...debt })}>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-6 w-6"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor">
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
													/>
												</svg>
											</button>
										</div>
									</>
								) : (
									<div className="flex flex-col gap-y-2">
										<div className="flex flex-col gap-y-2">
											<div className="flex flex-col gap-y-1">
												<label htmlFor="debEditName">Name</label>
												<input
													type="text"
													value={debtEdit.name}
													className="p-1 outline-none rounded-lg focus:bg-gray-200"
													onChange={(e) => setDebtEdit({ ...debtEdit, name: e.target.value })}
												/>
											</div>
											<div className="flex flex-col gap-y-1">
												<label htmlFor="debEditAmount">Amount</label>
												<input
													type="number"
													value={debtEdit.amount}
													className="p-1 outline-none rounded-lg focus:bg-gray-200"
													onChange={(e) => setDebtEdit({ ...debtEdit, amount: e.target.value })}
												/>
											</div>
										</div>
										<div className="flex justify-between">
											<button onClick={() => setDebEdit(!debEdit)}>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-6 w-6"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor">
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
													/>
												</svg>
											</button>
											<button onClick={() => handleDebt("editDebt", { ...debtEdit, id: debt.id })}>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-6 w-6"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor">
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
													/>
												</svg>
											</button>
										</div>
									</div>
								)}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Debt;
