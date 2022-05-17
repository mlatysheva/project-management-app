import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate } from 'react-router-dom';

interface BoardPreviewCardProps {
  id: string;
  title: string;
  description: string;
}

const styles = {
  container: {
    width: 300,
    margin: 10,
    color: "black",
    backgroundColor: "skyblue",
    borderRadius: 3,
    padding: 8,
  }
};

function handleRemove(id: string) {
  alert(`The board with id: ${id} will be removed!`);
}

export const BoardPreviewCard = (props: BoardPreviewCardProps) => {
  const navigate = useNavigate();
  
  return (
    <div style={styles.container}>
      <h2 onClick={() => navigate('/editboard')}>{props.title}</h2>
      <Card className="card" sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ mb: 1.5 }} color="text.secondary" onClick={() => navigate('/editboard')}>
            {props.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Tooltip title="Delete board">
            <DeleteIcon onClick={() => handleRemove(props.id)}/>
          </Tooltip>
        </CardActions>
      </Card>
    </div>
  )
};
