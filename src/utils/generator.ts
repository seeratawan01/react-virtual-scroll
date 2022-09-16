import {faker} from '@faker-js/faker';

/**
 * Generate array of N items
 */
export function generate<T>(count: number, generator: () => T): T[] {
    return Array.from({length: count}, generator);
}

/**
 * Faker.js: Table demi data generator
 */
export const tableDataGenerator = (count = 10) => generate(count, () => {
    return {
        name: faker.name.firstName(),
        age: faker.datatype.number({min: 18, max: 99}),
        company: faker.company.bsAdjective()
    };
});

/**
 * Faker.js: Random user name list generator
 */
export const userNameListGenerator = (count = 10) => generate(count, () => {
    return {
        content: faker.name.firstName()
    }
});
