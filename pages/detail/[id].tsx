import TopUpForm from "@/components/organisms/TopUpForm";
import TopUpItem from "@/components/organisms/TopUpItem";
import { GameItemTypes, NominalsTypes, PaymentTypes } from "@/services/data-types";
import { getDetailVoucher, getFeaturedGame } from "@/services/player";
import Footer from "../../components/organisms/Footer";
import Navbar from "../../components/organisms/Navbar";

interface DetailProps {
    dataItem: GameItemTypes;
    nominals: NominalsTypes[];
    payments: PaymentTypes[];
}

export default function Detail({ dataItem, nominals, payments }: DetailProps) {
    return (
        <>
            <Navbar />
            <section className="detail pt-lg-60 pb-50">
                <div className="container-xxl container-fluid">
                    <div className="detail-header pb-50">
                        <h2 className="text-4xl fw-bold color-palette-1 text-start mb-10">Top Up</h2>
                        <p className="text-lg color-palette-1 mb-0">Perkuat akun dan jadilah pemenang</p>
                    </div>
                    <div className="row">
                        <div className="col-xl-3 col-lg-4 col-md-5 pb-30 pb-md-0 pe-md-25 text-md-start">
                            <TopUpItem data={dataItem} type="mobile" />
                        </div>
                        <div className="col-xl-9 col-lg-8 col-md-7 ps-md-25">
                            <TopUpItem data={dataItem} type="desktop" />
                            <hr />
                            <TopUpForm nominals={nominals} payments={payments} />
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export async function getStaticPaths() {
    const data = await getFeaturedGame();

    if (!data || data.length === 0) {
        return {
            paths: [],
            fallback: 'blocking', // Or you can use 'false', depending on your use case
        };
    }

    const paths = data.map((item: GameItemTypes) => ({
        params: {
            id: item._id,
        },
    }));

    return {
        paths,
        fallback: 'blocking', // Use 'blocking' if you want Next.js to wait for data before rendering the page
    };
}

interface GetStaticProps {
    params: {
        id: string;
    }
}

export async function getStaticProps({ params }: GetStaticProps) {
    const { id } = params;
    try {
        const data = await getDetailVoucher(id);

        if (!data || !data.detail) {
            return { notFound: true };
        }

        return {
            props: {
                dataItem: data.detail,
                nominals: data.nominals,
                payments: data.payment,
            },
        };
    } catch (error) {
        console.error(error);
        return {
            notFound: true,
        };
    }
}
