import { CSSObjectWithLabel, ControlProps, GroupBase, OptionsOrGroups, PropsValue } from 'react-select'
import ReactSelect from 'react-select';
import AsyncSelect from 'react-select/async';

import { createElement } from 'react';

interface ISelectProps {
    options?: OptionsOrGroups<{
        label: string;
        value: string;
    }, GroupBase<{
        label: string;
        value: string;
    }>> | undefined
    value?: PropsValue<{
        label: any;
        value: any;
    }>
    defaultValue?: PropsValue<{
        label: any;
        value: any;
    }> | undefined
    onChange?: (value: any) => void;
    asyncOptions?: (inputValue: string, callback: (options: any[]) => void) => void;
    onInputChange?: (value: string, action: any) => void
    noOptionsMessage?: React.ReactNode;
    loadingMessage?: React.ReactNode;
    placeholder?: string;
    defaultInputValue?: string | undefined
    inputValue?: string | undefined
    disabled?: boolean;
    block?: boolean;
    asyncSelect?: boolean;
    isMulti?: boolean;
}

export default function Select(props: ISelectProps) {

    // Destrcuturing
    const { options, value, onChange, asyncOptions, noOptionsMessage, placeholder, loadingMessage, defaultValue, inputValue, defaultInputValue, disabled, onInputChange, block, asyncSelect, isMulti } = props

    return createElement(asyncSelect ? AsyncSelect : ReactSelect, {
        className: `${block ? "w-full" : ""}`,
        placeholder,
        options,
        isDisabled: disabled,
        defaultInputValue,
        defaultValue,
        value,
        isMulti,
        onChange: onChange,
        loadOptions: asyncOptions,
        inputValue: inputValue,
        onInputChange: onInputChange,
        loadingMessage: () => loadingMessage,
        noOptionsMessage:
            () => noOptionsMessage,
        styles: {
            option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
                ...styles,
                backgroundColor: isSelected ? "#14b1b946" : isFocused ? "#14b1b926" : "#fff",
                color: "#1D1D1D",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "17px",
                padding: "10px 20px",
                cursor: "pointer",
                transition: "all .2s ease-in-out",
                "&:hover": {
                    backgroundColor: "#F2F2F2",
                },
                "&:active": {
                    backgroundColor: "#F2F2F2",
                },
            }),
            control: (baseStyles: CSSObjectWithLabel, state: ControlProps) => ({
                ...baseStyles,
                borderRadius: "8px",
                border: "1px solid #D1D6DE",
            }),
            placeholder: (baseStyles: CSSObjectWithLabel) => ({
                ...baseStyles,
                color: "#BDBDBD",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "20px",
            }),
            input: (baseStyles: CSSObjectWithLabel) => ({
                ...baseStyles,
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "20px",
            }),
            multiValue: (baseStyles: CSSObjectWithLabel) => ({
                display: "none",
                alignItems: "center",
            }),
        },

    })
}
