const stringUtils = {
    simplifyString: (text: string): string => {
        if (text.length < 15) return text;
        const firstPart = text.substring(0, 4);
        const secondPart = text.substring(text.length - 4);
        return `${firstPart}...${secondPart}`;
    },
};

export { stringUtils };
