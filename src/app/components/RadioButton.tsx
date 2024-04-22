import React, { CSSProperties } from 'react'

type Props = { 
    name : string, 
    id: string, 
    value: string, 
    onChange: any, 
    checked: boolean, 
    data: any, 
    styleLabel?: CSSProperties
}

const RadioButton = ({ name, id, value, onChange, checked, data, styleLabel }) => {
    
  return (
    <label htmlFor={id} className="radio-label">
      <input
        className="radio-input hidden"
        type="radio"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        checked={checked}
      />
      {/* label */}
        <div className={`py-3 px-[2vw] ${checked ? 'border-l-[3px] border-primary text-primary' : ''} cursor-pointer`}>
            <div className="flex items-center justify-between">
                <p>{data.name}</p>
                <p>{data?.book_count}</p>
            </div>
        </div>
    </label>
  )
}

export default RadioButton