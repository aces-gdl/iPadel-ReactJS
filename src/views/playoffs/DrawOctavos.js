import React from 'react'
import { Grid, Typography } from '@mui/material';
import './styles.css';


const DrawOctavos = () => {


    const games = {

        Game1: {
            ID: '1',
            Team1: {
                ID: '1',
                Member1: {
                    ID: '1',
                    Name: 'Juan Navarro'
                },
                Member2: {
                    ID: '2',
                    Name: 'Carlos Gonzalez'
                }
            },
            Team2: {
                ID: '2',
                Member1: {
                    ID: '3',
                    Name: 'Diana Peredo'
                },
                Member2: {
                    ID: '4',
                    Name: 'Luis Arechiga'
                }
            }
        }
    }


    const DrawEmptyItem = (counter, row) => {
            let results = [];
            for (let i = 0; i < counter; i++) {
                results.push(<Grid item xs={2} >&nbsp;</Grid>)
            }
            return results
        }


    return(
        <div className = "App" >
                <Grid container padding={3} >
                    {/* ============ Game 1 =============*/}
                    <Grid item xs={2} className="BoxTop" id='G1T1'>
                        <Typography variant={'subtitle2'} >
                            {`${games.Game1.Team1.Member1.Name} / ${games.Game1.Team1.Member2.Name}`}
                        </Typography>
                    </Grid>
                    <Grid item xs={2} className="BoxTop">
                        <Typography variant={'subtitle2'}>
                            Game 9 Team 1
                        </Typography>
                    </Grid>
                    {DrawEmptyItem(4, 1)}

                    <Grid item xs={2} id='G1T2'>
                        <Typography variant={'subtitle2'}>
                        {`${games.Game1.Team2.Member1.Name} / ${games.Game1.Team2.Member2.Name}`}
                        </Typography>
                    </Grid>
                    <Grid item xs={2} className='RightLine'>
                        <Typography variant={'subtitle2'}>
                            &nbsp;
                        </Typography>
                    </Grid>
                    {DrawEmptyItem(4, 2)}

                    {DrawEmptyItem(1, 3)}
                    <Grid item xs={2} className='RightLine'>
                        <Typography variant={'subtitle2'}>

                        </Typography>
                    </Grid>
                    <Grid item xs={2} id='G13T1'>
                        <Typography variant={'subtitle2'}>
                            Game 13 Team1
                        </Typography>
                    </Grid>
                    {DrawEmptyItem(3, 3)}


                    {/* ============ Game 2 =============*/}
                    <Grid item xs={2} className="BoxTop" id='G2T1'>
                        <Typography variant={'subtitle2'}>
                            Game 2 Team 1
                        </Typography>
                    </Grid>

                    <Grid item xs={2} className='BottomLine RightLine'>
                        <Typography variant={'subtitle2'}>
                            &nbsp;
                        </Typography>
                    </Grid>

                    <Grid item xs={2} className='TopLine RightLine'>
                        &nbsp;
                    </Grid>
                    {DrawEmptyItem(3, 4)}


                    <Grid item xs={2} className="BoxBottom" id='G2T2'>
                        <Typography variant={'subtitle2'}>
                            Game 2 Team 2
                        </Typography>
                    </Grid>
                    <Grid item xs={2} className="BoxBottom">
                        <Typography variant={'subtitle2'}>
                            Game 9 Team 2
                        </Typography>
                    </Grid>
                    <Grid item xs={2} className="RightLine">
                        <Typography variant={'subtitle2'}>
                        </Typography>
                    </Grid>
                    {DrawEmptyItem(3, 5)}


                    {DrawEmptyItem(2, 50)}
                    <Grid item xs={2} className="RightLine">
                        <Typography variant={'subtitle2'}>
                        </Typography>
                    </Grid>
                    <Grid item xs={2} className="BottomLine">
                        <Typography variant={'subtitle2'}>
                            Game 15 Team 1
                        </Typography>
                    </Grid>
                    {DrawEmptyItem(2, 50)}

                    {/* ============ Game 3 =============*/}
                    <Grid item xs={2} className="BoxTop">
                        <Typography variant={'subtitle2'}>
                            Game 3 Team 1
                        </Typography>
                    </Grid>
                    <Grid item xs={2} className="BoxTop">
                        <Typography variant={'subtitle2'}>
                            Game 10 Team 1
                        </Typography>
                    </Grid>
                    <Grid item xs={2} className="RightLine">
                        <Typography variant={'subtitle2'}>
                            &nbsp;
                        </Typography>
                    </Grid>
                    <Grid item xs={2} className='RightLine'>
                        <Typography variant={'subtitle2'}>
                            &nbsp;
                        </Typography>
                    </Grid>
                    {DrawEmptyItem(2, 6)}

                    <Grid item xs={2} >
                        <Typography variant={'subtitle2'}>
                            Game 3 Team 2
                        </Typography>
                    </Grid>
                    <Grid item xs={2} className='RightLine' >
                        <Typography variant={'subtitle2'}>
                            &nbsp;
                        </Typography>
                    </Grid>
                    <Grid item xs={2} className='RightLine'>
                        <Typography variant={'subtitle2'}>
                            &nbsp;
                        </Typography>
                    </Grid>
                    <Grid item xs={2} className='RightLine'>
                        <Typography variant={'subtitle2'}>
                            &nbsp;
                        </Typography>
                    </Grid>
                    {DrawEmptyItem(2, 7)}


                    {DrawEmptyItem(1, 8)}
                    <Grid item xs={2} className='RightLine'>
                        <Typography variant={'subtitle2'}>

                        </Typography>
                    </Grid>
                    <Grid item xs={2} className='RightLine'>
                        <Typography variant={'subtitle2'}>
                            &nbsp;
                        </Typography>
                    </Grid>
                    <Grid item xs={2} className='RightLine'>
                        <Typography variant={'subtitle2'}>

                        </Typography>
                    </Grid>
                    {DrawEmptyItem(2, 9)}


                    {/* ============ Game 4 =============*/}
                    <Grid item xs={2} className="BoxTop">
                        <Typography variant={'subtitle2'}>
                            Game 4 Team 1
                        </Typography>
                    </Grid>

                    <Grid item xs={2} className='BottomLine RightLine'>
                        &nbsp;
                    </Grid>

                    <Grid item xs={2} className='TopLine '>
                        <Typography variant={'subtitle2'}>
                            Game 13 Team 2
                        </Typography>
                    </Grid>
                    <Grid item xs={2} className='RightLine'>
                        <Typography variant={'subtitle2'}>
                            &nbsp;
                        </Typography>
                    </Grid>
                    {DrawEmptyItem(2, 10)}

                    <Grid item xs={2} >
                        <Typography variant={'subtitle2'}>
                            Game 4 Team 2
                        </Typography>
                    </Grid>
                    <Grid item xs={2} className="BoxBottom">
                        <Typography variant={'subtitle2'}>
                            Game 10 Team 2
                        </Typography>
                    </Grid>
                    <Grid item xs={2} >
                        <Typography variant={'subtitle2'}>
                            &nbsp;
                        </Typography>
                    </Grid>
                    <Grid item xs={2} className='RightLine'>
                        <Typography variant={'subtitle2'}>
                            &nbsp;
                        </Typography>
                    </Grid>
                    <Grid item xs={2} className='BoxBottom'>
                        <Typography variant={'subtitle2'}>
                            &nbsp;
                        </Typography>
                    </Grid>

                    <Grid item xs={2} >
                        <Typography variant={'subtitle2'}>
                            &nbsp;
                        </Typography>
                    </Grid>
                    {DrawEmptyItem(3, 10)}
                    <Grid item xs={2} className='RightLine'>
                        <Typography variant={'subtitle2'}>
                            &nbsp;
                        </Typography>
                    </Grid>
                    {DrawEmptyItem(2, 10)}

                    {DrawEmptyItem(3, 10)}
                    <Grid item xs={2} className='RightLine'>
                        <Typography variant={'subtitle2'}>
                            &nbsp;
                        </Typography>
                    </Grid>
                    <Grid item xs={2} className='BottomLine'>
                        <Typography variant={'subtitle2'}>
                            &nbsp;Game 16 Team 1
                        </Typography>
                    </Grid>
                    {DrawEmptyItem(1, 10)}


                    {/* ============ Game 5 =============*/}
                    <Grid item xs={2} className="BoxTop">
                        <Typography variant={'subtitle2'}>
                            Game 5 Team 1
                        </Typography>
                    </Grid>
                    <Grid item xs={2} className="BoxTop">
                        <Typography variant={'subtitle2'}>
                            Game 11 Team 1
                        </Typography>
                    </Grid>
                    {DrawEmptyItem(1, 1)}
                    <Grid item xs={2} className='RightLine'>
                        <Typography variant={'subtitle2'}>
                            &nbsp;
                        </Typography>
                    </Grid>
                    <Grid item xs={2} >
                        <Typography variant={'subtitle2'}>
                            Game 16 Team 2
                        </Typography>
                    </Grid>
                    {DrawEmptyItem(1, 1)}

                    <Grid item xs={2} >
                        <Typography variant={'subtitle2'}>
                            Game 5 Team 2
                        </Typography>
                    </Grid>
                    <Grid item xs={2} className='RightLine'>
                        <Typography variant={'subtitle2'}>
                            &nbsp;
                        </Typography>
                    </Grid>
                    {DrawEmptyItem(1, 2)}
                    <Grid item xs={2} className='RightLine'>
                        <Typography variant={'subtitle2'}>
                            &nbsp;
                        </Typography>
                    </Grid>
                    {DrawEmptyItem(2, 2)}

                    {DrawEmptyItem(1, 3)}
                    <Grid item xs={2} className='RightLine'>
                        <Typography variant={'subtitle2'}>

                        </Typography>
                    </Grid>
                    <Grid item xs={2} >
                        <Typography variant={'subtitle2'}>
                            Game 14 Team 1
                        </Typography>
                    </Grid>
                    <Grid item xs={2} className='RightLine'>
                        <Typography variant={'subtitle2'}>
                            &nbsp;
                        </Typography>
                    </Grid>
                    {DrawEmptyItem(2, 3)}


                    {/* ============ Game 6 =============*/}
                    <Grid item xs={2} className="BoxTop">
                        <Typography variant={'subtitle2'}>
                            Game 6 Team 1
                        </Typography>
                    </Grid>

                    <Grid item xs={2} className='BottomLine RightLine'>
                        <Typography variant={'subtitle2'}>
                            &nbsp;
                        </Typography>
                    </Grid>
                    <Grid item xs={2} className='TopLine RightLine'>
                        &nbsp;
                    </Grid>
                    <Grid item xs={2} className='TopLine'>
                        <Typography variant={'subtitle2'}>
                            Game 15 Team 2
                        </Typography>
                    </Grid>
                    {DrawEmptyItem(2, 4)}


                    <Grid item xs={2} className="BoxBottom">
                        <Typography variant={'subtitle2'}>
                            Game 6 Team 2
                        </Typography>
                    </Grid>
                    <Grid item xs={2} className="BoxBottom">
                        <Typography variant={'subtitle2'}>
                            Game 11 Team 2
                        </Typography>
                    </Grid>
                    <Grid item xs={2} className="RightLine">
                        <Typography variant={'subtitle2'}>
                        </Typography>
                    </Grid>
                    <Grid item xs={2} >
                        &nbsp;
                    </Grid>
                    {DrawEmptyItem(2, 5)}


                    {DrawEmptyItem(2, 50)}
                    <Grid item xs={2} className="RightLine">
                        <Typography variant={'subtitle2'}>

                        </Typography>
                    </Grid>
                    <Grid item xs={2} >
                        <Typography variant={'subtitle2'}>

                        </Typography>
                    </Grid>
                    {DrawEmptyItem(2, 50)}

                    {/* ============ Game 7 =============*/}
                    <Grid item xs={2} className="BoxTop">
                        <Typography variant={'subtitle2'}>
                            Game 7 Team 1
                        </Typography>
                    </Grid>
                    <Grid item xs={2} className="BoxTop">
                        <Typography variant={'subtitle2'}>
                            Game 12 Team 1
                        </Typography>
                    </Grid>
                    <Grid item xs={2} className="RightLine">
                        <Typography variant={'subtitle2'}>
                            &nbsp;
                        </Typography>
                    </Grid>
                    <Grid item xs={2} >
                        <Typography variant={'subtitle2'}>
                            &nbsp;
                        </Typography>
                    </Grid>
                    {DrawEmptyItem(2, 50)}

                    <Grid item xs={2} >
                        <Typography variant={'subtitle2'}>
                            Game 7 Team 2
                        </Typography>
                    </Grid>
                    <Grid item xs={2} className='RightLine' >
                        <Typography variant={'subtitle2'}>
                            &nbsp;
                        </Typography>
                    </Grid>
                    <Grid item xs={2} className='RightLine'>
                        <Typography variant={'subtitle2'}>
                            &nbsp;
                        </Typography>
                    </Grid>
                    <Grid item xs={2} >
                        <Typography variant={'subtitle2'}>
                            &nbsp;
                        </Typography>
                    </Grid>
                    {DrawEmptyItem(2, 50)}


                    {DrawEmptyItem(1, 8)}
                    <Grid item xs={2} className='RightLine'>
                        <Typography variant={'subtitle2'}>

                        </Typography>
                    </Grid>
                    <Grid item xs={2} className='RightLine'>
                        <Typography variant={'subtitle2'}>
                            &nbsp;
                        </Typography>
                    </Grid>
                    <Grid item xs={2} >
                        <Typography variant={'subtitle2'}>

                        </Typography>
                    </Grid>
                    {DrawEmptyItem(2, 50)}


                    {/* ============ Game 8 =============*/}
                    <Grid item xs={2} className="BoxTop">
                        <Typography variant={'subtitle2'}>
                            Game 8 Team 1
                        </Typography>
                    </Grid>

                    <Grid item xs={2} className='BottomLine RightLine'>
                        &nbsp;
                    </Grid>

                    <Grid item xs={2} className='TopLine '>
                        <Typography variant={'subtitle2'}>
                            Game 14 Team 2
                        </Typography>
                    </Grid>
                    <Grid item xs={2} >
                        <Typography variant={'subtitle2'}>
                            &nbsp;
                        </Typography>
                    </Grid>
                    {DrawEmptyItem(2, 50)}

                    <Grid item xs={2} >
                        <Typography variant={'subtitle2'}>
                            Game 8 Team 2
                        </Typography>
                    </Grid>

                    <Grid item xs={2} className="BoxBottom">
                        <Typography variant={'subtitle2'}>
                            Game 12 Team 2
                        </Typography>
                    </Grid>
                    {DrawEmptyItem(1, 10)}
                    <Grid item xs={2} >
                        <Typography variant={'subtitle2'}>
                            &nbsp;
                        </Typography>
                    </Grid>
                    {DrawEmptyItem(2, 50)}

                </Grid>
        </div >
    );
}

export default DrawOctavos