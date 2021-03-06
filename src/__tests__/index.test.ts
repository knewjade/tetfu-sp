import * as index from '../view';

describe('index', () => {
    test('Array.from()', () => {
        const array = Array.from({ length: 10 }).map(() => 0);
        expect(array).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    });

    test('slice', () => {
        const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const concat = array.slice(-5, 0).concat(array.slice(5, 10), array.slice(0, 5));
        expect(concat).toEqual([5, 6, 7, 8, 9, 0, 1, 2, 3, 4]);
    });

    test('replace', () => {
        const str = 'a?b?c'.replace(/\?/g, '');
        expect(str).toEqual('abc');
    });

    test('substring', () => {
        expect('abc'.substring(10)).toEqual('');
    });

    test('undefined', () => {
        const func: () => { b: number } | undefined = () => undefined;
        const res = func();
        expect({
            a: 1,
            ...res,
        }).toEqual({
            a: 1,
        });
    });
});
