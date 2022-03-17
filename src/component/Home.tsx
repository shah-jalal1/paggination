
import { Box, CircularProgress, Container, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";


interface InitPost {
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


    let navigate = useNavigate();

    const [page, setPage] = useState<number>(0);
    const [post, setPost] = useState<InitPost[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
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
        setLoading(true);
        axios
            .get(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`)
            .then((res) => {
                const posts = [...post, ...res.data.hits];
                setPost(posts);
                setTotalElement(posts.length);
                setLoading(false);
            })
            .catch((e) => {
                setLoading(false);
                console.log(e);
            });

    }, [page]);

    const handlePageChange = (e: unknown, newPage: number) => {
        setLocalPage(newPage);
    };

    const handleDetails = (data: InitPost) => {
        navigate("/details", { state: { data } });
    };

    return (
        <div>
            <Container>
                <Typography variant="h5" my={2} textAlign="center">
                    Post Table
                </Typography>
                {
                    loading ?
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
                                                .map((row) => (
                                                    <TableRow
                                                        key={row.title}
                                                        onClick={() => handleDetails(row)}
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
            </Container>
        </div>
    );
};

export default Home;