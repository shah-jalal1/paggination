
import { Box, CircularProgress, Container, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getPaginationData } from './api/pagginationData';


export interface InitPost {
    title: string;
    url: string;
    created_at: Date;
    author: string;
}
interface Column {
    id: "title" | "url" | "created_at" | "author";
    label: string;
    minWidth?: number;
    align?: "right";
}

const columns: Column[] = [
    { id: "title", label: "Title", minWidth: 150 },
    { id: "url", label: "URL", minWidth: 150 },
    { id: "created_at", label: "Created At", minWidth: 150 },
    { id: "author", label: "Author", minWidth: 150 },
];

const Home: React.FC = () => {
    const history = useHistory();

    const [page, setPage] = useState<number>(0);
    const [post, setPost] = useState<InitPost[]>([]);
    const [totalElement, setTotalElement] = useState<number>(0);

    const [localPage, setLocalPage] = useState<number>(1);
    const rowsPerPage = 20;

    useEffect(() => {
        const interval = setInterval(() => {
            setPage((data) => data + 1);
        }, 10000);

        return () => clearInterval(interval)
    }, []);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getPaginationData(page);
                const posts = [...post, ...data.hits];
                setPost(posts);
                setTotalElement(posts.length);
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();

    }, [page]);

    const handlePageChange = (e: unknown, newPage: number) => {
        setLocalPage(newPage);
    };

    const handleDetails = (data: InitPost, index: number) => {
        history.push("/details/" + index, data);
    };
    return (
        <div data-testid="home">
            {/* <Container> */}
                <Typography variant="h5" my={2} textAlign="center">
                    Post Table
                </Typography>
                {
                    (totalElement < 1) ?
                        (
                            <Box>
                                <CircularProgress size={30} />
                                Loading New Data
                            </Box>
                        )
                        :
                        (
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            {
                                                columns.map((column, i) => (
                                                    <TableCell
                                                        key={i}
                                                        align={column.align}
                                                        style={{ minWidth: column.minWidth }}
                                                    >
                                                        {column.id}
                                                    </TableCell>
                                                ))
                                            }
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            post
                                                .slice(
                                                    rowsPerPage * (localPage - 1),
                                                    rowsPerPage * (localPage - 1) + rowsPerPage
                                                )
                                                .map((row, index) => (

                                                    <TableRow

                                                        key={row.title}
                                                        onClick={() => handleDetails(row, index)}
                                                        style={{ cursor: "pointer" }}
                                                    >
                                                        {
                                                            columns.map((column) => (
                                                                <TableCell
                                                                    key={column.id}
                                                                    align={column.align}
                                                                    style={{ minWidth: column.minWidth }}
                                                                >
                                                                    {row[column.id]}
                                                                </TableCell>
                                                            ))
                                                        }
                                                    </TableRow>
                                                ))
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )
                }
                <Pagination
                    count={totalElement / rowsPerPage}
                    page={localPage}
                    onChange={handlePageChange}
                />
            {/* </Container> */}
        </div>
    );
};

export default Home;