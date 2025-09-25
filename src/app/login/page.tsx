import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';

export default function Home(){

  return(
    <><Box display="flex" justifyContent="center" alignItems="flex-start" height="100vh" paddingTop={15}>
      <AccountCircleIcon sx={{ fontSize: 100, color: 'Black' }} />
    </Box><TextField /></>

  )
}