'use client'

import { useActionState, useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from 'flowbite-react';
import Form from 'next/form'

import BasicButton from '../common/BasicButton';
import Input from '../form/Input';
import FormDatepicker from '../form/FormDatepicker';

import { ExpenseFormType } from "@/app/types/expenses.types";
import { addExpenses } from "@/app/actions/expenses.actions";

type Props = {
  expense?: ExpenseFormType
}

const initForm: ExpenseFormType = {
  products: '',
  shop: '',
  price: '',
  date: new Date().toString(),
}

export default function ExpenseForm({ expense }: Props) {
  const [state, formAction, isPending] = useActionState(addExpenses, initForm)
  const [expensesForm, setExpensesForm] = useState(expense ? expense : initForm)

  return (
    <>
      <Form action={ formAction }>
        <>
          <Input
            name="products"
            label="Products"
            value={ expensesForm?.products }
            errors={ !expensesForm.products ? state?.errors?.products : null }
            onChange={(value) => { setExpensesForm({ ...expensesForm, products: value }) }}
          />
          <Input
            name="price"
            label="Price"
            value={ expensesForm?.price }
            errors={ !expensesForm.price ? state?.errors?.price : null }
            onChange={(value) => { setExpensesForm({ ...expensesForm, price: value }) }}
          />
          <Input
            name="shop"
            label="Shop"
            value={ expensesForm?.shop }
            errors={ !expensesForm.shop ? state?.errors?.shop : null }
            onChange={(value) => { setExpensesForm({ ...expensesForm, shop: value }) }}
          />
          <FormDatepicker
            name="date"
            label="Pick date"
            maxDate={ new Date() }
            value={ new Date(expensesForm.date) }
            onChange={(value) => { setExpensesForm({ ...expensesForm, date: value ? value.toString() : new Date().toString() }) }}
          />
        </>
        <BasicButton type="submit" disabled={ isPending } isProcessing={ isPending } className="my-5">Save Expense</BasicButton>
        {state?.error &&
        <Alert color="failure" icon={ HiInformationCircle }>
          <span className="font-medium">{ state?.error }</span>
        </Alert>}
      </Form>
    </>
  )
}
