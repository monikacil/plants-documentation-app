"use client";

import { Collections } from "@/types/plant.types";
import Confirmation from "../common/Confirmation";
import ModalWrapper from "./ModalWrapper";
import { redirect } from "next/navigation";

type Props = {
  id: string;
  slug?: Collections;
  title: string;
  route: string;
  withRoute?: boolean;
  action: (
    id: string,
    slug?: Collections
  ) => Promise<{ message: string } | undefined>;
};

export default function DeleteElementModal({
  id,
  slug,
  title,
  route,
  withRoute = false,
  action,
}: Props) {
  return (
    <ModalWrapper title={title} route={withRoute ? route : undefined}>
      <Confirmation
        confirmClick={async () => {
          if (slug) {
            await action(id, slug);
          } else {
            await action(id);
          }
          redirect(route);
        }}
      >
        Deleting this item is irreversible, are you sure you know what you are
        doing?
      </Confirmation>
    </ModalWrapper>
  );
}
