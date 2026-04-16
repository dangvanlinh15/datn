export const filterPrice = (rawPrice) => {
    if (!rawPrice || rawPrice === "NaN" || rawPrice === "None" || rawPrice == "0.0") {
        return "__";
    }

    const price = Number(rawPrice);
    if (isNaN(price) || price === 0) {
        return "__";
    }

    const bilion = price / 1000000000;
    if (bilion >= 1) {
        // e.g. 1.50 -> 1.5, 1.00 -> 1
        return parseFloat(bilion.toFixed(2)) + " tỷ";
    }

    const milion = price / 1000000;
    if (milion >= 1) {
        return parseFloat(milion.toFixed(2)) + " triệu";
    }

    return price.toLocaleString("vi-VN") + " đồng";
};

export const formatDimension = (dim) => {
    if (!dim || dim === "None" || dim === "" || String(dim).toLowerCase() === "nan") {
        return "__ m";
    }
    // Remove all spaces and check if it's '0m'
    if (String(dim).replace(/\s+/g, "") === "0m" || String(dim).replace(/\s+/g, "") === "0") {
        return "__ m";
    }
    return dim;
};
