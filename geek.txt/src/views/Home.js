import { useEffect, useState } from "react";
import BookList from "../components/BookList";
import Footer from "../components/Footer";
import axios from "../config/axios";
import { Container } from "semantic-ui-react";
import Dropdown from "../components/Dropdown/Dropdown";
import Sidebar from "../components/Sidebar";
import { BookContext } from "../contexts/BookContext";
import { Link } from "react-router-dom";
import { Message } from "semantic-ui-react";

const bookOptions = [
  { id: 1, name: 10 },
  { id: 2, name: 20 },
];

const Home = ({ user }) => {
  const [books, setBooks] = useState([]);
  const [defaultBooks, setDefaultBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookCount, setBookCount] = useState(10);

  useEffect(() => {
    axios
      .get("/books")
      .then((res) => {
        setBooks(res.data);
        // This causes the component to render a third time
        setDefaultBooks([...res.data]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container>
      {!user && (
        <Message positive>
          <Message.Header>Hello... mmm not sure who you are :(</Message.Header>
          <p>
            Please{" "}
            <Link to={`/login`}>
              <b>log in</b>
            </Link>{" "}
            or{" "}
            <Link to={`/register`}>
              <b>register</b>
            </Link>
          </p>
        </Message>
      )}
      {user && (
        <Message positive>
          <Message.Header>Hello {user.geekID}</Message.Header>
          <Link to={`/register`}>
            <p>My books</p>
          </Link>
        </Message>
      )}
      <h2>Our collection of Books</h2>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Dropdown
          prompt="Books per Page"
          value={bookCount}
          onChange={(val) => setBookCount(val)}
          width={135}
          options={bookOptions}
        />
      </div>
      <BookContext.Provider
        value={{ books, setBooks, currentPage, setCurrentPage, defaultBooks }}
      >
        <div style={{ display: "flex", flex: "10" }}>
          <Sidebar />
          <BookList
            bookData={books}
            bookCount={bookCount}
            setBookCount={setBookCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </BookContext.Provider>
      <Footer />
    </Container>
  );
};

export default Home;
