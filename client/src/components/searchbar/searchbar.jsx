import "./searchbar.css";

function Searchbar({handleChange, handleSubmit}) {
    return ( 
        <div>
            <form onChange={(event) => handleChange(event)}>
                <input placeholder="Nombre de la raza" type="search" name="input-search"/>
                <button type="submit" onClick={handleSubmit}>Buscar</button>
            </form>
        </div>
    );
}

export default Searchbar;