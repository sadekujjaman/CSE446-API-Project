import { signIn, signOut, useSession } from "next-auth/client";
import styled from "styled-components";
import { Avatar, Logo } from "./commons";
import Link from "next/link";
import {
  Button,
  Popover,
  Avatar as MuiAvatar,
  Typography,
  Divider,
  IconButton,
  Badge,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import axios from "axios";
import { useUser } from "../../utils/hooks-context";
import { useCart } from "../../hooks/cart";
import NextImage from "next/image";

const Navbar = styled.div`
  width: 100%;
  .navbar {
    display: flex;
    align-items: center;

    background: #b5b5b5;
    color: white;
    font-family: Helvetica;
    font-weight: 300;
    min-height: 80px;
  }

  .navbar__title {
    margin-right: auto;
    font-size: 150%;
    padding: 12px 16px;
  }

  .navbar__item {
    padding: 8px 16px;
    cursor: pointer;
    vertical-align: middle;
  }
  .navbar__link {
    cursor: pointer;
    color: #2d1d0d;
    font-size: 18px;
    font-family: cursive;
    border: none;
    background: none;
    &:hover {
      color: #eedece;
      transition: 200ms ease-in;
    }
  }
  .admin-profile {
    display: flex;
  }

  .navbar__profile {
    display: grid;
    text-align: center;
  }
  .rounded__image {
    border-radius: 50% !important;
  }
  .navbar_popover {
    width: 200px;
  }
`;

// const Image = (props) => {
//   if (props.src) {
//     return <NextImage {...props} />;
//   }

//   //TODO: if the image source is not there, you can set a default source
//   const defaultSrc = "something";

//   return <img {...props} src={defaultSrc} />;
// };

export const Nav = ({
  session,
  loading,
  handleModalOpen,
  handleModalClose,
}: {
  session: any;
  loading: any;
  handleModalOpen: () => void;
  handleModalClose: () => void;
}) => {
  console.log({ session });
  const { user, updateUser } = useUser();
  const { products, addProduct, deleteProduct } = useCart();
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    const fetchUser = async () => {
      console.log("HERE");
      try {
        const { data } = await axios.get(
          `/api/users/email/${session.user.email}`
        );
        if (data && data?.accountInfo) {
          updateUser({
            name: session.user.name,
            email: session.user.email,
            ...data?.accountInfo,
          });
        } else if (session.user) {
          updateUser({ name: session.user.name, email: session.user.email });
        }
      } catch (e) {
        console.log(e);
      }
    };
    console.log({ session }, session?.user, user);
    session && session.user && !user && fetchUser();
  }, [session, user]);

  return (
    <Navbar>
      <div className="navbar">
        <div className="navbar__title navbar__item">
          <Link
            href={{
              pathname: "/",
              query: {},
            }}
            passHref
          >
            <button className="navbar__link" style={{ fontSize: "22px" }}>
              Goodies
            </button>
          </Link>
        </div>
        <div className="navbar__item">
          <Link
            href={{
              pathname: "/cart",
              query: {},
            }}
            passHref
          >
            <IconButton color="inherit" sx={{ float: "right" }}>
              <Badge badgeContent={products.length} color="primary">
                <div className="navbar__link">Cart</div>
              </Badge>
            </IconButton>
          </Link>
        </div>
        {!session && !loading && (
          <div className="navbar__item">
            <button className="navbar__link" onClick={() => signIn()}>
              Login
            </button>
          </div>
        )}

        {session && !loading && (
          <>
            <div className="navbar__item">
              <Link
                href={{
                  pathname: "/products",
                  query: {},
                }}
                passHref
              >
                <div className="navbar__link">Products</div>
              </Link>
            </div>
          </>
        )}

        {session && !loading && (
          <div className="navbar__item admin-profile">
            <div
              style={{
                marginRight: "10px",
              }}
            >
              <Box>
                <div className="navbar__link navbar__profile">
                  <MuiAvatar
                    onClick={handleClick}
                    alt="Remy Sharp"
                    src={session.user.image}
                    sx={{ width: 27, height: 27 }}
                  />
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                  >
                    <Box
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        backgroundColor: "#F8F8F8",
                      }}
                    >
                      <Box
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "5px",
                          marginTop: "10px",
                          marginBottom: "10px",
                        }}
                      >
                        <MuiAvatar
                          // alt="Remy Sharp"
                          src={session.user.image}
                          sx={{ width: 56, height: 56 }}
                        />
                        {/* <Image
                          src={session.user.image}
                          width="96"
                          height="96"
                          alt="profile avatar"
                        /> */}
                        <Typography variant="body1">
                          {session.user.name}
                        </Typography>
                        <Typography variant="body2">
                          {session.user.email}
                        </Typography>
                      </Box>
                      <Divider />
                      <Box
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          padding: "15px",
                          gap: "5px",
                          width: "250px",
                          background: "#efefef",
                        }}
                      >
                        <Button className="navbar__link">
                          <Link passHref href={{ pathname: "/orders" }}>
                            My Orders
                          </Link>
                        </Button>
                        {/* <Button className="navbar__link">
                          <Link passHref href={{ pathname: "/courses/create" }}>
                            My Reviews
                          </Link>
                        </Button> */}
                        <Button className="navbar__link">
                          <Link
                            passHref
                            href={{
                              pathname: `/users/${user?.email}`,
                            }}
                          >
                            Manage Profile
                          </Link>
                        </Button>
                        <Button
                          className="navbar__link"
                          onClick={() => signOut()}
                        >
                          Logout
                        </Button>
                      </Box>
                    </Box>
                  </Popover>
                </div>
              </Box>
            </div>
          </div>
        )}
      </div>
    </Navbar>
  );
};
