export default function LeftSidebar() {
    return (
        <aside className="sb">
            <div className="sb-wrapper">
                {/* Section 1 - Mode Tabs */}
                <div className="sb__tabs">
                    <button className="">Structured</button>
                    <button className="">Freeform</button>
                </div>

                {/* Section 2 - Body */}
                <div className="sb__body">
                    <div className="group">
                        <div className="group__hdr">
                            <h2>Prewrite</h2>
                            <i>Help</i>
                        </div>
                        <section className="group__content">
                            <h3>Premise</h3>
                            <ol className="">
                                <li>Working Notes</li>
                                <li>Brainstorming</li>
                                <li>Premise</li>
                            </ol>
                        </section>
                        <section className="group__content">
                            <h3>Characters</h3>
                            <ol className="">
                                <li>Working Notes</li>
                                <li>Protagonist</li>
                                <li>Supporting Character 1</li>
                            </ol>
                        </section>
                        <section className="group__content">
                            <h3>Setting</h3>
                            <ol className="">
                                <li>Working Notes</li>
                                <li>Worldbuilding</li>
                            </ol>
                        </section>
                    </div>
                    
                    <div className="group">
                        <div className="group__hdr">
                            <h2>Prewrite</h2>
                            <i>Help</i>
                        </div>
                        <section className="group__content">
                            <h3>Premise</h3>
                            <ol className="">
                                <li>Working Notes</li>
                                <li>Brainstorming</li>
                                <li>Premise</li>
                            </ol>
                        </section>
                        <section className="group__content">
                            <h3>Characters</h3>
                            <ol className="">
                                <li>Working Notes</li>
                                <li>Protagonist</li>
                                <li>Supporting Character 1</li>
                            </ol>
                        </section>
                        <section className="group__content">
                            <h3>Setting</h3>
                            <ol className="">
                                <li>Working Notes</li>
                                <li>Worldbuilding</li>
                            </ol>
                        </section>
                    </div>
                </div>

                {/* Section 3 - Footer */}
                <div className="sb__footer">
                    <h3>Search</h3>
                    <h3>Settings</h3>
                </div>
            </div>
        </aside>
    )
};