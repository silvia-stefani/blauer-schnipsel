export interface menuItemsI {
    id: string,
    isDisabled: boolean,
    labelKey: string,
}

export const menuItems: menuItemsI[] = [
    { id: "workshops", isDisabled: false, labelKey: "menu.workshops" },
    { id: "archive", isDisabled: false, labelKey: "menu.archive" },
    { id: "manifest", isDisabled: false, labelKey: "menu.manifest" },
    { id: "about", isDisabled: false, labelKey: "menu.about" },
];