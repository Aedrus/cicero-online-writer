export default function TypePanel() {
    return (
        <aside className="panel-type">
            <div className="panel-type__wrapper">
                <div className="panel-type__type-options">
                    <input type="text" id="font"/>
                    <input type="text" id="weight"/>
                    <input type="text" id="size"/>
                    <button className="btn-toggle__bold">B</button>
                    <button className="btn-toggle__italic">I</button>
                    <button className="btn-toggle__underline">U</button>
                    <button className="btn-toggle__strike">S</button>
                    <button className="btn-toggle__subscript">Sub</button>
                    <button className="btn-toggle__superscript">Sup</button>
                </div>

                <i className="icon__seperator">|</i>
                <div className="panel-type__position-options">
                    <button className="btn-toggle__l-align"></button>
                    <button className="btn-toggle__c-align"></button>
                    <button className="btn-toggle__r-align"></button>
                </div>
                <div>
                    <i className="icon__more">...</i>
                </div>
            </div>
        </aside>
    )
};