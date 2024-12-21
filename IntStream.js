class IntStream {

    static range(start, end, ...exclude) {
        return new IntStream()._range(start, end, ...exclude);
    }

    _range(start, end, ...exclude) {
        const range = [];
        for (let i = start; i < end; i++) {
            if (!exclude.includes(i)) {
                range.push(i);
            }
        }
        return range;
    }

}