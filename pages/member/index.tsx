import OverviewContent from "@/components/organisms/OverviewContent";
import Sidebar from "@/components/organisms/Sidebar";
import { JWTPayloadTypes, UserTypes } from "@/services/data-types";
import { jwtDecode } from "jwt-decode";

export default function Member() {
    return (
        <section className="overview overflow-auto">
            <Sidebar activeMenu="overview" />
            <OverviewContent />
        </section>
    )
}


interface GetServerSideProps {
    req: {
        cookies: {
            token: string;
        }
    }
}

export async function getServerSideProps({ req }: GetServerSideProps) {
    const { token } = req.cookies;
    if (!token) {
        return {
            redirect: {
                destination: '/sign-in',
                permanent: false,
            },
        };
    }

    const jwtToken = Buffer.from(token, 'base64').toString('ascii');
    const payload: JWTPayloadTypes = jwtDecode(jwtToken);
    const userFromPayLoad: UserTypes = payload.player;
    const IMG = process.env.NEXT_PUBLIC_IMG;
    userFromPayLoad.avatar = `${IMG}/${userFromPayLoad.avatar}`;
    return {
        props: {
            user: userFromPayLoad,
        }
    }
}