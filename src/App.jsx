import { useState } from "react";
import Account from "./components/Account";

function App() {
	return (
		<div className="min-h-screen bg-[#9CD2FC] flex flex-col gap-y-2 items-center font-mono text-xl">
			<div className="text-3xl font-bold p-4">
				<h1>Budgetly</h1>
			</div>
			<div className="w-6/12 flex flex-col gap-y-4">
				<Account />
			</div>
		</div>
	);
}

export default App;
