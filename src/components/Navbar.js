import React, { createContext, useState } from 'react'
import NoteAppBody from './NoteAppBody';

export const UserContext = createContext();

export default function Navbar() {
    var inputid;
    const [val, setVal] = useState('');
    function searchTitle() {
        inputid = document.getElementById("inputid").value;
        setVal(inputid);
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom border-body" data-bs-theme="dark">
                <div className="container">
                    <a className="navbar-brand" href="/">Note App</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div>
                        <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">
                            <input id='inputid' className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => searchTitle()} />
                            <button className="btn btn-outline-success" type="submit"  >Search</button>
                        </div>
                    </div>
                </div>
            </nav>
            <UserContext.Provider value={val}>
            <NoteAppBody/>
            </UserContext.Provider>
        </>
    )
}
