import { useState, useEffect } from "react";
import Account from "./components/Account";
import Debt from "./components/Debt";
import Net from "./components/Net";

function App() {
	const [cards, setCards] = useState({});

	const getAllCardsForNet = (_cards, from) => {
		const newCards = { ...cards, [from]: _cards };
		setCards(newCards);
	};

	// useEffect(() => {
	// 	if (localStorage.getItem("cards") !== undefined || null) {
	// 		setCards(JSON.parse(localStorage.getItem("cards")));
	// 	}
	// }, []);

	// useEffect(() => {
	// 	localStorage.setItem("cards", JSON.stringify(cards));
	// }, [cards]);

	return (
		<div className="min-h-screen bg-[#9CD2FC] flex flex-col gap-y-2 items-center font-mono text-xl">
			<div className="text-3xl font-bold p-4">
				<h1>Budgetly</h1>
			</div>
			<div className="w-6/12 flex flex-col gap-y-4">
				<Account getAllCardsForNet={getAllCardsForNet} cards={cards} />
				<Debt getAllCardsForNet={getAllCardsForNet} cards={cards} />
				<Net cards={cards} />
			</div>
		</div>
	);
}

export default App;
