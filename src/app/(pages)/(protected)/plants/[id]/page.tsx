type Props = {
    params: Promise<{ id: string; slug: string }>;
};

export default async function Page({params}: Props) {
    console.log(params)
    return (
        <div>
            plant details
        </div>
    );
}
