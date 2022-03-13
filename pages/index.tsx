import { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import Account from "../components/Account/Account";
import Debt from "../components/Debt/Debt";
import Net from "../components/Net/Net";
import Expense from "../components/Expense/Expense";
import Income from "../components/Income/Income";

const IndexPage = () => {
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
		<>
			<Layout>
				<div className="min-h-screen bg-gradient-to-r from-bg-100 via-bg-200 to-bg-300 flex flex-col gap-y-2 items-center font-mono text-base md:text-lg text-center md:text-left">
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
			</Layout>
		</>
	);
};

export default IndexPage;
