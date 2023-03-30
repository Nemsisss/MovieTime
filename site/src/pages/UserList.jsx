import React, {useState} from 'react';
import "../styles/user.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function UserList() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [input, setInput] = React.useState('')
    return(
        <div>
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

            <div className="row mx-auto g-3 movie-user-list">
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