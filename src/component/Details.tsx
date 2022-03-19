import { Typography } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { InitPost } from './Home';

const Details: React.FC = () => {
    const {state} = useLocation<InitPost>();
    return (
        <div data-testid="detailsPage" style={{ textAlign: "center" }}>
            <Typography variant="h5" my={2} textAlign="center" data-testid="detailsPage-text">
                Details JSON
            </Typography>
            <pre>{JSON.stringify(state, null, 2)}</pre>
        </div>
    );
};

export default Details;