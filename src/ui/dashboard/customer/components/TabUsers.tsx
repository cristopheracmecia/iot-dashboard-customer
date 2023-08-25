import { FC } from "react";
import { AppLoader } from "../../../components/AppLoader";
import { Customer } from "../../../../types/Customer";

type Props = {
  customer: Customer;
};

export const CustomerUsersTab: FC<Props> = ({ customer }) => {
  return (
    <div
      className={
        "w-full h-full overflow-x-hidden overflow-y-auto flex flex-col justify-start items-start gap-2"
      }
    >
      <AppLoader />
    </div>
  );
};
