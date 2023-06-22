import { useState, useEffect } from "react";

function Accordion({header, children, name="", symbol=""}) {
    const [accordionId, setAccordionId] = useState();
    const [collapseId, setCollapseId] = useState();

    useEffect( () => {
        if (name.length > 1) {
            setAccordionId(`${name}-${header}-accordion`);
            setCollapseId(`${name}-${header}-collapse`);
        } else if (symbol.length > 1) {
            setAccordionId(`${symbol}-accordion`);
            setCollapseId(`${symbol}-collapse`);
        }
    }, [])

    return (
        <div className="accordion" id={`${accordionId}`}>
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#${collapseId}`}>
                        {header ? `${header.charAt(0).toUpperCase()}${header.substring(1)}` : ""}
                    </button>
                </h2>
                <div className="accordion-collapse collapse" data-bs-parent={`#${accordionId}`} id={`${collapseId}`}>
                    <div className="accordion-body">
                        {children}
                    </div>
                </div>                                                    
            </div>
        </div>
    )
}

export default Accordion;