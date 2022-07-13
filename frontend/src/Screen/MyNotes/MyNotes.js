import React, { useEffect, useState } from "react";
import {
  Accordion,
  Badge,
  Button,
  Card,
  useAccordionButton,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import MainScreen from "../../component/MainScreen";
import axios from "axios";

const MyNotes = () => {
  let navigate = useNavigate();
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) {
      navigate("/");
    }
  }, [navigate]);
  const [notes, setNotes] = useState([]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      console.log(id);
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

  const fetchNotes = async () => {
    const { data } = await axios.get("/api/notes");
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <MainScreen title="Welcome back bro!!...">
      <Link to="/createnote">
        <Button style={{ marginLeft: 10, marginBotton: 6 }} size="lg">
          createnote
        </Button>
      </Link>
      {notes.map((note) => (
        <Accordion key={note._id}>
          <Card>
            <Card.Header style={{ display: "flex" }}>
              <CustomToggle eventKey="0" content={note.title}></CustomToggle>
              <div>
                <Button href={`/note/${note._id}`}>Edit</Button>
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
                    Created on - date
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
