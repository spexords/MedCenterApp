import React from 'react'
import "./AquaButton.css"


interface IProps {
    content: string;
    onClick?: () => void;
}

const AquaButton: React.FC<IProps> = ({content, onClick}) => {
    return (
        <div className="aquaButton" onClick={onClick}>
           {content}
        </div>
    )
}

export default AquaButton
