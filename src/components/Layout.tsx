import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import './Layout.css'

function Layout() {
    const {isLoggedIn, username, logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    }
    return(
        <div>
            <header>
                <nav className="navbar">
                    <NavLink to="/" className={({isActive}) => (isActive ? 'nav-link active' : 'nav-link')}>Produkter</NavLink>
                    {isLoggedIn ? (
                        <>
                            <NavLink to="/admin" className={({isActive}) => (isActive ? 'nav-link active' : 'nav-link')}>Administration</NavLink>
                            <span className="nav-user">Inloggad som {username}</span>
                            <button onClick={handleLogout} className="nav-button">Logga ut</button>
                        </>
                    ) : (
                        <NavLink to="/login" className={({isActive}) => (isActive ? 'nav-link active' : 'nav-link')}>Logga in</NavLink>
                    )}
                </nav>
            </header>

            <main className="container">
                <Outlet/>
            </main>
        </div>
    );
}

export default Layout;
