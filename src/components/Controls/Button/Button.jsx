export const Button = ({className, value, onClick, type, title}) => {
    return(
        <button className={className} value={value} onClick={onClick} type={type}>{title}</button>
    )
}