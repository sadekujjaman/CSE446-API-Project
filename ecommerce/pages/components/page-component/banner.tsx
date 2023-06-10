export const bannerData = [
  "/almonds-banner.jpg",
  "/pistachio4.jpeg",
  "/walnuts1.jpg",
  "/pistachio1.jpg",
  "/cashew5.jpg",
  "/pistachio3.jpg",
  //   "https://rukminim1.flixcart.com/flap/3376/560/image/57267a180af306fe.jpg?q=50",
  //   "https://rukminim1.flixcart.com/flap/3376/560/image/ae9966569097a8b7.jpg?q=50",
  //   "https://rukminim1.flixcart.com/flap/3376/560/image/f6202f13b6f89b03.jpg?q=50",
];
import React from "react";
import Carousel from "react-material-ui-carousel";

export const Banner = () => {
  return (
    <Carousel
      autoPlay={true}
      animation="slide"
      indicators={false}
      navButtonsAlwaysVisible={true}
      cycleNavigation={true}
      navButtonsProps={{
        style: {
          background: "#fff",
          color: "#494949",
          borderRadius: 0,
          margin: 0,
        },
      }}
      //   sx={{ marginTop: 20 }}
    >
      {bannerData.map((item) => (
        <img
          key={item}
          src={item}
          alt=""
          style={{ width: "100%", height: "500px" }}
        />
      ))}
    </Carousel>
  );
};
