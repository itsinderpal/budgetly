import { useState } from "react";

function App() {
	const [accEdit, setAccEdit] = useState({
		editing: false,
		id: "",
	});
	const [account, setAccount] = useState({
		name: "",
		amount: "",
	});
	const [accountEdit, setAccountEdit] = useState({
		name: "",
		amount: "",
	});
	const [accounts, setAccounts] = useState([]);

	const handleAccount = (type, payload = {}) => {
		let newAccounts;
		switch (type) {
			case "addAccount":
				let newAccount = {
					id: Date.now(),
					name: payload.name,
					amount: payload.amount,
				};
				setAccounts([...accounts, newAccount]);
				return;
			case "deleteAccount":
				newAccounts = accounts.filter((account) => account.id !== payload.id);
				setAccounts(newAccounts);
				return;
			case "editAccount":
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
			default:
				return;
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 flex flex-col gap-y-2">
			<div>
				<h1>Budgetly</h1>
			</div>
			<div className="flex flex-col gap-y-4">
				<div className="flex flex gap-y-2">
					<h1>Accounts</h1>
					<div className="flex flex-col items-start">
						<div>
							<h2>Add acount</h2>
						</div>
						<div>
							<label htmlFor="accName">Name</label>
							<input
								type="text"
								id="accName"
								className=""
								value={account.name}
								onChange={(e) => setAccount({ ...account, name: e.target.value })}
							/>
						</div>
						<div>
							<label htmlFor="accAmt">Amount</label>
							<input
								type="text"
								id="accAmt"
								className=""
								value={account.amount}
								onChange={(e) => setAccount({ ...account, amount: e.target.value })}
							/>
						</div>

						<button type="submit" onClick={() => handleAccount("addAccount", { ...account })}>
							Add
						</button>
					</div>
					<div>
						<h1>All Accounts</h1>
						<div className="flex gap-x-2">
							{accounts.map((account) => {
								return (
									<div key={account.id} className="bg-gray-200 p-2 flex flex-col">
										{!(accEdit && account.id === accEdit.id) ? (
											<>
												<div>
													<h2>{account.name}</h2>
													<h2>${account.amount}</h2>
												</div>
												<div className="flex justify-between">
													<button
														onClick={() => {
															setAccEdit({ ...accEdit, editing: true, id: account.id });
														}}>
														E
													</button>
													<button onClick={() => handleAccount("deleteAccount", { ...account })}>
														D
													</button>
												</div>
											</>
										) : (
											<div>
												<div>
													<div>
														<label htmlFor="accEditName">New Name</label>
														<input
															type="text"
															value={accountEdit.name}
															onChange={(e) =>
																setAccountEdit({ ...accountEdit, name: e.target.value })
															}
														/>
													</div>
													<div>
														<label htmlFor="accEditAmount">New Amount</label>
														<input
															type="text"
															value={accountEdit.amount}
															onChange={(e) =>
																setAccountEdit({ ...accountEdit, amount: e.target.value })
															}
														/>
													</div>
												</div>
												<div className="flex justify-between">
													<button onClick={() => setAccEdit(!accEdit)}>C</button>
													<button
														onClick={() =>
															handleAccount("editAccount", { ...accountEdit, id: account.id })
														}>
														E
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
			</div>
		</div>
	);
}

export default App;
