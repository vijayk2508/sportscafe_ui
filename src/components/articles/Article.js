import React from 'react'
import { CssBaseline, Container, Button, Typography } from '@material-ui/core';
import { Add } from "@material-ui/icons"
import AddModal from "../AddModal"
import ArticleList from "../articleList/ArticleList"


function Article() {
    return (
        <div style={{
            position: 'static',
            bottom: 30,
            right: 30
        }}>
            <CssBaseline />
            <Container maxWidth="md">
                <Typography component="div" style={{ backgroundColor: '#cfe8fc', padding: "1vh", overflowY: "scroll" }} >
                    <AddModal />
                    <ArticleList />
                </Typography>

            </Container>

        </div>
    )
}

export default Article
