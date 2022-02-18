import { useState, useEffect } from "react";
import Account from "./components/Account";
import Debt from "./components/Debt";
import Net from "./components/Net";
import Expense from "./components/Expense";
import Income from "./components/Income";

function App() {
	const [cards, setCards] = useState({});

	const getAllCardsForNet = (_cards, from) => {
		const newCards = { ...cards, [from]: _cards };
		setCards(newCards);
	};

	useEffect(() => {
		if (localStorage.getItem("cards") !== (undefined || null)) {
			setCards(JSON.parse(localStorage.getItem("cards")));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("cards", JSON.stringify(cards));
	}, [cards]);

	return (
		<div className="min-h-screen bg-[#9CD2FC] flex flex-col gap-y-2 items-center font-mono text-base md:text-lg">
			<div className="text-3xl font-bold p-4">
				<h1>Budgetly</h1>
			</div>
			<div className="w-10/12 md:w-9/12 lg:w-8/12 flex flex-col gap-y-4 py-4">
				<Account getAllCardsForNet={getAllCardsForNet} cards={cards} />
				<Debt getAllCardsForNet={getAllCardsForNet} cards={cards} />
				<Expense getAllCardsForNet={getAllCardsForNet} cards={cards} />
				<Income getAllCardsForNet={getAllCardsForNet} cards={cards} />
				<Net cards={cards} />
			</div>
		</div>
	);
}

export default App;
