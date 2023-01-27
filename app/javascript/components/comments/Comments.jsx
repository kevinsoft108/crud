import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MDBTypography,
  MDBSpinner,
  MDBBtn,
  MDBIcon,
  MDBTextArea,
  MDBContainer,
  MDBRow,
  MDBCol,
}
from 'mdb-react-ui-kit';
import {
  Field,
  Form,
  Formik,
  ErrorMessage
} from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import FetchService from '../../services/Fetch.service';

const Comments = ({ issue }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      try {
        setIsLoading(true);
        FetchService.isofetchAuthed({
          url: '/api/v1/comments',
          params: { commentable_id: issue.id, commentable_type: 'issue' },
        })
          .then((res) => {
            setIsLoading(false);
            setComments(res);
          })
          .catch();
      } catch (error) {
        console.log(error);
      }
    };
    
    if (issue.id) fetchData();
  }, [issue]);

  const newComment = () => {
    const old = [...comments];
    old.unshift({});
    setComments(old);
    setIsAdding(true);
  }

  const addComment = newComment => {
    newComment.commentable_id = issue.id;
    newComment.commentable_type = 'issue';
    try {
      FetchService.isofetchAuthed({
        url: `/api/v1/comments`,
        data: { comment: newComment },
        method: 'post'
      })
        .then((res) => {
          setIsAdding(false);
          const newComments = [...comments];
          const idx = newComments.findIndex(comment => comment.id === undefined);
          newComments[idx] = res;
          setComments(newComments);
          toast.success('Comment Added!');
        })
        .catch();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteComment = commentId => {
    const sure = window.confirm('Are you sure?');
  
    if (sure) {
      try {
        FetchService.isofetchAuthed({
          url: `/api/v1/comments/${commentId}`,
          method: 'delete'
        })
          .then((res) => {
            const newComments = [...comments];
            const idx = newComments.findIndex(comment => comment.id === Number(commentId));
            newComments.splice(idx, 1);
            setComments(newComments);
            toast.success('Comment Deleted!');
          })
          .catch();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <MDBTypography tag='h6'>
        <strong>Comments</strong>
      </MDBTypography>
      {isLoading ? (
        <div className='d-flex justify-content-center'>
          <MDBSpinner className='mx-2' color='secondary'>
            <span className='visually-hidden'>Loading...</span>
          </MDBSpinner>
        </div>
      ) : (
        <>
          <div className='d-flex justify-content-end mb-4'>
            {issue.id ? (
              <MDBBtn className='me-1' disabled={isAdding} onClick={newComment}>
                <MDBIcon fas icon='plus' /> Add comment
              </MDBBtn>
            ) : (
              null
            )}
          </div>
          <MDBContainer className='comments-containger'>
            {comments.map((comment, i) => {
              if (comment.id)
                return (
                  <MDBContainer key={i}>
                    <MDBRow between>
                      <MDBCol size='3'>
                        {comment.created_at ? new Date(comment.created_at).toISOString().slice(0, 10) : 'Now'}
                      </MDBCol>
                      <MDBCol size='9'>
                        <MDBRow>
                          <MDBCol size='10'>
                            <div className='bubble'>{comment.body}</div>
                          </MDBCol>
                          <MDBCol size='2'>
                            <div className='d-flex justify-content-end'>
                              <MDBBtn color='tertiary' rippleColor='light' onClick={(e) => {e.preventDefault();deleteComment(comment.id);}}>
                                <MDBIcon fas icon='trash' /> Delete
                              </MDBBtn>
                            </div>
                          </MDBCol>
                        </MDBRow>
                      </MDBCol>
                    </MDBRow>
                  </MDBContainer>
                )
              return (
                <MDBContainer key={i}>
                  <MDBRow between>
                    <MDBCol size='3'>
                      {comment.created_at ? new Date(comment.created_at).toISOString().slice(0, 10) : 'Now'}
                    </MDBCol>
                    <MDBCol size='9'>
                      <Formik
                        initialValues={{
                          body: '',
                        }}
                        validationSchema={Yup.object({
                          body: Yup.string()
                            .required('Required'),
                        })}
                        onSubmit={(values, { setSubmitting }) => {
                          addComment(values);
                        }}
                        key={i}
                      >
                        {(formik) => (
                          <Form>
                            <MDBRow>
                              <MDBCol size='10'>
                                <div className='inputWrap'>
                                  <Field id='body' as={MDBTextArea} name='body' placeholder='Comment' wrapperClass='mb-4' label='Body' />
                                  <ErrorMessage name='body'>{msg => <div className='error'>{msg}</div>}</ErrorMessage>
                                </div>
                              </MDBCol>
                              <MDBCol size='2'>
                                <div className='d-flex justify-content-end'>
                                  <MDBBtn type='submit' color='tertiary' rippleColor='light'>
                                    <MDBIcon fas icon='paper-plane' /> Send
                                  </MDBBtn>
                                </div>
                              </MDBCol>
                            </MDBRow>
                          </Form>
                        )}
                      </Formik>
                    </MDBCol>
                  </MDBRow>
                </MDBContainer>
              )
            })}
          </MDBContainer>
        </>
      )}
    </>
  );
};

export default Comments;
