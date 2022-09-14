export const dollarFormat = (number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(number);
};

export const getCssVar = (name, location = document.documentElement) => {
    return getComputedStyle(location).getPropertyValue(name);
};
