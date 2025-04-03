import { useEffect, useState } from "react";
import SelectC from "react-tailwindcss-select";
import { ISelectOption as Option } from "@/common/models/ISelectOption";

interface Props<T> {
    options?: T[];
    isMultiple?: boolean;
    defaultValue?: any[] | null;
    isSearchable?: boolean;
    menuButtonStyle?: string;
    getOptionLabel?: (item: T) => string;
    getOptionValue?: (item: T) => string;
    onChange?: (value: any) => void;
}

const Select = <T,>({
    options = [],
    isMultiple = false,
    defaultValue = null,
    isSearchable = true,
    menuButtonStyle = '',
    getOptionLabel = (item: any) => item.label ?? "",
    getOptionValue = (item: any) => item.value ?? "",
    onChange = () => {},
}: Props<T>) => {
    const [selectedValue, setSelectedValue] = useState<Option | Option[] | null>(null);
    const menuStyle = menuButtonStyle ? menuButtonStyle : "bg-base-200 border border-neutral";

    useEffect(() => {
        if (defaultValue) {
            const formattedDefaultValue = defaultValue.map((item: T) => ({
                label: getOptionLabel(item),
                value: getOptionValue(item),
            }));
            setSelectedValue(isMultiple ? formattedDefaultValue : formattedDefaultValue[0]);
        }
    }, []);

    const handleChange = (value: Option | Option[] | null) => {
        setSelectedValue(value);
        if (isMultiple) {
            if (value === null) {
                onChange?.([]);
                return;
            }
            const selectedItems = (value as Option[]).map((option) =>
                options.find((item) => getOptionValue(item) === option.value)
            );
            onChange?.(selectedItems.filter(Boolean) as T[]);
        } else {
            const selectedItem = options.find((item) => getOptionValue(item) === (value as Option)?.value);
            onChange?.(selectedItem ? [selectedItem] : []);
        }
    };

    const mappedOptions = options.map((item) => ({
        label: getOptionLabel(item),
        value: getOptionValue(item)
    }));

    return (
        <SelectC
        classNames={{
            menuButton: (({ isDisabled } = {}) => `flex text-sm text-primary border rounded shadow-sm transition-all duration-300 focus:outline-none 
                                            ${isDisabled ? `${menuStyle}/50` : `${menuStyle} hover:border-neutral-content focus:border-primary focus:ring focus:ring-primary/20`}`),
            menu: "bg-base-100 border border-neutral rounded shadow-lg",
            tagItem: (({ item, isDisabled } = {}) => `flex items-center px-2 py-1 rounded bg-primary text-white ${isDisabled ? "opacity-50" : ""}`),
            tagItemText: "text-sm",
            tagItemIconContainer: "bg-transparent text-error ml-2 cursor-pointer hover:bg-error/20 rounded",
            // tagItemIcon: "text-white",
            list: "bg-neutral text-white p-4",
            listGroupLabel: "bg-primary text-white",
            listItem: (({ isSelected } = {}) => `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${isSelected ? "text-white bg-primary" : "hover:bg-neutral-content/20 bg-neutral"}`),
            listDisabledItem: "opacity-50",
            ChevronIcon: (({ open } = {}) => `transition-transform duration-300 ${open ? "rotate-180" : ""}`),
            searchContainer: "p-2 bg-neutral",
            searchBox: "w-full p-2 border border-neutral-content bg-neutral focus:outline-none focus:border-primary rounded",
            searchIcon: "hidden",
            closeIcon: "text-secondary",
        }}
            value={selectedValue}
            onChange={handleChange}
            options={mappedOptions}
            noOptionsMessage="Aucune option trouvée"
            isMultiple={isMultiple}
            primaryColor="primary"
            isSearchable={isSearchable}
            searchInputPlaceholder="Rechercher..."
            placeholder="Choisir..."
        />
    );
};

export default Select;