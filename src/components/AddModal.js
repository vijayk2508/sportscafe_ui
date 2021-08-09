import React from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import 'react-toastify/dist/ReactToastify.css';
import { TextField, Input } from '@material-ui/core';
import axios from 'axios';
import Toast from "../components/Toast";
import API from '../constants/api'
import toastMessage from "../constants/toastType";


const validationSchema = yup.object({
    sportName: yup
        .string('Enter Sport Name')
        .required('Email is required'),
    article: yup
        .string('Enter your article')
        .required('article is required'),
    content: yup
        .string('Enter Content')
        .required('Content is required'),
    author: yup
        .string('Enter Content')
        .required('Content is required'),
    img: yup
        .mixed('Enter image')
        .required('image is required'),
});

const AddModal = (props) => {
    const formik = useFormik({
        initialValues: {
            sportName: '',
            article: '',
            content: '',
            img: '',
            author: ""
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            let formData = new FormData()
            for (let key in values) {
                formData.append(key, values[key])
            }
            const response = await axios.post(API.BASE_URL + "/article/insertArticle", formData)
                .catch(err => {
                    let message = err.response.data.message
                    console.log("Err", { ...err })
                    toastMessage.error(message)
                })

            resetForm()
            toastMessage.success(response.data.message)
            props.rerenderParentCallback()
        },
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="sportName"
                    name="sportName"
                    label="Sport Name"
                    value={formik.values.sportName}
                    onChange={formik.handleChange}
                    error={formik.touched.sportName && Boolean(formik.errors.sportName)}
                    helperText={formik.touched.sportName && formik.errors.sportName}
                />
                <TextField
                    fullWidth
                    id="article"
                    name="article"
                    label="Article"
                    value={formik.values.article}
                    onChange={formik.handleChange}
                    error={formik.touched.article && Boolean(formik.errors.article)}
                    helperText={formik.touched.article && formik.errors.article}
                />

                <TextField
                    fullWidth
                    id="content"
                    name="content"
                    label="Content"
                    value={formik.values.content}
                    onChange={formik.handleChange}
                    error={formik.touched.content && Boolean(formik.errors.content)}
                    helperText={formik.touched.content && formik.errors.content}
                />
                <TextField
                    fullWidth
                    id="author"
                    name="author"
                    label="Author"
                    value={formik.values.author}
                    onChange={formik.handleChange}
                    error={formik.touched.author && Boolean(formik.errors.author)}
                    helperText={formik.touched.author && formik.errors.author}
                />
                <TextField
                    fullWidth
                    id="image"
                    name="img"
                    label="Image"
                    type="file"
                    value={formik.values.image}
                    onChange={(event) => {
                        console.log("event", event)
                        formik.setFieldValue("img", event.target.files[0]);
                    }}
                    error={formik.touched.image && Boolean(formik.errors.image)}
                    helperText={formik.touched.image && formik.errors.image}
                />
                <Button color="primary" variant="contained" fullWidth type="submit">
                    Submit
        </Button>
            </form>

            <Toast />
        </>
    );
};

export default AddModal
