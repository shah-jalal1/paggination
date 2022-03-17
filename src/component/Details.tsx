import { Typography } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';

const Details = () => {
    const { state } = useLocation();
    console.log(state);
    return (
        <div>
            <Typography variant="h5" my={2} textAlign="center">
                Details JSON
            </Typography>
            <pre>{JSON.stringify(state, null, 2)}</pre>
        </div>
    );
};

export default Details;