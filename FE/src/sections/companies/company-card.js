import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import { PlusIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  SvgIcon,
  Typography,
  Button,
  Dialog,
  DialogActions,
  TextField,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
// import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { BLOCKED_PAGES } from "next/dist/shared/lib/constants";
const data = {
  url: "5e887ac47eed253091be10cb",
  description: ".post-section > div > p::text",
  title: ".page-h1::text",
  price: ".post-price::text",
  address: "post-price::text",
  acreage: "post-price::text",
  link_url: "post-price::text",
  link_image: ".leftCol > .post-images > img::attr(data-src)'",
  direction: ".leftCol .table-wrap > table > tbody > tr:nth-child(1) > td:nth-child(2)::text",
  date: ".leftCol .table-wrap > table > tbody > tr:nth-child(1) > td:nth-child(2)::text",
  name_contact: ".leftCol .table-wrap > table > tbody > tr:nth-child(1) > td:nth-child(2)::text",
  phone_contact: ".leftCol .table-wrap > table > tbody > tr:nth-child(1) > td:nth-child(2)::text",
  bed_room: ".post-bedroom::text",
  bath_rooom: ".post-bathroom::text",
};
export const CompanyCard = (props) => {
  const { crawl } = props;

  const [open, setOpen] = useState(false);

  // const [titleQuery, setTitleQuery] = useState(crawl.titleQuery);
  // const [urlPage, setUrlPage] = useState(crawl.urlPage);
  const [namePage, setNamePage] = useState(crawl.namePage);
  const [modeSchedule, setModeSchedule] = useState(crawl.modeSchedule);
  const [modePublic, setModePublic] = useState(crawl.modePublic);
  const [modeCookies, setModeCookiesy] = useState(crawl.modeCookies);
  const [modeRobotsParser, setModeRobotsParser] = useState(crawl.modeRobotsParser);
  const [timeOutCrawl, setTimeOutCrawl] = useState(crawl.timeOutCrawl);

  const [timeRetryCrawl, setTimeRetryCrawl] = useState(crawl.timeRetryCrawl);
  const [timeDelayCrawl, setTimeDelayCrawl] = useState(crawl.timeDelayCrawl);

  const [numberPageQuery, setNumberPageQuery] = useState(crawl.numberPageQuery);
  const [titleQuery, setTitleQuery] = useState(crawl.titleQuery);
  const [urlQuery, setUrlQuery] = useState(crawl.urlQuery);
  const [descriptionQuery, setDescriptionQuery] = useState(crawl.descriptionQuery);
  const [imageUrlQuery, setImageUrlQuery] = useState(crawl.imageUrlQuery);
  const [priceQuery, setPriceQuery] = useState(crawl.priceQuery);
  const [addressQuery, setAddressQuery] = useState(crawl.addressQuery);
  const [acreageQuery, setAcreageQuery] = useState(crawl.acreageQuery);

  const [directionQuery, setDirectionQuery] = useState(crawl.directionQuery);
  const [dateQuery, setDateQuery] = useState(crawl.dateQuery);
  const [nameContactQuery, setNameContactQuery] = useState(crawl.nameContactQuery);
  const [phoneContactQuery, setPhoneContactQuery] = useState(crawl.phoneContactQuery);
  const [bedRoomQuery, setBedRoomQuery] = useState(crawl.bedRoomQuery);
  const [bathRoomQuery, setBathRoomQuery] = useState(crawl.bathRoomQuery);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose1 = async () => {
    console.log(crawl);
    const response = await fetch("http://localhost:8080/configCrawler/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: crawl.id,
        urlQuery: urlQuery,
        titleQuery: titleQuery,
        descriptionQuery: descriptionQuery,
        priceQuery: priceQuery,
        imageUrlQuery: imageUrlQuery,
        addressQuery: addressQuery,
        acreageQuery: acreageQuery,
        directionQuery: directionQuery,
        dateQuery: dateQuery,
        nameContactQuery: nameContactQuery,
        phoneContactQuery: phoneContactQuery,
        bedRoomQuery: bedRoomQuery,
        bathRoomQuery: bathRoomQuery,
      }),
    });

    const data = await response.json();
    console.log(data);
  };

  // const handleChangeInput = (event) => {
  //   changeInput(keyName, event.target.value);
  // };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pb: 3,
          }}
        >
          {/* <Avatar src={crawl.logo} variant="square" /> */}
          <Avatar src="/assets/logos/logo.png" variant="square" />
        </Box>
        <Typography align="center" gutterBottom variant="h5">
          {crawl.titlePage}
        </Typography>
        <Typography align="center" variant="body1">
          {crawl.urlPage}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            direction: "row",
            // justifyContent: "center",
          }}
        >
          <Typography align="left" variant="body1" fontWeight="bold">
            Total:
          </Typography>
          <Typography align="right" variant="body1">
            1000  
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            direction: "row",
            // justifyContent: "center",
          }}
        >
          <Typography align="left" variant="body1" fontWeight="bold">
            Status:
          </Typography>
          <Typography align="right" variant="body1" color="green">
            Success
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            direction: "row",
            // justifyContent: "center",
          }}
        >
          <Typography align="left" variant="body1" fontWeight="bold">
            Date:
          </Typography>
          <Typography align="right" variant="body1" color>
            31/10/2023
          </Typography>
        </Box>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Stack alignItems="flex-start" direction="row" spacing={1}>
          <Button
            startIcon={
              <SvgIcon fontSize="small">
                <PlusIcon />
              </SvgIcon>
            }
            variant="contained"
          >
            Crawl
          </Button>
        </Stack>
        <Stack alignItems="center" direction="row" spacing={1}>
          <Button
            startIcon={
              <SvgIcon fontSize="small">
                <PencilSquareIcon />
              </SvgIcon>
            }
            variant="contained"
            onClick={handleClickOpen}
          >
            Edit
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{crawl.title}</DialogTitle>
            <DialogContent>
              <DialogContentText>{crawl.titlePage}</DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="url"
                label="Url"
                type="text"
                fullWidth
                variant="standard"
                value={urlQuery}
                onChange={(e) => setUrlQuery(e.target.value)}
              />
              <TextField
                autoFocus
                margin="dense"
                id="title"
                label="title"
                type="text"
                fullWidth
                variant="standard"
                value={titleQuery}
                onChange={(e) => setTitleQuery(e.target.value)}
              />
              <TextField
                autoFocus
                margin="dense"
                id="description"
                label="Description"
                type="text"
                fullWidth
                variant="standard"
                value={descriptionQuery}
                onChange={(e) => setDescriptionQuery(e.target.value)}
              />
              <TextField
                autoFocus
                margin="dense"
                id="price"
                label="Price"
                type="text"
                fullWidth
                variant="standard"
                value={priceQuery}
                onChange={(e) => setPriceQuery(e.target.value)}
              />
              <TextField
                autoFocus
                margin="dense"
                id="link_image"
                label="Image"
                type="text"
                fullWidth
                variant="standard"
                value={imageUrlQuery}
                onChange={(e) => setImageUrlQuery(e.target.value)}
              />

              <TextField
                autoFocus
                margin="dense"
                id="address"
                label="Address"
                type="text"
                fullWidth
                variant="standard"
                value={addressQuery}
                onChange={(e) => setAddressQuery(e.target.value)}
              />
              <TextField
                autoFocus
                margin="dense"
                id="acreage"
                label="Acreage"
                type="text"
                fullWidth
                variant="standard"
                value={acreageQuery}
                onChange={(e) => setAcreageQuery(e.target.value)}
              />
              <TextField
                autoFocus
                margin="dense"
                id="direction"
                label="Direction"
                type="text"
                fullWidth
                variant="standard"
                value={directionQuery}
                onChange={(e) => setDirectionQuery(e.target.value)}
              />
              <TextField
                autoFocus
                margin="dense"
                id="date"
                label="Date"
                type="text"
                fullWidth
                variant="standard"
                value={dateQuery}
                onChange={(e) => setDateQuery(e.target.value)}
              />
              <TextField
                autoFocus
                margin="dense"
                id="name_contact"
                label="Name Contact"
                type="text"
                fullWidth
                variant="standard"
                value={nameContactQuery}
                onChange={(e) => setNameContactQuery(e.target.value)}
              />
              <TextField
                autoFocus
                margin="dense"
                id="phone_contact"
                label="Phone Contact"
                type="text"
                fullWidth
                variant="standard"
                value={phoneContactQuery}
                onChange={(e) => setPhoneContactQuery(e.target.value)}
              />
              <TextField
                autoFocus
                margin="dense"
                id="bedroom"
                label="Bed Room"
                type="text"
                fullWidth
                variant="standard"
                value={bedRoomQuery}
                onChange={(e) => setBedRoomQuery(e.target.value)}
              />
              <TextField
                autoFocus
                margin="dense"
                id="bathroom"
                label="Bath Room"
                type="text"
                fullWidth
                variant="standard"
                value={bathRoomQuery}
                onChange={(e) => setBathRoomQuery(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleClose1}>Update</Button>
            </DialogActions>
          </Dialog>
        </Stack>
      </Stack>
    </Card>
  );
};

CompanyCard.propTypes = {
  crawl: PropTypes.object.isRequired,
};
