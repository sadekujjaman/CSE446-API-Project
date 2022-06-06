import Box from "@mui/material/Box";
import { useSession } from "next-auth/client";
import { ReactNode, useEffect, useRef, useState } from "react";
import { modalStyle, PageWrapper } from "./commons";
import Footer from "./footer";
import { Intro } from "./home";
import { Nav } from "./navbar";
import Head from "next/head";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { MainListItems, SecondaryListItems } from "./listitems";
import { Alert, Button, Modal, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useUser } from "../../utils/hooks-context";
import { Banner } from "./banner";

interface PageProps {
  children: () => ReactNode;
  title?: string;
}
const drawerWidth: number = 300;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  // zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer)(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    overflow: "auto",
    height: "100%",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));
const mdTheme = createTheme({
  palette: {
    background: {
      default: "#b5b5b5",
    },
  },
});

export const WrapperPage = ({ children, title }: PageProps): JSX.Element => {
  // const router = useRouter();
  const { user } = useUser();
  const { bank } = user ?? {};
  const [session, loading] = useSession();
  const [open, setOpen] = useState(false);
  const [addingBankAccount, setAddingBankAccount] = useState(false);
  const [courseJoiningError, setCourseJoiningError] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => setModalOpen(false);
  const bankNameRef = useRef(""); //creating a refernce for TextField Component
  const accountNoRef = useRef(""); //creating a refernce for TextField Component
  const secretRef = useRef(""); //creating a refernce for TextField Component

  const toggleDrawer = () => {
    setOpen(!open);
  };
  useEffect(() => {
    if (user && !user?.bank) {
      setModalOpen(true);
    } else {
      setModalOpen(false);
    }
  }, [user]);

  const handleAddBankInfo = async () => {
    const bankName = bankNameRef.current.value;
    const accountNo = accountNoRef.current.value;
    const secret = secretRef.current.value;

    setAddingBankAccount(true);
    try {
      const studentId = user?.student?.id;
      const { data } = await axios.post(`/api/bank/${user?.email}`, {
        bankName,
        accountNo,
        secret,
        email: user?.email,
      });

      <Alert severity="success">Account added successfully</Alert>;
      setModalOpen(false);
    } catch (e) {
      console.log(e);
    }
    setAddingBankAccount(false);
  };

  return (
    <>
      <ThemeProvider theme={mdTheme}>
        <Box className="page" sx={{ display: "flex" }}>
          <CssBaseline />
          <PageWrapper>
            <AppBar position="fixed" sx={{ backgroundColor: "dimgrey" }}>
              <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
                <meta
                  name="viewport"
                  content="initial-scale=1.0, width=device-width"
                />
              </Head>
              <Toolbar
                sx={{
                  pr: "24px", // keep right padding when drawer closed
                }}
              >
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={toggleDrawer}
                  sx={{
                    marginRight: "36px",
                    ...(open && { display: "none" }),
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <Nav
                  session={session}
                  loading={loading}
                  handleModalOpen={handleModalOpen}
                  handleModalClose={handleModalClose}
                />
                <IconButton color="inherit" sx={{ float: "right" }}>
                  <Badge badgeContent={4} color="primary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Toolbar>
            </AppBar>

            <Drawer
              anchor="left"
              variant="temporary"
              open={open}
              onClose={toggleDrawer}
              onBackdropClick={toggleDrawer}
            >
              <Toolbar
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  px: [1],
                }}
              >
                <IconButton onClick={toggleDrawer}>
                  <ChevronLeftIcon />
                </IconButton>
              </Toolbar>
              <Divider />
              {/* <MainListItems /> */}
              {/* <Divider />
              <List>
                <SecondaryListItems />
              </List> */}
            </Drawer>
            <div style={{ marginTop: "100px" }}>
              {children()}
              {/* {session && !loading && <div>{children()}</div>} */}
            </div>
            <Modal
              open={modalOpen}
              onClose={handleModalClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={modalStyle}>
                <Typography id="modal-modal-title" variant="h6">
                  Setup bank account
                </Typography>
                <TextField
                  id="outlined-basic"
                  label="Bank Name"
                  variant="outlined"
                  inputRef={bankNameRef}
                />
                <TextField
                  id="outlined-basic"
                  label="Account No"
                  variant="outlined"
                  inputRef={accountNoRef}
                />
                <TextField
                  id="outlined-basic"
                  label="Secret Code"
                  variant="outlined"
                  inputRef={secretRef}
                />

                <Button
                  variant="contained"
                  disabled={addingBankAccount}
                  onClick={handleAddBankInfo}
                >
                  {"Add"}
                </Button>
                <Button
                  variant="outlined"
                  disabled={addingBankAccount}
                  onClick={() => setModalOpen(false)}
                >
                  {"Setup later"}
                </Button>
              </Box>
            </Modal>
            <Footer />
          </PageWrapper>
        </Box>
      </ThemeProvider>
    </>
  );
};
