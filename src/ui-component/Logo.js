// material-ui
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
    const theme = useTheme();

    return (
        <>
            <img src={require('./../assets/images/padel_icon.png')} alt='logo' height={50} />
            <Typography paddingLeft={'1rem'} variant='h3 ' sx={{color: '#4527A0'}} > iPadel</Typography>
        </>
    );
};

export default Logo;
