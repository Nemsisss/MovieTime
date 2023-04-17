import React, {useState} from 'react';
import "../styles/user.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Navbar from '../components/Navbar';
function UserList() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [input, setInput] = React.useState('');
    // const [lists, setLists] = useState([]);

    // const [input2, setInput2] = React.useState('');
    // const [show2, setShow2] = useState(false);
    // const [listIdHook, setListId] = useState('');
    // const handleClose2 = () => setShow2(false);
    // const handleShow2 = () => setShow2(true);
    // const loadDataOneTime = async() => {
    //     const url = 'http://localhost:8080/daniel/1/list';
    //     const response = await fetch(url, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }).catch((error) => {
    //         console.log(error);
    //     });
    //     const responseArray = response.json();
    //     console.log(responseArray);
    //     await responseArray
    //         .then((value) => {
    //             console.log(value);//This is a fulfilled promise  👈
    //             setLists(value);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }

    // useEffect(() => {
    //     loadDataOneTime();
    // }, [])
    // const addList = async(e)  => {
    //     e.preventDefault();
    //     const url = 'http://localhost:8080/daniel/1/list';
    //     const data = {listName: input};
    //     const response = await fetch(url, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(data)
    //     }).catch((error) => {
    //         console.log(error);
    //
    //     });
    //     console.log(response);
    //     if (response.status == 200) {
    //         const url = 'http://localhost:8080/daniel/1/list';
    //         const response = await fetch(url, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         }).catch((error) => {
    //             console.log(error);
    //         });
    //         const responseArray = response.json();
    //         console.log(responseArray);
    //         await responseArray
    //             .then((value) => {
    //                 console.log(value);//This is a fulfilled promise  👈
    //                 setLists(value);
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //             });
    //         for (let i = 0; i < lists.length; i++) {
    //             console.log(lists[i]);
    //             lists[i].listName;
    //             console.log(lists[i].listId);
    //         }
    //     }
    //     setShow(false);
    //     console.log(lists);
    // }
    // const deleteList = (listId) => async(e) => {
    //     e.preventDefault();
    //     let url = 'http://localhost:8080/daniel/1/' + listId + '/list';
    //     console.log(url);
    //     const response = await fetch(url, {
    //         method: 'DELETE',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }).catch((error) => {
    //         console.log(error);
    //     });
    //     if (response.status == 200) {
    //         const url = 'http://localhost:8080/daniel/1/list';
    //         const response = await fetch(url, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         }).catch((error) => {
    //             console.log(error);
    //         });
    //         const responseArray = response.json();
    //         console.log(responseArray);
    //         await responseArray
    //             .then((value) => {
    //                 console.log(value);//This is a fulfilled promise  👈
    //                 setLists(value);
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //             });
    //     }
    // }

    // const renameList = async(e) => {
    //     e.preventDefault();
    //     document.getElementById('movie-list-row').innerHTML = '';
    //     const url = 'http://localhost:8080/daniel/1/' + listIdHook + '/name';
    //     const data = input2;
    //     const response = await fetch(url, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(data)
    //     }).catch((error) => {
    //         console.log(error);
    //     });
    //     if (response.status == 200) {
    //         const url = 'http://localhost:8080/daniel/1/list';
    //         const response = await fetch(url, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         }).catch((error) => {
    //             console.log(error);
    //         });
    //         const responseArray = response.json();
    //         console.log(responseArray);
    //         let returnValue = [];
    //         await responseArray
    //             .then((value) => {
    //                 console.log(value);//This is a fulfilled promise  👈
    //                 setLists([]);
    //                 returnValue = value;
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //             });
    //         setLists(returnValue);
    //     }
    //     handleClose2();
    //     setListId('');
    // }
    // const newFunction = (listId) => async(e) => {
    //     handleShow2();
    //     setListId(listId);
    // }
    return(
        <div>
            <Navbar />
            <h1 className = "Title">Your Movie List</h1>
            <Button className = "movie-button" variant="primary" data-testid = "add-button" onClick={handleShow}>
                Launch demo modal
            </Button>
            <Modal show={show} data-testid = "last-button" onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a new list</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <label>
                            Name:
                            <input type="text" name="name" data-testid = "input-list" onChange={event => setInput(event.target.value)}/>
                        </label>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" data-testid = "close-button" onClick={handleClose}>
                        Close
                    </Button>
                    <Button data-testid = "save-changes" variant="primary" onClick={() => {alert(input)}}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            {/*<Modal show={show2} data-testid = "change-button" onHide={handleClose2} animation={false}>*/}
            {/*    <Modal.Header closeButton>*/}
            {/*        <Modal.Title>Rename list</Modal.Title>*/}
            {/*    </Modal.Header>*/}
            {/*    <Modal.Body>*/}
            {/*        <form>*/}
            {/*            <label>*/}
            {/*                Name:*/}
            {/*                <input type="text" name="name" data-testid = "changeInput-list" onChange={event => setInput2(event.target.value)}/>*/}
            {/*            </label>*/}
            {/*        </form>*/}
            {/*    </Modal.Body>*/}
            {/*    <Modal.Footer>*/}
            {/*        <Button variant="secondary" data-testid = "close-button" onClick={handleClose2}>*/}
            {/*            Close*/}
            {/*        </Button>*/}
            {/*        <Button data-testid = "save-changes" variant="primary" onClick={renameList}>*/}
            {/*            Save Changes*/}
            {/*        </Button>*/}
            {/*    </Modal.Footer>*/}
            {/*</Modal>*/}

            <div className="row mx-auto g-3 movie-user-list" id = "movie-list-row">
                {/*{lists.map((item, index) => (*/}
                {/*    <div className="col-6 col-lg-4 text-center user-movie-list" key = {item.listId}>*/}
                {/*        <img className="image" src={'https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg'} key = {item.listName} alt="Movie image" />*/}
                {/*        <button className = "list-button" key = {item.listId}>{item.listName}</button>*/}
                {/*        <button className = "list-button" key = {item.listId} onClick = {deleteList(item.listId)}>Delete</button>*/}
                {/*        <button className = "list-button" key = {item.listId} onClick = {newFunction(item.listId)}>Rename</button>*/}
                {/*    </div>*/}
                {/*))}*/}
                <div className="col-6 col-lg-4 text-center user-movie-list">
                    <img className="image" src={'https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg'} alt="Movie image" />
                    <button className = "list-button">View</button>
                </div>
                <div className="col-6 col-lg-4 text-center user-movie-list">
                    <img className="image" src={'https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg'} alt="Movie image" />
                    <button className = "list-button">View</button>
                </div>
                <div className="col-6 col-lg-4 text-center user-movie-list">
                    <img className="image" src={'https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg'} alt="Movie image" />
                    <button className = "list-button">View</button>
                </div>
                <div className="col-6 col-lg-4 text-center user-movie-list">
                    <img className="image" src={'https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg'} alt="Movie image" />
                    <button className = "list-button">View</button>
                </div>
                <div className="col-6 col-lg-4 text-center user-movie-list">
                    <img className="image" src={'https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg'} alt="Movie image" />
                    <button className = "list-button">View</button>
                </div>
                <div className="col-6 col-lg-4 text-center user-movie-list">
                    <img className="image" src={'https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg'} alt="Movie image" />
                    <button className = "list-button">View</button>
                </div>
            </div>

        </div>
    );
}

export default UserList