import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useGetAllUser } from "@/apis/users/users";
import { User } from "@/apis/users/models/users";
import { Grid } from "../internals/data/gridData";

export default function CustomizedDataGrid() {
  const [rows, setRows] = useState<User[]>([]);
  const {columns} = Grid()

  useEffect(() => {
    useGetAllUser()
      .then((allUsers) => {
        const customizeData = allUsers.data.map((item, index) => ({
          id: index,
          ...item,
        }));
        setRows(customizeData);
      })
      .catch((err) => err);
  }, []);

  return <DataGrid rows={rows} columns={columns} disableColumnResize />;
}
