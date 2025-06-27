"use client";

import {useActionState, useState} from "react";
import Form from "next/form";

import {Button} from "../ui/Button";
import {Input} from "../ui/Input";

// import { ExpenseFormType } from "@/app/mongoose/types/expenses.types";

type ExpenseFormType = {
    _id: string;
    products: string;
    shop: string;
    price: string;
    date: Date;
}

type Props = {
    expense?: ExpenseFormType;
    action: (
        id: string | undefined,
        prevState: FormData,
        formData: FormData
        /* eslint-disable  @typescript-eslint/no-explicit-any */
    ) => Promise<any>;
};

const initForm: ExpenseFormType = {
    _id: "",
    products: "",
    shop: "",
    price: "",
    date: new Date(),
};

export function ExpenseForm({expense, action}: Props) {
    const [state, formAction, isPending] = useActionState(
        action.bind(null, expense?._id ? expense._id.toString() : undefined),
        null
    );

    const [expensesForm, setExpensesForm] = useState(expense ? expense : initForm);

    return (
        <>
            <Form
                action={formAction}
                className="flex flex-col gap-3"
                data-testid="expense-form"
            >
                <Input
                    name="products"
                    placeholder="Products"
                    value={expensesForm?.products}
                    errors={!expensesForm.products ? state?.errors?.products : null}
                    onChange={(value) => {
                        setExpensesForm({...expensesForm, products: value});
                    }}
                />
                <Input
                    name="price"
                    placeholder="Price"
                    value={expensesForm?.price}
                    errors={!expensesForm.price ? state?.errors?.price : null}
                    onChange={(value) => {
                        setExpensesForm({...expensesForm, price: value});
                    }}
                />
                <Input
                    name="shop"
                    placeholder="Seller"
                    value={expensesForm?.shop}
                    errors={!expensesForm.shop ? state?.errors?.shop : null}
                    onChange={(value) => {
                        setExpensesForm({...expensesForm, shop: value});
                    }}
                />
                {/*<FormDatepicker*/}
                {/*  name="date"*/}
                {/*  maxDate={ new Date() }*/}
                {/*  value={ expensesForm.date }*/}
                {/*  onChange={ (value) => {*/}
                {/*    setExpensesForm({*/}
                {/*      ...expensesForm,*/}
                {/*      date: value ? value : new Date(),*/}
                {/*    });*/}
                {/*  } }*/}
                {/*/>*/}
                {/*{ state?.error && (*/}
                {/*  <Alert*/}
                {/*    color="failure"*/}
                {/*    icon={ HiInformationCircle }*/}
                {/*  >*/}
                {/*    <span className="font-medium">{ state?.error }</span>*/}
                {/*  </Alert>*/}
                {/*) }*/}
                <Button
                    type="submit"
                    disabled={isPending}
                    className="my-5"
                >
                    Save Expense
                </Button>
            </Form>
        </>
    );
}
