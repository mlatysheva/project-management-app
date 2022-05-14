import AddColumnButton from '../Column/AddColumnButton';
import { useAppSelector } from '../../store/hooks';
import { ColumnProps } from '../../store/reducers/columnsSlice';
import { Column } from '../Column/Column';

export default function CreateBoard() {
  const columns = useAppSelector((state) => state.columns);
  
  return (
    <div className="main">
      <h1>Create a new board</h1>
      <div className="column-container">
        {columns.map((column: ColumnProps) => <Column key={column.id} title={column.title} tasks={[
          { id: "01r",
            title: "Your sample task",
            description: "Visualise your elephant",
            done: false,
          },      
        ]} />)}
        <AddColumnButton type="Add new column" />
      </div>        
    </div>
  )
}
