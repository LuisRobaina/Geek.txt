import { useEffect, useState } from 'react';
import axios from '../config/axios';
import { Header, Comment, Form, TextArea, Segment, Button } from 'semantic-ui-react';
import Comments from '../components/Comments';

const Book = () => {

    return (
        <div>
            <Segment>
                <Comment.Group threaded>
                    <Header as='h3' dividing>
                        Comments about this Book
                    </Header>
                    <Comments>

                    </Comments>
                </Comment.Group>
                        <Form reply>
                            <Form.TextArea />
                            <Button content='Add Reply' labelPosition='left' icon='edit' primary />
                        </Form>

                        <Form>
                            {/* Text area to add a comment.*/}
                            <TextArea placeholder='Tell us about this' />
                            <Button animated='fade'>
                                <Button.Content visible>Submit Comment</Button.Content>
                                <Button.Content hidden>Your opinion matters!</Button.Content>
                            </Button>
                        </Form>

            </Segment>
        </div>
    );
}

export default Book;