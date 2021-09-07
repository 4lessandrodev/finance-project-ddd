import { CurrencyValueObject } from "types-ddd/dist";

describe('currency', ()=>{
	it('should subtract valid values', ()=>{
		const currency = CurrencyValueObject.create(
			{
				currency: 'BRL',
				value: 0.03
			}
		).getResult();
		expect(currency.value).toBe(0.03);

		currency.subtractBy(0.02);
		expect(currency.value).toBe(0.01);
	});
});