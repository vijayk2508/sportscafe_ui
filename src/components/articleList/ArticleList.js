/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
    Button,
    CardActions,
} from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import EditIcon from '@material-ui/icons/Edit'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import Toast from '../../components/Toast'
import toastMessage from '../../constants/toastType'
import API from '../../constants/api'
import './articleList.css'

const useStyles = makeStyles({
    root: {
        maxWidth: '100%',
        marginTop: '2%',
    },
    cardArea: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-around',
    },
    cmedia: {
        width: '30%',
    },
    ccontent: {
        width: '60%',
    },
})

export default function ArticleList(props) {
    const usersPerPage = 2
    const classes = useStyles()
    const [pArticles, setPArticles] = useState([])
    const [pageNumber, setPageNumber] = useState(0)
    const pagesVisited = pageNumber * usersPerPage

    useEffect(() => {
        if (props?.data) {
            setPArticles(props?.data?.slice(0, 4))
        }
    }, [props.data])

    const deleteArticle = async id => {
        if (!window.confirm('Are You Sure To Delete?')) return
        const response = await axios
            .delete(API.BASE_URL + `/article/deleteArticle/${id}`)
            .catch(err => {
                let message = err.response.data.message
                console.log('Err', { ...err })
                toastMessage.error(message)
            })

        // fetchArticles()
        let newArticles = pArticles.filter(a => a.id !== id)
        setPArticles(newArticles)
        toastMessage.success(response.data.message)
    }

    const displayArticles = pArticles.slice(pagesVisited, pagesVisited + usersPerPage).map(objArticle => {
        let imgUrl = `${API.BASE_URL}/static/${objArticle.image}`
        return (
            <Card className={classes.root} key={objArticle.id}>
                <CardActionArea className={classes.cardArea}>
                    <CardMedia
                        className={classes.cmedia}
                        component='img'
                        alt='Image'
                        height='140'
                        width='0'
                        image={imgUrl}
                        title={objArticle.sportName.toUpperCase()}
                    />
                    <CardContent className={classes.ccontent}>
                        <Typography gutterBottom variant='h5' component='h2'>
                            <b> {objArticle.sportName.toUpperCase()}</b>
                        </Typography>
                        <Typography gutterBottom variant='h5' component='h2'>
                            <b> {objArticle.article}</b>
                        </Typography>
                        <Typography variant='body2' color='textSecondary' component='p'>
                            {objArticle.content}
                        </Typography>
                        <Typography gutterBottom variant='h5' component='h5'>
                            <i> {objArticle.author} </i>
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size='small' onClick={() => deleteArticle(objArticle.id)}>
                        <DeleteForeverIcon color='action' />
                    </Button>
                    <Button size='small' color='primary'>
                        <EditIcon color='action' />
                    </Button>
                </CardActions>
            </Card>
        )
    })

    const pageCount = Math.ceil(pArticles.length / usersPerPage)

    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }

    return (
        <>
            <div className=''>
                {displayArticles}
                <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={'paginationBttns'}
                    previousLinkClassName={'previousBttn'}
                    nextLinkClassName={'nextBttn'}
                    disabledClassName={'paginationDisabled'}
                    activeClassName={'paginationActive'}
                />
            </div>
            <Toast />
        </>
    )
}
