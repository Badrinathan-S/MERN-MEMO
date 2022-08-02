import React, { useEffect } from "react";
import {
  Accordion,
  Badge,
  Button,
  Card,
  useAccordionButton,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import MainScreen from "../../component/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../actions/notesActions";
import Loading from "../../component/Loading";
import ErrorMessage from "../../component/ErrorMessage";

const MyNotes = ({ search }) => {
  let navigate = useNavigate();

  const dispatch = useDispatch();

  const noteList = useSelector((state) => state.notesList);

  const { loading, notes, error } = noteList;

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const noteCreate = useSelector((state) => state.notesCreate);

  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.notesUpdate);

  const { success: successUpdate } = noteUpdate;

  const noteDelete = useSelector((state) => state.notesDelete);

  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
  };

  const CustomToggle = ({ eventKey, content }) => {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log(eventKey)
    );

    return (
      <span
        style={{
          textDecoration: "none",
          color: "black",
          flex: 1,
          cursor: "pointer",
          alignSelf: "center",
          fontSize: 18,
        }}
        onClick={decoratedOnClick}
      >
        {content}
      </span>
    );
  };

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      navigate("/");
    }
  }, [
    dispatch,
    navigate,
    successCreate,
    userInfo,
    successUpdate,
    successDelete,
  ]);

  const note = notes ? notes : [];

  return (
    <MainScreen title={`Welcome back ${userInfo ? userInfo.name : null}`}>
      <Link to="/createnote">
        <Button style={{ marginLeft: 10, marginBottom: 10 }} size="lg">
          createnote
        </Button>
      </Link>
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loading && <Loading />}
      {loadingDelete && <Loading />}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {note
        .reverse()
        .filter((filteredNote) =>
          filteredNote.title.toLowerCase().includes(search.toLowerCase())
        )
        .map((note) => (
          <Accordion key={note._id}>
            <Card>
              <Card.Header style={{ display: "flex" }}>
                <CustomToggle eventKey="0" content={note.title}></CustomToggle>
                <div>
                  <Link to={{ pathname: `/note/${note._id}` }}>
                    {" "}
                    <Button>Edit</Button>
                  </Link>

                  <Button
                    variant="danger"
                    className="mx-2"
                    onClick={() => deleteHandler(note._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <h4>
                    <Badge bg="success">category - {note.category}</Badge>
                  </h4>
                  <blockquote className="blockquote mb-0">
                    <p>{note.content}</p>
                    <footer className="blockquote-footer">
                      Created on{" "}
                      <cite title="Source Title">
                        {note.createdAt.substring(0, 10)}
                      </cite>
                    </footer>
                  </blockquote>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        ))}
    </MainScreen>
  );
};

export default MyNotes;
