import * as React from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

export default function LoadingButtonsTransition({ loading, setLoading }) {
    return (
        <Button
            type='submit'
            color="primary"
            variant="contained"
            fullWidth
            startIcon={loading ? <CircularProgress size={20} /> : null}
            disabled={loading} // Optionally disable the button when loading
            sx={{ mt: 3, mb: 2, py: 1.5, borderRadius: '8px', textTransform: 'none', backgroundColor: '#3f51b5', ':hover': { backgroundColor: '#303f9f' } }}>
            {loading ? 'Loading...' : 'Sign In'}
        </Button>
    );
}
