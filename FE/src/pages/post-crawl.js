import { useCallback, useMemo, useState, useEffect } from "react";
import Head from "next/head";
import { subDays, subHours } from "date-fns";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import * as React from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridToolbar,
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <GridToolbar></GridToolbar>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

const Page = () => {
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => async () => {
    const response = await fetch("http://localhost:8080/posts/delete/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response;

    console.log(data);

    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    console.log(newRow);
    if (newRow?.isNew) {
      const response = await fetch("http://localhost:8080/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // id: newRow.id,
          // userId: newRow.userId,
          type: newRow.type,
          title: newRow.title,
          description: newRow.description,
          price: newRow.price,
          square: newRow.square,
          name_contact: newRow.name_contact,
          phone_contact: newRow.phone_contact,
          date: newRow.date,
          direct: newRow.direct,
          district: newRow.district,
          province: newRow.province,
          address: newRow.address,
          floor: newRow.floor,
          juridical: newRow.juridical,
          bedroom: newRow.bedroom,
          length: newRow.length,
          width: newRow.width,
          link_image: newRow.link_image,
          url_page: newRow.url_page,
          kitchen: newRow.kitchen,
          parking: newRow.parking,
          terrace: newRow.terrace,
        }),
      });

      const data = await response.json();
      console.log(data);
    } else {
      const response = await fetch("http://localhost:8080/posts/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: newRow.id,
          // userId: newRow.userId,
          type: newRow.type,
          title: newRow.title,
          description: newRow.description,
          price: newRow.price,
          square: newRow.square,
          name_contact: newRow.name_contact,
          phone_contact: newRow.phone_contact,
          date: newRow.date,
          direct: newRow.direct,
          district: newRow.district,
          province: newRow.province,
          street: newRow.street,
          ward: newRow.ward,
          floor: newRow.floor,
          juridical: newRow.juridical,
          bedroom: newRow.bedroom,
          length: newRow.length,
          width: newRow.width,
          link_image: newRow.link_image,
          url_page: newRow.url_page,
          kitchen: newRow.kitchen,
          parking: newRow.parking,
          terrace: newRow.terrace,
        }),
      });

      const data = await response.json();
      console.log(data);
    }

    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
    { field: "type", headerName: "Type", width: 120, editable: true },
    { field: "title", headerName: "Title", width: 200, editable: true },
    { field: "description", headerName: "Description", width: 200, editable: true },
    { field: "link_image", headerName: "Image", width: 200, editable: true },
    { field: "url_page", headerName: "Url page", width: 200, editable: true },
    { field: "price", headerName: "Price", width: 200, editable: true },
    { field: "square", headerName: "Square", width: 200, editable: true },
    { field: "name_contact", headerName: "Name Contact", width: 200, editable: true },
    { field: "phone_contact", headerName: "Phone contact", width: 200, editable: true },
    { field: "date", headerName: "date", width: 200, editable: true },
    { field: "direct", headerName: "Direction", width: 200, editable: true },
    { field: "address", headerName: "Address", width: 200, editable: true },
    { field: "province", headerName: "Province", width: 200, editable: true },
    { field: "floor", headerName: "Floor", width: 200, editable: true },
    { field: "juridical", headerName: "Juridical", width: 200, editable: true },
    { field: "bedroom", headerName: "Bedroom", width: 200, editable: true },
    { field: "length", headerName: "Length", width: 200, editable: true },
    { field: "width", headerName: "Width", width: 200, editable: true },
    { field: "kitchen", headerName: "Kitchen", width: 200, editable: true },
    { field: "parking", headerName: "Parking", width: 200, editable: true },
    { field: "terrace", headerName: "Terrace", width: 200, editable: true },
  ];

  const getData = async () => {
    const response = await fetch("http://localhost:8080/posts/findPage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        limit: 1000,
        page: 0,
      }),
    });
    const data = await response.json();

    setRows(data.content);
    console.log(data.content);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Head>
        <title>Posts Crawler</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Post Crawl</Typography>
                {/* <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Export
                  </Button>
                </Stack> */}
              </Stack>
              <div>
                {/* <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Add
                </Button> */}
              </div>
            </Stack>
            <Box
              sx={{
                width: "100%",
                // Cho phép header tràn ra ngoài để sticky hoạt động
                "& .MuiDataGrid-columnHeaders": {
                  overflow: "unset",
                },
                // Cố định cột Actions ở phía trái (cột đầu tiên)
                "& .MuiDataGrid-columnHeader[data-field='actions']": {
                  position: "sticky",
                  left: "0px",
                  zIndex: 5,
                  backgroundColor: "background.paper",
                  boxShadow: "2px 0 4px rgba(0,0,0,0.15)",
                },
                "& .MuiDataGrid-cell[data-field='actions']": {
                  position: "sticky",
                  left: "0px",
                  zIndex: 4,
                  backgroundColor: "background.paper",
                  boxShadow: "2px 0 4px rgba(0,0,0,0.1)",
                },
                "& .actions": {
                  color: "text.secondary",
                },
                "& .textPrimary": {
                  color: "text.primary",
                },
              }}
            >
              <DataGrid
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                columnBuffer={25}
                slots={{
                  toolbar: EditToolbar,
                }}
                slotProps={{
                  toolbar: { setRows, setRowModesModel },
                }}
              />
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
