import { NavLink } from "react-router-dom";
import Searchbar from "../searchbar/searchbar";

export default function Navbar({handleChange, handleSubmit}) {
    return (
        <div>
            <Searchbar handleChange={handleChange} handleSubmit={handleSubmit} />
            <NavLink to="/">
                <button>Landing</button>
            </NavLink>
            <NavLink to="/home">
                <button>Home</button>
            </NavLink>
            <NavLink to="/form">
                <button>Create</button>
            </NavLink>
        </div>
    )
}