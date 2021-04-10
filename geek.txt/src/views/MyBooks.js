import { Segment } from 'semantic-ui-react';
import { useEffect, useState } from "react";
import axios from "../config/axios";
import MyBookList from "../components/MyBooksList";

const MyBooks = ({ user }) => {

    const [records, setRecordsSet] = useState([])    
    
    useEffect(() => {
        axios.get(`/purchases/${user._id}`)
            .then((res) => {
                console.log(res)
                setRecordsSet(res.data);
            })
            .catch((err) => console.log(err));
    }, []);
    return (
        <Segment>
            <h1>My Books Collection</h1>
            <MyBookList records={records}></MyBookList>
        </Segment>
    )
}
export default MyBooks