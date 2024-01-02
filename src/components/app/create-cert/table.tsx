import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DataTableRowActions } from "./data-table-row-actions";

interface DataRow {
  [key: string]: any;
}
interface TableProps {
  data: DataRow[]
}

export function TableView({
  data,
}: TableProps) {

  if (!data) return (<></>);

  const columns = data && data.length > 0 ? Object.keys(data[0]) : [];
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead>{data[0][column]}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>

        {data.map((row, rowIndex) => {
          if (rowIndex === 0) return null;
          return (
            <TableRow key={rowIndex}>
              {columns.map((column, colIndex) => (
                <TableCell key={colIndex}>{row[column]}</TableCell>
              ))}
              <DataTableRowActions row={row} />
            </TableRow>
          );
        })}
      </TableBody>
      <TableFooter>
        <TableRow>
          {/* <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell> */}
        </TableRow>
      </TableFooter>
    </Table>
  )
}
