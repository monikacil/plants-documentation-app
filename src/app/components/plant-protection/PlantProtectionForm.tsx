"use client";

import { useActionState, useState } from "react";
import Form from "next/form";

import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

// import { PlantProtectionFormType } from "@/app/mongoose/types/protection.types.ts";

type PlantProtectionFormType = {
  _id: string;
  control: string;
  pests: string;
  actionTaken: string;
  exterminator: string;
  amount: number;
  species: string;
  date: Date;
}
/* eslint-disable  @typescript-eslint/no-explicit-any */
type Props = {
  plantProtection?: PlantProtectionFormType;
  action: (
    id: string | undefined,
    prevState: any,
    formData: FormData
  ) => Promise<any>;
};

const initForm: PlantProtectionFormType = {
  _id: "",
  control: "",
  pests: "",
  actionTaken: "",
  exterminator: "",
  amount: 1,
  species: "",
  date: new Date(),
};

export function PlantprotectionForm({ plantProtection, action }: Props) {
  const [state, formAction, isPending] = useActionState(
    action.bind(null, plantProtection?._id ? plantProtection._id.toString() : undefined),
    null
  );

  const [protectionForm, setprotectionForm] = useState(
    plantProtection ? plantProtection : initForm
  );

  return (
    <>
      <Form
        action={ formAction }
        className="flex flex-col gap-3"
      >
        <Input
          name="control"
          placeholder="Control"
          value={ protectionForm?.control }
          errors={ !protectionForm.control ? state?.errors?.control : null }
          onChange={ (value) => {
            setprotectionForm({ ...protectionForm, control: value });
          } }
        />
        <Input
          name="pests"
          placeholder="Pests"
          value={ protectionForm?.pests }
          errors={ !protectionForm.pests ? state?.errors?.pests : null }
          onChange={ (value) => {
            setprotectionForm({ ...protectionForm, pests: value });
          } }
        />
        <Input
          name="actionTaken"
          placeholder="Anti-pest actions"
          value={ protectionForm?.actionTaken }
          errors={ !protectionForm.actionTaken ? state?.errors?.actionTaken : null }
          onChange={ (value) => {
            setprotectionForm({ ...protectionForm, actionTaken: value });
          } }
        />
        <Input
          name="exterminator"
          placeholder="Pest Exterminator"
          value={ protectionForm?.exterminator }
          errors={ !protectionForm.exterminator ? state?.errors?.exterminator : null }
          onChange={ (value) => {
            setprotectionForm({ ...protectionForm, exterminator: value });
          } }
        />
        <Input
          name="amount"
          type="number"
          min={ 1 }
          value={ protectionForm?.amount }
          errors={ !protectionForm.amount ? state?.errors?.amount : null }
          onChange={ (value) => {
            setprotectionForm({ ...protectionForm, amount: parseInt(value) });
          } }
        />
        <Input
          name="species"
          placeholder="Species"
          value={ protectionForm?.species }
          errors={ !protectionForm.species ? state?.errors?.species : null }
          onChange={ (value) => {
            setprotectionForm({ ...protectionForm, species: value });
          } }
        />

        {/*{state?.error && (*/ }
        {/*    <Alert*/ }
        {/*        color="failure"*/ }
        {/*        icon={HiInformationCircle}*/ }
        {/*    >*/ }
        {/*        <span className="font-medium">{state?.error}</span>*/ }
        {/*    </Alert>*/ }
        {/*)}*/ }
        <Button
          type="submit"
          disabled={ isPending }
          className="my-5"
        >
          Save Plant Protection
        </Button>
      </Form>
    </>
  );
}
