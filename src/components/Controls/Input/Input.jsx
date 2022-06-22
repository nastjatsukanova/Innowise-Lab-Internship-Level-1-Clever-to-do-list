export const Input = ({placeholder, className, onChange, type, value, checked, onClick, defaultValue}) => {
        return (
            <input placeholder={placeholder} 
                   className={className} 
                   onChange={onChange} 
                   type={type}
                   value={value}
                   checked={checked}
                   onClick={onClick}
                   defaultValue={defaultValue}
                   />
        )
}