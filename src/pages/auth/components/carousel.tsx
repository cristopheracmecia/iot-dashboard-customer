import { FC, Fragment } from "react";
import { Carousel } from "flowbite-react";
import Pic1 from "../../../assets/ACME-CIA-1.jpg";
import Pic2 from "../../../assets/ACME-CIA-2.jpg";
import Pic3 from "../../../assets/ACME-CIA-3.jpg";
type Props = {};

export const AuthPageCarousel: FC<Props> = ({}) => {
  return (
    <Carousel
      className="w-full h-full"
      indicators={false}
      leftControl={<Fragment />}
      rightControl={<Fragment />}
    >
      <img alt="..." src={Pic1} className="object-cover w-full h-full" />
      <img alt="..." src={Pic2} className="object-cover w-full h-full" />
      <img alt="..." src={Pic3} className="object-cover w-full h-full" />
    </Carousel>
  );
};
