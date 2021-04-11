import SingleComment from './SingleComment';
import { Comment, Header, Segment, Statistic } from 'semantic-ui-react';
import { useState } from 'react';
import axios from "../config/axios";
import { Link } from "react-router-dom";

const MyBooksList = ({ records }) => {

    const getBooks = () => {
        let books = records.map(function (record) {
            return (
                <div class="ui card">
                    <div class="image">
                        <img src={record.CoverURL}></img>
                    </div>
                    <div class="content">
                        <Link to={`/books/${record.BookID}`}>
                            <a class="header">{record.Title}</a>
                        </Link>
                        <div class="meta">
                            <span class="date">{ }</span>
                        </div>
                    </div>
                </div>
            )
        });
        return books;
    }
    return (
        <Segment>
            <Statistic>
                <Statistic.Value>{records.length}</Statistic.Value>
                <Statistic.Label>Books</Statistic.Label>
            </Statistic>
            {getBooks()}
        </Segment>
    )
}

export default MyBooksList;