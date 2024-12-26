import React, { useState, useRef, useEffect, useContext } from 'react'
import { UserContext } from './Navbar';

export default function NoteAppBody() {
    const inputid = useContext(UserContext);
    const [notes, setNotes] = useState([]);

    const title = useRef();
    const desc = useRef();


    function addNote(e) {
        let titleValue = title.current.value;
        let descriptionValue = desc.current.value;
        const newNote = {
            title: titleValue,
            descriptionValue: descriptionValue,
            color: generateColor()
        }

        const updateNotes = [...notes, newNote];
        setNotes(updateNotes);

        localStorage.setItem("notes", JSON.stringify(updateNotes));

        title.current.value = '';
        desc.current.value = '';

        //alert('Note Added Successfully');

    }

    function generateColor() {
        let randomColor = '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0');
        return randomColor;
    }

    useEffect(() => {
        function getNotes() {
            const obj = localStorage.getItem("notes");
            if (obj) {
                setNotes(JSON.parse(obj));
            }
        }
        getNotes()
    }, []);

    function deleteNote(index) {
        let tempNotes = [...notes];
        tempNotes.splice(index, 1);
        setNotes(tempNotes);
        localStorage.setItem("notes", JSON.stringify(tempNotes));
    }
    function updateNote(index) {
        console.log(index);
        title.current.value = notes[index].title;
        desc.current.value = notes[index].descriptionValue;
        let tempNotes = [...notes];
        tempNotes.splice(index, 1);
        setNotes(tempNotes);
        localStorage.setItem("notes", JSON.stringify(tempNotes));
    }



    return (
        <>
            <div className="container mt-5">

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" ref={title} />

                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                    <textarea type="password" className="form-control" id="exampleInputPassword1" ref={desc}></textarea>
                </div>

                <button type="button" className="btn btn-success" onClick={() => addNote(this)}>Add Note</button>

            </div>


            <div className='container mt-5'>
                <h3>Your Notes</h3>
                <hr />
            </div>

            

            {notes?.length > 0 && (
                <div className='container mt-5'>
                    <div className='row' >
                        {notes?.map((note, index) => (
                            note?.title.toString().toLowerCase().includes(inputid.toString().toLowerCase()) && <div className="col-3 ms-2 mt-2" key={index} style={{ backgroundColor: note?.color }}>
                                <div className="card m-2">
                                    <div className="card-body" style={{ backgroundColor: note?.color, color: "white" }}>
                                        <h5 className="card-title">{note?.title}</h5>
                                        <p className="card-text">{note?.descriptionValue}</p>
                                        <button href="/" className="btn btn-danger" onClick={() => deleteNote(index)}>Delete Note</button>
                                        <button className="btn btn-info mx-2" onClick={() => updateNote(index)}>Update Note</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </>
    )
}
