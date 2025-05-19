import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const CustomTable = ({columns, data }: {columns: any[], data: any[]}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.id}>{column.label}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row.id}>
            {columns.map((column) => (
              <TableCell key={column.id}>{column.render ? column.render(row) : row[column.id]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

