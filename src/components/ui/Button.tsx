import React from 'react'

interface ButtonProps {
    children: React.ReactNode,
    variant? : string,
    onClick?: () => void,
    className?: string
}
const Button = ({ children, variant = "primary", onClick ,className}: ButtonProps) => {
    return (
        <button onClick={onClick} className={`border p-1 px-2 transition-all rounded bg-[#ff6f5b] text-white border-[#ff6f5b] ${className}  ${variant === "secondary" ? "bg-transparent border-white hover:border-[#ff6f5b]hover:text-orange-600 " : ""}`}>
            {children}
        </button>
    )
}


export default Button
