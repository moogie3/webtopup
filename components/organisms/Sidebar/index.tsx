import Footer from "./Footer"
import MenuItem from "./MenuItem"
import Profile from "./Profile"
import Cookies from "js-cookie"
import { useRouter } from "next/router"

interface SidebarProps {
    activeMenu: 'overview' | 'transactions' | 'settings'
}

export default function Sidebar(props: SidebarProps) {
    const { activeMenu } = props;
    const router = useRouter();
    const onLogOut = () => {
        Cookies.remove('token');
        router.push('/sing-in');
    }
    return (
        <section className="sidebar">
            <div className="content pt-50 pb-30 ps-30">
                <Profile />
                <div className="menus"> 
                    <MenuItem title="Overview" icon="ic-menu-overview" active={activeMenu === "overview"} href="/member" />
                    <MenuItem title="Transactions" icon="ic-menu-transaction" active={activeMenu === "transactions"} href="/member/transactions" />
                    <MenuItem title="Messages" icon="ic-menu-messages" href="/member" />
                    <MenuItem title="Card" icon="ic-menu-card" href="/member" />
                    <MenuItem title="Rewards" icon="ic-menu-rewards" href="/member" />
                    <MenuItem title="Settings" icon="ic-menu-setting" href="/member/edit-profile" active={activeMenu === "settings"} />
                    <MenuItem title="Log Out" icon="ic-menu-logout" onClick={onLogOut} />
                </div>
                <Footer />
            </div>
        </section>
    )
}
