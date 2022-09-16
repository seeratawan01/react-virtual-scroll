/**
 * Method to merge classNames
 */
export const classNames = (...classNames: string[]) => {
    return classNames.filter(Boolean).join(' ');
}
