import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete'

interface BoardPreviewCardProps {
  title: string;
  noOfTasks: number;
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

export const BoardPreviewCard = (props: BoardPreviewCardProps) => {
  return (
    <div style={styles.container}>
      <h2>{props.title}</h2>
      <Card className="card" sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Number of tasks: {props.noOfTasks}
          </Typography>
        </CardContent>
        <CardActions>
          <Tooltip title="Delete board">
            <DeleteIcon />
          </Tooltip>
        </CardActions>
      </Card>
    </div>
  )
};
