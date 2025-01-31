"use client";

import Confirmation from "../common/Confirmation";
import ModalWrapper from "./ModalWrapper";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
  id: string;
  title: string;
  route: string;
  withRoute?: boolean;
  action: (id: string) => Promise<{ message: string } | undefined>;
};

export default function DeleteModal({
  children,
  id,
  title,
  route,
  withRoute = false,
  action,
}: Props) {
  return (
    <ModalWrapper title={title} route={withRoute ? route : undefined}>
      <Confirmation
        confirmClick={async () => {
          await action(id);
          redirect(route);
        }}
      >
        {children}
      </Confirmation>
    </ModalWrapper>
  );
}
