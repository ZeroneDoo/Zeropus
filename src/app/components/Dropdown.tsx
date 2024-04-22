import React from 'react'
import {
    TEDropdown,
    TEDropdownToggle,
    TEDropdownMenu,
    TEDropdownItem,
    TERipple,
} from "tw-elements-react";

type Props = {
    toggleLabel: any,
    dropdownItem:any
}

const Dropdown = ({
    toggleLabel,
    dropdownItem
} : Props) => {
  return (
    <TEDropdown className="flex justify-center">
        <TERipple rippleColor="light">
        <TEDropdownToggle>
            {toggleLabel}
        </TEDropdownToggle>
        </TERipple>

        <TEDropdownMenu>
        <TEDropdownItem>
            {dropdownItem}
        </TEDropdownItem>
        </TEDropdownMenu>
    </TEDropdown>
  )
}

export default Dropdown