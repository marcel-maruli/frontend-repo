import { Button, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";

export const Grid = () => {
  const router = useRouter()

  const columns: GridColDef[] = [
    { field: "name", headerName: "Email", flex: 1, minWidth: 200 },
    {
      field: "email",
      headerName: "Email",
      flex: 1.5,
      minWidth: 80,
    },
    {
      field: "age",
      headerName: "Age",
      headerAlign: "right",
      align: "right",
      flex: 1,
      minWidth: 80,
    },
    {
      field: "city",
      headerName: "City",
      headerAlign: "right",
      align: "right",
      flex: 1,
      minWidth: 80,
    },
    {
      field: "edit",
      headerName: "Edit",
      renderCell: ({ row }) => {
        return (
          <Button onClick={() => router.push(`/dashboard/edit/${row.id}`)}>
            <Typography>Edit</Typography>
          </Button>
        );
      },
    },
  ];

  return {
    columns,
  };
};
