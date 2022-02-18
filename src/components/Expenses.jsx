import React from "react";

const Expenses = () => {
	const [addAccountPopup, setAddAccountPopup] = useState(false);
	const [accEdit, setAccEdit] = useState({
		editing: false,
		id: "",
	});
	const [account, setAccount] = useState({
		name: "",
		amount: "",
		checked: false,
	});
	const [accountEdit, setAccountEdit] = useState({
		name: "",
		amount: "",
		checked: false,
	});
	const [accounts, setAccounts] = useState([]);

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

	const handleAccount = (type, payload = {}) => {
		let newAccounts;
		switch (type) {
			case "addAccount":
				if (checkEmptyValues(payload)) {
					let newAccount = {
						id: Date.now(),
						name: payload.name,
						amount: payload.amount,
					};
					setAccounts([...accounts, newAccount]);
					setAccount({ ...account, name: "", amount: "" });
					setAddAccountPopup(!addAccountPopup);
					return;
				}
				return;
			case "deleteAccount":
				newAccounts = accounts.filter((account) => account.id !== payload.id);
				setAccounts(newAccounts);
				return;
			case "editAccount":
				if (checkEmptyValues(payload)) {
					newAccounts = accounts.map((account) => {
						if (account.id === payload.id) {
							return { ...account, name: payload.name, amount: payload.amount };
						}
						return account;
					});
					setAccounts(newAccounts);
					setAccEdit({ ...accEdit, editing: false, id: "" });
					setAccountEdit({ ...accountEdit, name: "", amount: "" });
					return;
				}
				return;
			case "editChecked":
				newAccounts = accounts.map((account) => {
					if (account.id === payload.id) {
						return { ...account, checked: !account.checked };
					}
					return account;
				});
				setAccounts(newAccounts);
				return;
			default:
				return;
		}
	};

	useEffect(() => {
		getAllCardsForNet(accounts, "account");
	}, [accounts]);

	useEffect(() => {
		Object.keys(cards).map((card) => {
			if (card === "account") {
				setAccount(cards[card]);
			}
		});
	}, []);

	return (
		<div className="flex flex-col gap-y-2 pb-6">
			<div className="flex justify-between border-b-2 border-gray-800 items-center py-2">
				<h1 className="text-2xl font-bold">Accounts</h1>
				<button
					className="p-2 bg-purple-300 rounded-lg hover:bg-purple-400 flex items-center gap-x-1"
					onClick={() => setAddAccountPopup(!addAccountPopup)}>
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
			{addAccountPopup ? (
				<div className="flex flex-col items-center bg-[#C9E3AC] rounded-lg p-4 gap-y-4">
					<h2 className="text-2xl underline">Add account</h2>
					<div className="flex flex-col gap-y-4">
						<div className="flex justify-between items-center gap-x-2">
							<label htmlFor="accName">Name:</label>
							<input
								type="text"
								id="accName"
								value={account.name}
								className="p-1 outline-none rounded-lg focus:bg-gray-200"
								onChange={(e) => setAccount({ ...account, name: e.target.value })}
							/>
						</div>
						<div className="flex justify-between items-center gap-x-2">
							<label htmlFor="accAmt">Amount:</label>
							<input
								type="number"
								id="accAmt"
								className="p-1 outline-none rounded-lg focus:bg-gray-200"
								value={account.amount}
								onChange={(e) => setAccount({ ...account, amount: e.target.value })}
							/>
						</div>
					</div>
					<div className="flex items-center gap-x-4">
						<button
							type="submit"
							className="p-2 bg-purple-300 rounded-lg hover:bg-purple-400"
							onClick={() => handleAccount("addAccount", { ...account })}>
							Add
						</button>
						<button
							type="submit"
							className="p-2 bg-purple-300 rounded-lg hover:bg-purple-400"
							onClick={() => setAddAccountPopup(!addAccountPopup)}>
							Cancel
						</button>
					</div>
				</div>
			) : (
				""
			)}
			<div>
				<div className="grid grid-cols-2 gap-3">
					{accounts.map((account) => {
						return (
							<div
								key={account.id}
								className="bg-gray-200 p-4 flex flex-col rounded-lg gap-y-4 shadow-md row-span-4">
								{!(accEdit && account.id === accEdit.id) ? (
									<>
										<div className="flex flex-col gap-y-4">
											<div className="flex justify-center items-center gap-x-1">
												<div
													onClick={() => handleAccount("editChecked", { ...account })}
													className="cursor-pointer">
													{account.checked ? (
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
												<h2>{account.name}</h2>
											</div>
											<h2 className="py-8 m-auto text-2xl font-bold">${account.amount}</h2>
										</div>
										<div className="flex justify-between">
											<button
												onClick={() => {
													setAccountEdit({ ...account });
													setAccEdit({ ...accEdit, editing: true, id: account.id });
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
											<button onClick={() => handleAccount("deleteAccount", { ...account })}>
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
												<label htmlFor="accEditName">Name</label>
												<input
													type="text"
													value={accountEdit.name}
													className="p-1 outline-none rounded-lg focus:bg-gray-200"
													onChange={(e) => setAccountEdit({ ...accountEdit, name: e.target.value })}
												/>
											</div>
											<div className="flex flex-col gap-y-1">
												<label htmlFor="accEditAmount">Amount</label>
												<input
													type="number"
													value={accountEdit.amount}
													className="p-1 outline-none rounded-lg focus:bg-gray-200"
													onChange={(e) =>
														setAccountEdit({ ...accountEdit, amount: e.target.value })
													}
												/>
											</div>
										</div>
										<div className="flex justify-between">
											<button onClick={() => setAccEdit(!accEdit)}>
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
													handleAccount("editAccount", { ...accountEdit, id: account.id })
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

export default Expenses;
