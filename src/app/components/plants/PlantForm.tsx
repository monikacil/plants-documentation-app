"use client";

// import { Collections, PlantExtraArgs, PlantTableType } from "@/app/mongoose/types/plant.types";
//
// import Input from "../form/Input";
// import Button from "../common/Button";
// import FormDatepicker from "../form/FormDatepicker";
// import { Alert } from "flowbite-react";
// import { HiInformationCircle } from "react-icons/hi";

// type Props = {
//   plant?: PlantTableType;
//   collection: Collections;
//   action: (
//     extraArgs: PlantExtraArgs,
//
//     prevState: any,
//     formData: FormData
//
//   ) => Promise<any>;
// };

// const initForm: PlantTableType = {
//   _id: "",
//   species: "",
//   variety: "",
//   price: "",
//   date: new Date(),
//   passport: "",
//   name: "",
//   address: "",
//   phone: "",
//   email: "",
//   country: "",
// };
/* eslint-disable  @typescript-eslint/no-explicit-any */
export function PlantForm({plant}: { plant?: any }) {
    console.log(plant);
    // const [state, formAction, isPending] = useActionState(
    //   action.bind(null, { collection: collection, id: plant?._id.toString() }),
    //   null
    // );
    // const [plantForm, setPlantForm] = useState(plant ? plant : initForm);

    return (
        <>
            {/*<Form action={ formAction }>*/}
            {/*  <div className='grid lg:grid-cols-2 gap-4 mb-3'>*/}
            {/*    <Input*/}
            {/*      name='species'*/}
            {/*      placeholder='Species'*/}
            {/*      value={ plantForm?.species }*/}
            {/*      errors={ !plantForm.species ? state?.errors?.species : null }*/}
            {/*      onChange={ (value) => {*/}
            {/*        setPlantForm({ ...plantForm, species: value });*/}
            {/*      } }*/}
            {/*    />*/}
            {/*    <Input*/}
            {/*      name='variety'*/}
            {/*      placeholder='Variety'*/}
            {/*      value={ plantForm?.variety }*/}
            {/*      errors={ !plantForm.variety ? state?.errors?.variety : null }*/}
            {/*      onChange={ (value) => {*/}
            {/*        setPlantForm({ ...plantForm, variety: value });*/}
            {/*      } }*/}
            {/*    />*/}
            {/*  </div>*/}
            {/*  { collection !== "collected" ? (*/}
            {/*    <>*/}
            {/*      <div className='lg:grid lg:grid-cols-2 gap-4'>*/}
            {/*        <div className='grid grid-cols-2 gap-2'>*/}
            {/*          <FormDatepicker*/}
            {/*            name='date'*/}
            {/*            maxDate={ new Date() }*/}
            {/*            value={ plantForm.date }*/}
            {/*            onChange={ (value) => {*/}
            {/*              setPlantForm({*/}
            {/*                ...plantForm,*/}
            {/*                date: value ? value : new Date(),*/}
            {/*              });*/}
            {/*            } }*/}
            {/*          />*/}
            {/*          <Input*/}
            {/*            name='price'*/}
            {/*            placeholder='Price'*/}
            {/*            value={ plantForm?.price }*/}
            {/*            errors={ !plantForm.price ? state?.errors?.price : null }*/}
            {/*            onChange={ (value) => {*/}
            {/*              setPlantForm({ ...plantForm, price: value });*/}
            {/*            } }*/}
            {/*          />*/}
            {/*        </div>*/}
            {/*        <Input*/}
            {/*          name='passport'*/}
            {/*          placeholder='Passport number'*/}
            {/*          value={ plantForm?.passport }*/}
            {/*          errors={ !plantForm.passport ? state?.errors?.passport : null }*/}
            {/*          onChange={ (value) => {*/}
            {/*            setPlantForm({ ...plantForm, passport: value });*/}
            {/*          } }*/}
            {/*        />*/}
            {/*        <Input*/}
            {/*          name='name'*/}
            {/*          placeholder='Name'*/}
            {/*          value={ plantForm?.name }*/}
            {/*          errors={ !plantForm.name ? state?.errors?.name : null }*/}
            {/*          onChange={ (value) => {*/}
            {/*            setPlantForm({ ...plantForm, name: value });*/}
            {/*          } }*/}
            {/*        />*/}
            {/*        <div className='grid grid-cols-4 gap-2'>*/}
            {/*          <Input*/}
            {/*            className='col-span-3'*/}
            {/*            name='address'*/}
            {/*            placeholder='Address'*/}
            {/*            value={ plantForm?.address }*/}
            {/*            errors={ !plantForm.address ? state?.errors?.address : null }*/}
            {/*            onChange={ (value) => {*/}
            {/*              setPlantForm({ ...plantForm, address: value });*/}
            {/*            } }*/}
            {/*          />*/}
            {/*          <Input*/}
            {/*            name='country'*/}
            {/*            placeholder='Country'*/}
            {/*            value={ plantForm?.country }*/}
            {/*            errors={ !plantForm.country ? state?.errors?.country : null }*/}
            {/*            onChange={ (value) => {*/}
            {/*              setPlantForm({ ...plantForm, country: value });*/}
            {/*            } }*/}
            {/*          />*/}
            {/*        </div>*/}
            {/*        <Input*/}
            {/*          name='phone'*/}
            {/*          placeholder='Phone Number'*/}
            {/*          value={ plantForm?.phone }*/}
            {/*          errors={ !plantForm.phone ? state?.errors?.phone : null }*/}
            {/*          onChange={ (value) => {*/}
            {/*            setPlantForm({ ...plantForm, phone: value });*/}
            {/*          } }*/}
            {/*        />*/}
            {/*        <Input*/}
            {/*          name='email'*/}
            {/*          placeholder='Email'*/}
            {/*          value={ plantForm?.email }*/}
            {/*          errors={ !plantForm.email ? state?.errors?.email : null }*/}
            {/*          onChange={ (value) => {*/}
            {/*            setPlantForm({ ...plantForm, email: value });*/}
            {/*          } }*/}
            {/*        />*/}
            {/*      </div>*/}
            {/*    </>*/}
            {/*  ) : null }*/}
            {/*  { state?.error && (*/}
            {/*    <Alert*/}
            {/*      color='failure'*/}
            {/*      icon={ HiInformationCircle }*/}
            {/*    >*/}
            {/*      <span className='font-medium'>{ state?.error }</span>*/}
            {/*    </Alert>*/}
            {/*  ) }*/}
            {/*  <Button*/}
            {/*    type='submit'*/}
            {/*    disabled={ isPending }*/}
            {/*    className='mt-5'*/}
            {/*  >*/}
            {/*    Save Plant*/}
            {/*  </Button>*/}
            {/*</Form>*/}
        </>
    );
}
