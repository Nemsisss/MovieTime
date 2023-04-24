import React, {useEffect, useState} from 'react';
import "../styles/user.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Navbar from '../components/Navbar';
import {useNavigate} from "react-router-dom";
function UserList(props) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!props.hasComeFromValid) {
            navigate('/login');
        }
        else{
            props.setHasComeFromValid(false);
        }
    }, [navigate]);
    // set the inactivity timeout to 60 seconds
    const inactivityTimeout = 60 * 1000; // in milliseconds

    let timeoutId;

    function resetTimeout() {
        // clear the previous timeout (if any)
        clearTimeout(timeoutId);
        //console.log("wow");

        // start a new timeout
        timeoutId = setTimeout(() => {
            // redirect the user to the login page
            navigate("/login");
            //window.location.href = "/login";
        }, inactivityTimeout);
    }

    resetTimeout();

// listen for user activity events (e.g. mousemove, keypress, etc.)
    window.addEventListener("mousemove", resetTimeout);
    window.addEventListener("keypress", resetTimeout);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [input, setInput] = React.useState('');
    const [lists, setLists] = useState([]);

    const [input2, setInput2] = React.useState('');
    const [show2, setShow2] = useState(false);
    const [listIdHook, setListId] = useState('');
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const [isPublic, setPublic] = useState(false);
    const [showRemove, setRemove] = useState(false);
    const handleRemoveClose = () => setRemove(false);
    const handleRemoveOpen = () => setRemove(true);

    const [showCompareUser, setCompareUser] = useState(false);
    const [showCompareList, setCompareList] = useState(false);
    const [otherUsers, setOtherUsers] = useState([]);
    const [otherUserId, setOtherUserId] = useState(0);
    //const [otherUserLists, setOtherUserLists] = useState([]);
    const [otherUserListId, setOtherUserListId] = useState(0);
    async function loadDataOneTime() {
        const url = 'http://localhost:8080/daniel/' + props.userId + '/list';
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response);
        const responseArray = response.json();
        console.log(responseArray);
        await responseArray
            .then((value) => {
                console.log(value);//This is a fulfilled promise  👈
                setLists(value);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    async function loadUsers() {
        const url = 'http://localhost:8080/daniel/user';
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const responseArray = response.json();
        if (response.status == 200) {
            await responseArray
                .then((value) => {
                    console.log(value);//This is a fulfilled promise  👈
                    setOtherUsers(value);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    useEffect(() => {
        async function fetchLists() {
            await loadDataOneTime();
        }
        async function fetchUsers() {
            await loadUsers();
        }
        fetchLists();
        fetchUsers();
    }, [])

    async function CompareList() {
        const url = 'http://localhost:8080/daniel/compare/' + props.userId + '/' + listIdHook + '/' + otherUserListId;
        const data = {listName: input2, isPublic: isPublic};
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)});
        if (response.status == 200) {
            let responseArray = response.json();
            await responseArray
                .then((value) => {
                    console.log(value);//This is a fulfilled promise  👈
                })
                .catch((err) => {
                    console.log(err);
                });
            setOtherUserId(0);
            setOtherUserListId(0);
        }
    }
    const addList = async()  => {
        const url = 'http://localhost:8080/daniel/' + props.userId + '/list';
        const data = {listName: input, isPublic: isPublic};
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).catch((error) => {
            console.log(error);

        });
        console.log(response);
        if (response.status == 200) {
            const url = 'http://localhost:8080/daniel/' + props.userId + '/list';
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).catch((error) => {
                console.log(error);
            });
            const responseArray = response.json();
            console.log(responseArray);
            await responseArray
                .then((value) => {
                    console.log(value);//This is a fulfilled promise  👈
                    setLists(value);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        setShow(false);
        await loadDataOneTime();
        console.log(lists);
    }
    async function deleteList(listId) {
        let url = 'http://localhost:8080/daniel/' + props.userId + '/' + listId + '/list';
        console.log(url);
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch((error) => {
            console.log(error);
        });
        if (response.status == 200) {
            const url = 'http://localhost:8080/daniel/' + props.userId + '/list';
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).catch((error) => {
                console.log(error);
            });
            const responseArray = response.json();
            console.log(responseArray);
            await responseArray
                .then((value) => {
                    console.log(value);//This is a fulfilled promise  👈
                    setLists(value);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    const renameList = async() => {
        document.getElementById('movie-list-row').innerHTML = '';
        const url = 'http://localhost:8080/daniel/' + props.userId + '/' + listIdHook + '/name';
        const data = input2;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).catch((error) => {
            console.log(error);
        });
        if (response.status == 200) {
            await loadDataOneTime();
            // const url = 'http://localhost:8080/daniel/1/list';
            // const response = await fetch(url, {
            //     method: 'GET',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     }
            // }).catch((error) => {
            //     console.log(error);
            // });
            // const responseArray = response.json();
            // console.log(responseArray);
            // let returnValue = [];
            // await responseArray
            //     .then((value) => {
            //         console.log(value);//This is a fulfilled promise  👈
            //         setLists([]);
            //         returnValue = value;
            //     })
            //     .catch((err) => {
            //         console.log(err);
            //     });
            // setLists(returnValue);
        }
        setListId('');
    }
    // const newFunction = (listId) => async() => {
    //     await renameList();
    // }
    return(
        <div>
            <Navbar userId={props.userId} setHasComeFromValid={props.setHasComeFromValid}/>
            <h1 className = "Title">Your Movie List</h1>
            <Button className = "movie-button" variant="primary" data-testid = "add-button" onClick={handleShow}>
                Create New List
            </Button>
            <Modal show={show} data-testid = "create-button" onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a new list</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div onChange = {event => setPublic(event.target.value)}>
                        <input data-testid = "private-create" type="radio" value="false" name="gender"/> Private
                        <input data-testid = "public-create" type="radio" value="true" name="gender"/> Public
                    </div>
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
                    <Button data-testid = "save-changes" variant="primary" onClick={() => {alert(input); alert(isPublic); addList();}}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={show2} data-testid = "change-button" onHide={handleClose2} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Rename list</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <label>
                            Name:
                            <input type="text" name="name" data-testid = "changeInput-list" onChange={event => setInput2(event.target.value)}/>
                        </label>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" data-testid = "close-button-rename" onClick={() => {handleClose2();}}>
                        Close
                    </Button>
                    <Button data-testid = "save-changes-rename" variant="primary" onClick={async () => {
                        await renameList();
                        handleClose2();
                    }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal id = "remove-popup" show={showRemove}  onHide={handleRemoveClose} animation={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to delete?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" data-testid = "remove-yes" onClick={async () => {
                        console.log(listIdHook);
                        await deleteList(listIdHook);
                        handleRemoveClose();
                    }}>
                        Yes
                    </Button>
                    <Button variant="secondary" data-testid = "remove-no" onClick={handleRemoveClose}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal id = "compare-popup" show={showCompareUser}  onHide={() => {setCompareUser(false);}} animation={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Which User Do You Want to Compare With?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <select name="selectList" id="selectList" data-testid = "compare-first-select" onChange = {(event) => {
                            // setOtherUserId(event.target.value);
                            console.log("EVENT: " + event.target.value);
                            setOtherUserId(event.target.value);}
                        }>
                            <option value="0">Pick a User To Compare</option>
                            {otherUsers.map((user) => {
                                console.log(user.lists);
                                if (user.id === 1) {
                                    return;
                                }
                                return (
                                    <option data-testid = "select-user-compare" key={user.id} value={user.id}>{user.email}</option>
                                );
                            })}
                        </select>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" data-testid ="close-compare-first" onClick={() => {setCompareUser(false);}}>
                        Close
                    </Button>
                    <Button data-testid = "save-changes-compare" variant="primary" onClick={async () => {
                        await setCompareUser(false);
                        await setCompareList(true);
                    }}>
                        Compare
                    </Button>
                </Modal.Footer>
            </Modal>


            <Modal id = "compare-new-list" show={showCompareList}  onHide={() => {setCompareList(false);}} animation={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Compare and Create a New List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <select name="selectList" id="selectList" data-testid = "compare-second-select" onChange = {(event) => {setOtherUserListId(event.target.value);} }>
                            <option value="0">Lists to Pick From</option>
                            {otherUsers.map((user) => {
                                console.log(user);
                                console.log("Current user id: " + user.id);
                                console.log('Other user id: ' + otherUserId);
                                console.log(typeof(user.id) + " " + typeof(otherUserId));
                                if (user.id == otherUserId) {
                                    let lists = user.lists;
                                    console.log(lists);
                                    let listArray = [];
                                    for (let z = 0; z < lists.length; z++) {
                                        if (lists[z].isPublic === true) {
                                            listArray.push(
                                                <option data-testid = "user-list-compare" key={lists[z].listId} value={lists[z].listId}>{lists[z].listName}</option>
                                            );
                                        }
                                    }
                                    // lists.map((list, i) => {
                                    //     return(
                                    //         <option key={list.listId} value={list.listId}>{list.listName}</option>
                                    //     );
                                    // }
                                    return listArray;
                                }
                            })}
                            {/*{(otherUsers) => {*/}
                            {/*    console.log("HELLOOOOOO");*/}
                            {/*    if (otherUsers.length !== 0) {*/}
                            {/*        let user = otherUsers[otherUserId - 1];*/}
                            {/*        let lists = user.lists;*/}
                            {/*        lists.map((list, index) => {*/}
                            {/*            return(*/}
                            {/*                <option key={list.listId} value={list.listId}>{list.listName}</option>*/}
                            {/*            )*/}
                            {/*        });*/}
                            {/*    }*/}
                            {/*}}*/}
                        </select>
                        <div onChange = {event => setPublic(event.target.value)}>
                            <input data-testid = "private-compare" type="radio" value="false" name="gender"/> False
                            <input data-testid = "public-compare" type="radio" value="true" name="gender"/> True
                        </div>
                        <label>
                            List Name:
                            <input data-testid = "input-compare" type="text" name="List Name" onChange={event => setInput2(event.target.value)}/>
                        </label>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" data-testid = "close-compare-second" onClick={() => {setCompareList(false);}}>
                        Close
                    </Button>
                    <Button data-testid = "save-changes-final-compare" variant="primary" onClick={async () => {
                        alert(input2);
                        alert(otherUserId);
                        alert(otherUserListId);
                        if (otherUserId != 0) {
                            await CompareList();
                        }
                        await loadDataOneTime();
                        setCompareList(false);
                    }}>
                        Create New List
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="row mx-auto g-3 movie-user-list" id = "movie-list-row">
                {lists.map((item) => {
                    let source;
                    let temp;
                    if (item.movie.length === 0) {
                        source = "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg";
                    }
                    else {
                        source = item.movie[0].picture;
                    }
                    if (item.isPublic === false) {
                        temp = "Private"
                    }
                    else {
                        temp = "Public";
                    }
                    return(
                        <div className="col-6 col-lg-4 text-center user-movie-list" key = {item.listId}>
                            <div className = "movie-overlay">
                                <img className="image" src={source} alt="Movie image"/>
                                <button className = "list-rename" onClick = {() => {setListId(item.listId); handleShow2();}} data-testid= "rename-hover">Rename</button>
                                <button className = "list-delete" onClick = {() => {setListId(item.listId); handleRemoveOpen();}} data-testId = "delete-hover">Delete</button>
                                <button className = "list-compare" onClick = {() => {setListId(item.listId); setCompareUser(true);}} data-testid = "compare-hover">Compare</button>
                                <p className = "list-public">{temp}</p>
                            </div>
                            <button className = "list-details" onClick = {() => {props.setHasComeFromValid(true); props.setListId(item.listId); navigate(`/movies`);}}>{item.listName}</button>
                            {/*onClick = {() => {props.setHasComeFromValid(true); props.setListId(item.listId); navigate(`/movies`);}}*/}
                        </div>
                    );
                })}
                {/*<div className="col-6 col-lg-4 text-center user-movie-list">*/}
                {/*    <img className="image" src={'https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg'} alt="Movie image" />*/}
                {/*    <button className = "list-button">View</button>*/}
                {/*</div>*/}
                {/*<div className="col-6 col-lg-4 text-center user-movie-list">*/}
                {/*    <img className="image" src={'https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg'} alt="Movie image" />*/}
                {/*    <button className = "list-button">View</button>*/}
                {/*</div>*/}
                {/*<div className="col-6 col-lg-4 text-center user-movie-list">*/}
                {/*    <img className="image" src={'https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg'} alt="Movie image" />*/}
                {/*    <button className = "list-button">View</button>*/}
                {/*</div>*/}
                {/*<div className="col-6 col-lg-4 text-center user-movie-list">*/}
                {/*    <img className="image" src={'https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg'} alt="Movie image" />*/}
                {/*    <button className = "list-button">View</button>*/}
                {/*</div>*/}
                {/*<div className="col-6 col-lg-4 text-center user-movie-list">*/}
                {/*    <img className="image" src={'https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg'} alt="Movie image" />*/}
                {/*    <button className = "list-button">View</button>*/}
                {/*</div>*/}
                {/*<div className="col-6 col-lg-4 text-center user-movie-list">*/}
                {/*    <img className="image" src={'https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg'} alt="Movie image" />*/}
                {/*    <button className = "list-button">View</button>*/}
                {/*</div>*/}
            </div>

        </div>
    );
}

export default UserList