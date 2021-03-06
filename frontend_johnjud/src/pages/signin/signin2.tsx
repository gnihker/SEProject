import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Button,Container,FormGroup,Col,Label} from 'reactstrap';
import './signin.css';
import { Formik,Form, Field, ErrorMessage , FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Navigation2 from '../../Navigation/Navigation2';

import authnService from '../signin/AuthenService';
import {useState} from 'react';
import {useHistory} from 'react-router-dom';


type SigninFormProb = {
    signinCallback: () => void
}

const RegisterSchema = Yup.object().shape({
    username: Yup.string()
        .min(8, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    password: Yup.string()
        .min(8, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required')
});

interface Value2{
    username: string,
    password: string
}

const Signin = (props: SigninFormProb) => {
    const [signInErrorMessage, setSignInErrorMessage] = useState('')
    const history = useHistory();
        return(
            <div>
                <Navigation2/>
                <Container>
                    <div className='left-half'>
                        <div id='logo'/>
                    </div>
                    <div className='right-half'>
                        <div className='right-white-bg'>
                            <div className='box2'>
                                <Container>
                                    <h2 id='center'> Sign in </h2>
                                    <br/><br/>

                                    <Formik
                                        initialValues={{
                                            username: '',
                                            password: ''
                                        }}
                                        onSubmit={async (
                                            values: Value2,
                                            { setSubmitting }: FormikHelpers<Value2>
                                        ) => {
                                            const result = await authnService.sendRequestSignIn(values);
                                            if(!result) {
                                                setSignInErrorMessage('Sign In error: wrong username or password');
                                            }else {
                                                setSignInErrorMessage('')
                                                if (props.signinCallback){
                                                    props.signinCallback();
                                                }
                                                history.push("/receiver/home")
                                            }
                                            setSubmitting(false);
                                        }}
                                        validationSchema={RegisterSchema}
                                    >
                                        {() => (
                                            <Form>
                                                <Col>
                                                    <FormGroup>
                                                        <Label for="username" id='head_box'>Username</Label>
                                                        <Field name="username"
                                                               type="text"
                                                               id="username"
                                                               className={`form-control`}
                                                               placeholder="username"
                                                               />
                                                        <ErrorMessage component="div" name="username" className="invalid-feedback" />
                                                    </FormGroup>
                                                </Col>
                                                <Col>
                                                    <FormGroup>
                                                        <Label for="password" id='head_box'>Password</Label>
                                                        <Field name="password"
                                                               type="password"
                                                               id="password"
                                                               className={`form-control`}
                                                               placeholder="password"/>
                                                        <ErrorMessage component="div" name="password" className="invalid-feedback" />
                                                    </FormGroup>
                                                </Col>
                                                <Button type='submit'id='button_signin'>Sign in</Button>
                                                <div className='last_box'>
                                                    { signInErrorMessage}
                                                </div>
                                                
                                            </Form>
                                        )}
                                    </Formik>

                                </Container>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

export default Signin;