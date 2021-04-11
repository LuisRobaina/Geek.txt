import { Segment, Statistic } from "semantic-ui-react";
import { Link } from "react-router-dom";

const MyBooksList = ({ records }) => {
  const getBooks = () => {
    let books = records.map(function (record) {
      return (
        <div className="ui card">
          <div className="image">
            <img src={record.CoverURL} alt=""></img>
          </div>
          <div className="content">
            <Link to={`/books/${record.BookID}`}>
              <a className="header">{record.Title}</a>
            </Link>
            <div className="meta">
              <span className="date">{}</span>
            </div>
          </div>
        </div>
      );
    });
    return books;
  };
  return (
    <Segment>
      <Statistic>
        <Statistic.Value>{records.length}</Statistic.Value>
        <Statistic.Label>Books</Statistic.Label>
      </Statistic>
      {getBooks()}
    </Segment>
  );
};

export default MyBooksList;
