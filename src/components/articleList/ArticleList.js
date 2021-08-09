import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Button, CardActions } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios'
import Toast from "../../components/Toast";
import toastMessage from "../../constants/toastType";
import API from '../../constants/api'

const useStyles = makeStyles({
    root: {
        maxWidth: "100%",
        marginTop: "2%"
    },
    cardArea: {
        display: "flex",
        width: "100%",
        justifyContent: 'space-around'
    },
    cmedia: {
        width: "30%"
    },
    ccontent: {
        width: "60%"
    }

});

export default function ArticleList() {
    const classes = useStyles();
    const [articles, setArticles] = useState([])
    let fetchArticles = async () => {
        const response = await axios.get(API.BASE_URL + "/article/getAllArticle",)
            .catch(err => {
                console.log("Err", err)
            })

        let data = response.data.articleObj;
        console.log(data)
        setArticles(data)
    }

    const deleteArticle = async (id) => {
        if (!window.confirm("Are You Sure To Delete?")) return;
        const response = await axios.delete(API.BASE_URL + `/article/deleteArticle/${id}`,)
            .catch(err => {
                let message = err.response.data.message
                console.log("Err", { ...err })
                toastMessage.error(message)
            })

        fetchArticles()
        toastMessage.success(response.data.message)


    }

    useEffect(() => {
        fetchArticles()
    }, []);

    return (
        <div>
            {
                articles.map(ar => {
                    let imgUrl = `${API.BASE_URL}/static/${ar.image}`
                    return (
                        <Card className={classes.root}>
                            <CardActionArea className={classes.cardArea}>
                                <CardMedia
                                    className={classes.cmedia}
                                    component="img"
                                    alt="Image"
                                    height="140"
                                    width="0"
                                    image={imgUrl}
                                    title={ar.sportName.toUpperCase()}
                                />
                                <CardContent className={classes.ccontent}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        <b> {ar.sportName.toUpperCase()}</b>
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        <b> {ar.article}</b>
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {ar.content}
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="h5">
                                        <i> {ar.author} </i>
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" onClick={() => deleteArticle(ar.id)}>
                                    <DeleteForeverIcon color="action" />
                                </Button>
                                <Button size="small" color="primary">
                                    <EditIcon color="action" />
                                </Button>
                            </CardActions>

                        </Card>

                    )
                })
            }
            <Toast />
        </div >
    );
}
