function Accordion({name, header, children}) {

    return (
        <div className="accordion" id={`${name}-${header}-accordion`}>
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#${name}-${header}-collapse`}>
                        {header ? `${header.charAt(0).toUpperCase()}${header.substring(1)}` : ""}
                    </button>
                </h2>
                <div className="accordion-collapse collapse" data-bs-parent={`#${name}-${header}-accordion`} id={`${name}-${header}-collapse`}>
                    <div className="accordion-body">
                        {children}
                    </div>
                </div>                                                    
            </div>
        </div>
    )
}

export default Accordion;