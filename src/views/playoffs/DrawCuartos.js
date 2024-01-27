import React from 'react'
import { Box, Grid, Typography } from '@mui/material';
import './styles.css';

const DrawCuartos = () => {
    const DrawEmptyItem = (counter, row) => {
        let results = [];
        for (let i = 0; i < counter; i++) {
            results.push(<Grid item xs={3} >&nbsp;</Grid>)
        }
        return results
    }


    return (
        <div className="App">
            <Grid container padding={3} >
                {/* ============ Game 1 =============*/}
                <Grid item xs={3} className="BoxTop">
                    <Typography variant={'subtitle2'}>
                        Game 1 Team 1
                    </Typography>
                </Grid>
                <Grid item xs={3} className="BoxTop">
                    <Typography variant={'subtitle2'}>
                        Game 5 Team 1
                    </Typography>
                </Grid>
                {DrawEmptyItem(2, 1)}

                <Grid item xs={3} >
                    <Typography variant={'subtitle2'}>
                        Game 1 Team 2
                    </Typography>
                </Grid>
                <Grid item xs={3} className='RightLine'>
                    <Typography variant={'subtitle2'}>
                        &nbsp;
                    </Typography>
                </Grid>

                {DrawEmptyItem(2, 2)}

                {DrawEmptyItem(1, 3)}
                <Grid item xs={3} className='RightLine'>
                    <Typography variant={'subtitle2'}>

                    </Typography>
                </Grid>
                <Grid item xs={3} >
                    <Typography variant={'subtitle2'}>
                        Game7 Team1
                    </Typography>
                </Grid>
                {DrawEmptyItem(1, 3)}


                {/* ============ Game 2 =============*/}
                <Grid item xs={3} className="BoxTop">
                    <Typography variant={'subtitle2'}>
                        Game 2 Team 1
                    </Typography>
                </Grid>

                <Grid item xs={3} className='BottomLine RightLine'>
                    <Typography variant={'subtitle2'}>
                        &nbsp;
                    </Typography>
                </Grid>

                <Grid item xs={3} className='TopLine RightLine'>
                    &nbsp;
                </Grid>
                {DrawEmptyItem(1, 4)}


                <Grid item xs={3} className="BoxBottom">
                    <Typography variant={'subtitle2'}>
                        Game 2 Team 2
                    </Typography>
                </Grid>
                <Grid item xs={3} className="BoxBottom">
                    <Typography variant={'subtitle2'}>
                        Game 5 Team 2
                    </Typography>
                </Grid>
                <Grid item xs={3} className="RightLine">
                    <Typography variant={'subtitle2'}>
                    </Typography>
                </Grid>
                {DrawEmptyItem(1, 5)}


                {DrawEmptyItem(2, 50)}
                <Grid item xs={3} className="RightLine">
                    <Typography variant={'subtitle2'}>
                    </Typography>
                </Grid>
                <Grid item xs={3} className="BottomLine">
                    <Typography variant={'subtitle2'}>
                        Game 8
                    </Typography>
                </Grid>

                {/* ============ Game 3 =============*/}
                <Grid item xs={3} className="BoxTop">
                    <Typography variant={'subtitle2'}>
                        Game 3 Team 1
                    </Typography>
                </Grid>
                <Grid item xs={3} className="BoxTop">
                    <Typography variant={'subtitle2'}>
                        Game 6 Team 1
                    </Typography>
                </Grid>
                <Grid item xs={3} className="RightLine">
                    <Typography variant={'subtitle2'}>
                        &nbsp;
                    </Typography>
                </Grid>
                <Grid item xs={3} >
                    <Typography variant={'subtitle2'}>
                        &nbsp;
                    </Typography>
                </Grid>

                <Grid item xs={3} >
                    <Typography variant={'subtitle2'}>
                        Game 3 Team 2
                    </Typography>
                </Grid>
                <Grid item xs={3} className='RightLine' >
                    <Typography variant={'subtitle2'}>
                        &nbsp;
                    </Typography>
                </Grid>
                <Grid item xs={3} className='RightLine'>
                    <Typography variant={'subtitle2'}>
                        &nbsp;
                    </Typography>
                </Grid>
                <Grid item xs={3} >
                    <Typography variant={'subtitle2'}>
                        &nbsp;
                    </Typography>
                </Grid>


                {DrawEmptyItem(1, 8)}
                <Grid item xs={3} className='RightLine'>
                    <Typography variant={'subtitle2'}>

                    </Typography>
                </Grid>
                <Grid item xs={3} className='RightLine'>
                    <Typography variant={'subtitle2'}>
                        &nbsp;
                    </Typography>
                </Grid>
                <Grid item xs={3} >
                    <Typography variant={'subtitle2'}>

                    </Typography>
                </Grid>


                {/* ============ Game 4 =============*/}
                <Grid item xs={3} className="BoxTop">
                    <Typography variant={'subtitle2'}>
                        Game 4 Team 1
                    </Typography>
                </Grid>

                <Grid item xs={3} className='BottomLine RightLine'>
                    &nbsp;
                </Grid>

                <Grid item xs={3} className='TopLine '>
                    <Typography variant={'subtitle2'}>
                        Game 7 Team 2
                    </Typography>
                </Grid>
                <Grid item xs={3} >
                    <Typography variant={'subtitle2'}>
                        &nbsp;
                    </Typography>
                </Grid>

                <Grid item xs={3} >
                    <Typography variant={'subtitle2'}>
                        Game 4 Team 2
                    </Typography>
                </Grid>

                <Grid item xs={3} className="BoxBottom">
                    <Typography variant={'subtitle2'}>
                        Game 6 Team 2
                    </Typography>
                </Grid>
                {DrawEmptyItem(1, 10)}
                <Grid item xs={3} >
                    <Typography variant={'subtitle2'}>
                        &nbsp;
                    </Typography>
                </Grid>

     
            </Grid>
        </div>
    );
}


export default DrawCuartos