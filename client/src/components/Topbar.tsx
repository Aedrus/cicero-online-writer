export default function Topbar() {
    return (
        <header className="topbar">
            <div className="topbar__left">
                <div className="topbar__left__menu">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                </div>

                <div className="topbar__left__logo">
                    <h1>Cicero</h1>
                </div>
            </div>

            <div className="topbar__middle__title">
                <h2>Protagonist Backstory</h2>
            </div>

            <div className="topbar__right">
                <h3>Zoom</h3>
                <h3>Help</h3>
                <img src="" alt="user profile" />
            </div>
        </header>
    )
};