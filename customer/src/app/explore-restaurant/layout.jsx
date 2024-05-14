import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
export default function Layout({ children }) {
    return (
        <div>
            <Navbar />
            <div style={{ display: 'flex', flexDirection: "row" }}>
                <Sidebar />
                <main>{children}</main>
            </div>
        </div>
    );
}