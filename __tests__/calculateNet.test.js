const calculateNet = require("./calculateNet");

describe("calculate the net amount", () => {
	test("should return 0 with empty object", () => {
		const cards = {};
		expect(calculateNet(cards)).toBe(0);
	});

	test("should return 0 with undefined", () => {
		const cards = undefined;
		expect(calculateNet(cards)).toBe(0);
	});

	test("should return 0 with string", () => {
		const cards = "undefined";
		expect(calculateNet(cards)).toBe(0);
	});
});
