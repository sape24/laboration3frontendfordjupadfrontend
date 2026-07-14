import { NavLink, Outlet } from "react-router-dom";

function Layout() {
    return(
        <div>
            <header>
                <nav>
                    <NavLink to="/">Produkter</NavLink>
                    <NavLink to="/login">Logga in</NavLink>
                    <NavLink to="/admin">Adminstration</NavLink>
                </nav>
            </header>

            <main>
                <Outlet/>
            </main>
        </div>
    );
}

export default Layout;
