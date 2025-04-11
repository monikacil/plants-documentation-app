"use client";

import { useActionState, useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import Form from "next/form";

import Button from "../common/Button";
import Input from "../form/Input";
import FormDatepicker from "../form/FormDatepicker";

import { PlantCareFormType } from "@/types/plantCare.types";

type Props = {
  plantCare?: PlantCareFormType;
  action: (
    id: string | undefined,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prevState: any,
    formData: FormData
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => Promise<any>;
};

const initForm: PlantCareFormType = {
  _id: "",
  control: "",
  pests: "",
  antiPestActions: "",
  pestControlMeasures: "",
  plantsCount: 1,
  species: "",
  date: new Date(),
};

export default function PlantCareForm({ plantCare, action }: Props) {
  const [state, formAction, isPending] = useActionState(
    action.bind(null, plantCare?._id ? plantCare._id.toString() : undefined),
    null
  );

  const [careForm, setCareForm] = useState(plantCare ? plantCare : initForm);

  return (
    <>
      <Form
        action={formAction}
        className='flex flex-col gap-3'
      >
        <FormDatepicker
          name='date'
          maxDate={new Date()}
          value={careForm?.date}
          onChange={(value) => {
            setCareForm({
              ...careForm,
              date: value,
            });
          }}
        />
        <Input
          name='control'
          placeholder='Control'
          value={careForm?.control}
          errors={!careForm.control ? state?.errors?.control : null}
          onChange={(value) => {
            setCareForm({ ...careForm, control: value });
          }}
        />
        <Input
          name='pests'
          placeholder='Pests'
          value={careForm?.pests}
          errors={!careForm.pests ? state?.errors?.pests : null}
          onChange={(value) => {
            setCareForm({ ...careForm, pests: value });
          }}
        />
        <Input
          name='antiPestActions'
          placeholder='Anti-pest actions'
          value={careForm?.antiPestActions}
          errors={!careForm.antiPestActions ? state?.errors?.antiPestActions : null}
          onChange={(value) => {
            setCareForm({ ...careForm, antiPestActions: value });
          }}
        />
        <Input
          name='pestControlMeasures'
          placeholder='Pest control measures'
          value={careForm?.pestControlMeasures}
          errors={!careForm.pestControlMeasures ? state?.errors?.pestControlMeasures : null}
          onChange={(value) => {
            setCareForm({ ...careForm, pestControlMeasures: value });
          }}
        />
        <Input
          name='plantsCount'
          type='number'
          min={1}
          placeholder='Plants Count'
          value={careForm?.plantsCount}
          errors={!careForm.plantsCount ? state?.errors?.plantsCount : null}
          onChange={(value) => {
            setCareForm({ ...careForm, plantsCount: parseInt(value) });
          }}
        />
        <Input
          name='species'
          placeholder='Species'
          value={careForm?.species}
          errors={!careForm.species ? state?.errors?.species : null}
          onChange={(value) => {
            setCareForm({ ...careForm, species: value });
          }}
        />

        {state?.error && (
          <Alert
            color='failure'
            icon={HiInformationCircle}
          >
            <span className='font-medium'>{state?.error}</span>
          </Alert>
        )}
        <Button
          type='submit'
          disabled={isPending}
          className='my-5'
        >
          Save Plant Care
        </Button>
      </Form>
    </>
  );
}
