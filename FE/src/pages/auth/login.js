import { useCallback, useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  FormHelperText,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useAuth } from "src/hooks/use-auth";
import { Layout as AuthLayout } from "src/layouts/auth/layout";

const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  const [method, setMethod] = useState("email");
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const [flag, setFlag] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        // let email1 = values.email;
        // let passWord1 = values.password;
        console.log(email + passWord);
        const response = await fetch("http://localhost:8080/auth/login1", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            passWord: passWord,
          }),
        });
        const data = await response.json();
        console.log(data);
        window.sessionStorage.setItem("userInfo", data);

        // await auth.signIn(values.email, values.password);

        try {
          window.sessionStorage.setItem("authenticated", "true");
        } catch (err) {
          console.error(err);
        }
        auth.skip();
        router.push("/");
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  const handleMethodChange = useCallback((event, value) => {
    setMethod(value);
  }, []);

  const handleSkip = useCallback(() => {
    auth.skip();
    router.push("/");
  }, [auth, router]);

  const signIn = async () => {
    console.log(email + passWord);

    const response = await fetch("http://localhost:8080/loginAdmin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        passWord: passWord,
      }),
    });
    // const data = response.json();
    console.log(response);

    if (response.status != 204) {
      try {
        window.sessionStorage.setItem("authenticated", "true");
      } catch (err) {
        console.error(err);
      }
      auth.skip();
      router.push("/");
    } else {
      setFlag(true);
    }

    // const user = {
    //   id: "5e86809283e28b96d2d38537",
    //   avatar: "/assets/avatars/avatar-anika-visser.png",
    //   name: "Anika Visser",
    //   email: "anika.visser@devias.io",
    // };

    // dispatch({
    //   type: HANDLERS.SIGN_IN,
    //   payload: user,
    // });
  };

  const handleLogin = useCallback(() => {
    signIn();
  });

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Box
        sx={{
          backgroundColor: "background.paper",
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Login</Typography>
              <Typography color="text.secondary" variant="body2">
                Don&apos;t have an account? &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/register"
                  underline="hover"
                  variant="subtitle2"
                >
                  Register
                </Link>
              </Typography>
            </Stack>
            <Tabs onChange={handleMethodChange} sx={{ mb: 3 }} value={method}>
              <Tab label="Email" value="email" />
              <Tab label="Phone Number" value="phoneNumber" />
            </Tabs>
            {method === "email" && (
              <form noValidate onSubmit={formik.handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    // error={!!(formik.touched.email && formik.errors.email)}
                    fullWidth
                    // helperText={formik.touched.email && formik.errors.email}
                    label="Email Address"
                    name="email"
                    // onBlur={formik.handleBlur}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    value={email}
                  />
                  <TextField
                    // error={!!(formik.touched.password && formik.errors.password)}
                    fullWidth
                    // helperText={formik.touched.password && formik.errors.password}
                    label="Password"
                    name="password"
                    // onBlur={formik.handleBlur}
                    onChange={(e) => setPassWord(e.target.value)}
                    type="password"
                    value={passWord}
                  />
                </Stack>
                {/* <FormHelperText sx={{ mt: 1 }}>Optionally you can skip.</FormHelperText> */}
                {flag && (
                  <Typography color="error" sx={{ mt: 3 }} variant="body2">
                    email or password is incorrect
                  </Typography>
                )}
                <Button fullWidth size="large" sx={{ mt: 3 }} onClick={signIn} variant="contained">
                  Continue
                </Button>
                <Button fullWidth size="large" sx={{ mt: 3 }} onClick={handleSkip}>
                  Skip authentication
                </Button>
                {/* <Alert
                  color="primary"
                  severity="info"
                  sx={{ mt: 3 }}
                >
                  <div>
                    You can use <b>demo@devias.io</b> and password <b>Password123!</b>
                  </div>
                </Alert> */}
              </form>
            )}
            {method === "phoneNumber" && (
              <div>
                <Typography sx={{ mb: 1 }} variant="h6">
                  Not available in the demo
                </Typography>
                <Typography color="text.secondary">
                  To prevent unnecessary costs we disabled this feature in the demo.
                </Typography>
              </div>
            )}
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
