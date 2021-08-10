import React, { useEffect, useState } from 'react'
import { CssBaseline, Container, Typography } from '@material-ui/core'
import axios from 'axios'
import AddModal from '../AddModal'
import ArticleList from '../articleList/ArticleList'
import API from '../../constants/api'

function Article() {
    const [articles, setArticles] = useState([])
    let fetchArticles = async () => {
        const response = await axios.get(API.BASE_URL + '/article/getAllArticle').catch(err => {
            console.log('Err', err)
        })
        console.log("fetchArticles", response.data.articleObj)
        setArticles(response.data.articleObj)
    }

    useEffect(() => {
        fetchArticles()
    }, [])

    return (
        <div
            style={{
                position: 'static',
                bottom: 30,
                right: 30,
            }}
        >
            <CssBaseline />
            <Container maxWidth='md'>
                <Typography
                    component='div'
                    style={{ backgroundColor: '#cfe8fc', padding: '1vh', overflowY: 'scroll' }}
                >
                    <AddModal fetchArticles={fetchArticles} />
                    <ArticleList data={articles} />
                </Typography>
            </Container>
        </div>
    )
}

export default Article
