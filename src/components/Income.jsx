import React, { useState, useEffect } from "react";

const Income = ({ getAllCardsForNet, cards }) => {
	const [addIncomePopup, setAddIncomePopup] = useState(false);
	const [incEdit, setAccEdit] = useState({
		editing: false,
		id: "",
	});
	const [income, setIncome] = useState({
		name: "",
		amount: "",
		checked: false,
	});
	const [incomeEdit, setIncomeEdit] = useState({
		name: "",
		amount: "",
		checked: false,
	});
	const [incomes, setIncomes] = useState([]);

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

	const handleIncome = (type, payload = {}) => {
		let newIncomes;
		switch (type) {
			case "addIncome":
				if (checkEmptyValues(payload)) {
					let newIncome = {
						id: Date.now(),
						name: payload.name,
						amount: payload.amount,
					};
					setIncomes([...incomes, newIncome]);
					setIncome({ ...income, name: "", amount: "" });
					setAddIncomePopup(!addIncomePopup);
					return;
				}
				return;
			case "deleteIncome":
				newIncomes = incomes.filter((income) => income.id !== payload.id);
				setIncomes(newIncomes);
				return;
			case "editIncome":
				if (checkEmptyValues(payload)) {
					newIncomes = incomes.map((income) => {
						if (income.id === payload.id) {
							return { ...income, name: payload.name, amount: payload.amount };
						}
						return income;
					});
					setIncomes(newIncomes);
					setAccEdit({ ...incEdit, editing: false, id: "" });
					setIncomeEdit({ ...incomeEdit, name: "", amount: "" });
					return;
				}
				return;
			case "editChecked":
				newIncomes = incomes.map((income) => {
					if (income.id === payload.id) {
						return { ...income, checked: !income.checked };
					}
					return income;
				});
				setIncomes(newIncomes);
				return;
			default:
				return;
		}
	};

	useEffect(() => {
		getAllCardsForNet(incomes, "income");
	}, [incomes]);

	useEffect(() => {
		Object.keys(cards).map((card) => {
			if (card === "income") {
				setIncomes(cards[card]);
			}
		});
	}, [cards]);

	return (
		<div className="flex flex-col gap-y-2 pb-6">
			<div className="flex justify-between border-b-2 border-gray-800 items-center py-2">
				<h1 className="text-2xl font-bold">Incomes</h1>
				<button
					className="p-2 bg-comp-100 rounded-lg hover:bg-comp-200 flex items-center gap-x-1"
					onClick={() => setAddIncomePopup(!addIncomePopup)}>
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
			{addIncomePopup ? (
				<div className="flex flex-col items-center bg-bg-200 rounded-lg p-4 gap-y-4">
					<h2 className="text-2xl underline">Add income</h2>
					<div className="flex flex-col gap-y-4">
						<div className="flex justify-between items-center gap-x-2">
							<label htmlFor="expName">Name:</label>
							<input
								type="text"
								id="expName"
								value={income.name}
								className="p-1 outline-none rounded-lg focus:bg-gray-200"
								onChange={(e) => setIncome({ ...income, name: e.target.value })}
							/>
						</div>
						<div className="flex justify-between items-center gap-x-2">
							<label htmlFor="expAmt">Amount:</label>
							<input
								type="number"
								id="expAmt"
								className="p-1 outline-none rounded-lg focus:bg-gray-200"
								value={income.amount}
								onChange={(e) => setIncome({ ...income, amount: e.target.value })}
							/>
						</div>
					</div>
					<div className="flex items-center gap-x-4">
						<button
							type="submit"
							className="p-2 bg-comp-100 rounded-lg hover:bg-comp-200"
							onClick={() => handleIncome("addIncome", { ...income })}>
							Add
						</button>
						<button
							type="submit"
							className="p-2 bg-comp-100 rounded-lg hover:bg-comp-200"
							onClick={() => setAddIncomePopup(!addIncomePopup)}>
							Cancel
						</button>
					</div>
				</div>
			) : (
				""
			)}
			<div>
				<div className="grid grid-cols-1 gap-3">
					{incomes.map((income) => {
						return (
							<div key={income.id} className="bg-card-100 p-4 rounded-lg shadow-md">
								{!(incEdit && income.id === incEdit.id) ? (
									<div className="grid grid-cols-2">
										<div className="flex justify-between">
											<div className="flex justify-center items-center gap-x-4">
												<div
													onClick={() => handleIncome("editChecked", { ...income })}
													className="cursor-pointer">
													{income.checked ? (
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
												<h2>{income.name}</h2>
											</div>
											<div>
												<h2 className="py-2 m-auto text-2xl font-bold">${income.amount}</h2>
											</div>
										</div>
										<div className="flex justify-end gap-x-2">
											<button
												onClick={() => {
													setIncomeEdit({ ...income });
													setAccEdit({ ...incEdit, editing: true, id: income.id });
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
											<button onClick={() => handleIncome("deleteIncome", { ...income })}>
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
									</div>
								) : (
									<div className="flex justify-evenly gap-x-2">
										<div className="flex flex-col md:flex-row gap-y-2 md:gap-x-0 justify-center gap-x-4">
											<div className="flex flex-col">
												<label htmlFor="expEditName">Name</label>
												<input
													type="text"
													value={incomeEdit.name}
													className="p-1 outline-none rounded-lg focus:bg-gray-200"
													onChange={(e) => setIncomeEdit({ ...incomeEdit, name: e.target.value })}
												/>
											</div>
											<div className="flex flex-col">
												<label htmlFor="expEditAmount">Amount</label>
												<input
													type="number"
													value={incomeEdit.amount}
													className="p-1 outline-none rounded-lg focus:bg-gray-200"
													onChange={(e) => setIncomeEdit({ ...incomeEdit, amount: e.target.value })}
												/>
											</div>
										</div>
										<div className="flex flex-col justify-between">
											<button onClick={() => setAccEdit(!incEdit)}>
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
											<button
												onClick={() =>
													handleIncome("editIncome", { ...incomeEdit, id: income.id })
												}>
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

export default Income;
