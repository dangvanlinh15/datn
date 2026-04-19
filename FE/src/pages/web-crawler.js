import Head from "next/head";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CompanyCard } from "src/sections/companies/company-card";
import { CompaniesSearch } from "src/sections/companies/companies-search";
import { useCallback, useMemo, useState, useEffect } from "react";

const companies = [
  {
    id: "2569ce0d517a7f06d3ea1f24",
    createdAt: "27/03/2019",
    description: "Crawl các bài bán nhà từ trang https://bds123.vn/",
    logo: "/assets/logos/logo-bds123.png",
    title: "Bất động sản 123",
    downloads: "594",
  },
  {
    id: "ed2b900870ceba72d203ec15",
    createdAt: "31/03/2019",
    description: "Crawl các bài bán nhà từ trang https://cenhomes.vn/",
    logo: "/assets/logos/logo.png",
    title: "Cenhomes",
    downloads: "625",
  },
  {
    id: "a033e38768c82fca90df3db7",
    createdAt: "03/04/2019",
    description: "Crawl các bài bán nhà từ trang https://alonhadat.com.vn/",
    logo: "/assets/logos/logo.png",
    title: "Alonhadat",
    downloads: "857",
  },
  {
    id: "1efecb2bf6a51def9869ab0f",
    createdAt: "04/04/2019",
    description: "Crawl các bài bán nhà từ trang https://nhadat24h.net/",
    logo: "/assets/logos/logo.png",
    title: "Nhà đất 24h",
    downloads: "406",
  },
  {
    id: "1ed68149f65fbc6089b5fd07",
    createdAt: "04/04/2019",
    description: "Crawl các bài bán nhà từ trang https://alonhadat.com.vn/",
    logo: "/assets/logos/logo.png",
    title: "Bất động sản số",
    downloads: "835",
  },
];

const Page = () => {
  // const [crawls, setCrawls] = useState();
  const [crawl, setCrawl] = useState([]);

  const getData = async () => {
    const response = await fetch("http://localhost:8080/configCrawler/findAll", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    // console.log(useUser(data, page, rowsPerPage));
    setCrawl(data);
    console.log(data)
    // console.log(user);

    console.log(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Head>
        <title>Web Crawler</title>
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
                <Typography variant="h4">Web Crawl</Typography>
                <Stack alignItems="center" direction="row" spacing={1}>
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
                </Stack>
              </Stack>
              <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Add
                </Button>
              </div>
            </Stack>
            <CompaniesSearch />
            <Grid container spacing = {3}>
              {crawl.map((company) => (
                <Grid xs={12} md={6} lg={4} key={company.id}>
                  <CompanyCard crawl={company} />
                </Grid>
              ))}
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Pagination count={3} size="small" />
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
