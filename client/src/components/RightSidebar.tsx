export default function RightSidebar() {
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
                    <div className="content-group">
                        <div className="content-group__hdr">
                            <h2>Page Settings</h2>
                            <i>Chevron</i>
                        </div>
                        <section className="content-group__content">
                            <h3>Icon Set</h3>
                            <fieldset></fieldset>
                        </section>
                        <section className="content-group__content">
                            <h3>Comment Color</h3>
                            <fieldset></fieldset>
                        </section>
                        <section className="content-group__content">
                            <h3>Icon Spacing</h3>
                            <fieldset></fieldset>
                        </section>
                    </div>
                    <div className="content-group">
                        <div className="content-group__hdr">
                            <h2>Notes</h2>
                            <i>Chevron</i>
                        </div>
                        <section className="content-group__content">
                            <textarea name="notes" id="notes" cols={30} rows={10}></textarea>
                        </section>
                    </div>
                </div>
            </div>
        </aside>
    )
};