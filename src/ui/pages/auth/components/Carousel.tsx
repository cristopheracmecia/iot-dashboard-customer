import { FC } from "react";
import Pic1 from "../../../../assets/ACME-CIA-1.jpg";
import Pic2 from "../../../../assets/ACME-CIA-2.jpg";
import Pic3 from "../../../../assets/ACME-CIA-3.jpg";
import {Carousel} from "antd";
type Props = {};

export const AuthPageCarousel: FC<Props> = ({}) => {
  return (
    <Carousel
      autoplay
      dots={false}
      style={{
        height: "100%"
      }}
    >
      <img alt="..." src={Pic1} className="object-cover w-full h-screen" />
      <img alt="..." src={Pic2} className="object-cover w-full h-screen" />
      <img alt="..." src={Pic3} className="object-cover w-full h-screen" />
    </Carousel>
  );
};
