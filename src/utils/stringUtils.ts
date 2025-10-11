

export const capitalizeFirstLetter = (val: string | undefined) => {
    if (!val) {
        return "UNDEFINED"
    }
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
