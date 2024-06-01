import { Link, useLocation } from "react-router-dom"
import "./NavBar.css"
import logo from "../../img/icono_web.png"
import Search from "../search/Search"

const links = [
    { name: "Home", href: "/", style: "btn-menu" },
    { name: "About", href: "/about", style: "btn-menu" },
    { name: "Contacto", href: "/contacto", style: "btn-menu" },
    { name: "Admin", href: "/addpropiedad", style: "btn-menu btn-menu-admin" }
]

const NavBar = () => {
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    return (
        <div className="header-container">
            <Link to="/"><img src={logo} className="logo" /></Link>

            <div style={{width: '20%'}}>
                {isHomePage && <Search />}
            </div>

            <nav className="menu-container" >
                {links.map(x => (
                    <Link key={x.name} to={x.href} className={x.style} > {x.name} </Link>
                ))}
            </nav>
        </div>
    )
}

export default NavBar