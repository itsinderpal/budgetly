const calculateNet = (cards) => {
	let total = 0;
	if (cards === undefined || Object.keys(cards).length === 0 || typeof cards === 'string') {
		return 0;
	}
	Object.keys(cards).map((card) => {
		cards[card].map((c) => {
			if (c.checked) {
				total = Number(total + Number(c.amount));
			}
			return;
		});
		return total;
	});
};

module.exports = calculateNet;
