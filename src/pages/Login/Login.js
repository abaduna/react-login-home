
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';  // Agrega esta línea
const Login = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} >

    <Card sx={{ maxWidth: 345 }}>
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        Sistemas de peliculas del gran ABADUNA
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Bienvenido a el mas grande catelo de peliculas
      </Typography>
    </CardContent>
    <CardActions>
      <Button  variant="contained" fullWidth size="small">
      <Link to="/sign" relative="path">sign </Link>
      </Button>
      <Button   variant="contained" fullWidth size="small">
      <Link to="/create" relative="path">create </Link>
      </Button>
    </CardActions>
  </Card>        
    </div>

  )
}

export default Login