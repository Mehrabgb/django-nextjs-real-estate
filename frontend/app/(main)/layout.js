import ClientHeader from "@/components/headers/client-header";
import GuestHeader from "@/components/headers/guest-header";
import SellerHeader from "@/components/headers/seller-header";
import GetNotificationsCount from "@/data/notidications/get-notifications-count";
import getWhoAmI from "@/data/profile/whoami";
import { cookies } from "next/headers";

export default async function MainLayout({ children }) {
  var user=null
  var notificationscount=null
  const cookieStore = await cookies()
  const refreshToken = cookieStore.get('refresh_token')?.value
  if (refreshToken){
     user=await getWhoAmI()
  }
  if (user?.role==='seller'){
    notificationscount=await GetNotificationsCount()
  }
  return (
    <div className="min-h-screen flex flex-col">
            {user?.role==='seller' ?<SellerHeader user={user} notificationscount={notificationscount}/>:
            user?.role==='client'?<ClientHeader user={user}/>: <GuestHeader/>}

            <main className="flex-1">
                {children}
            </main>
        </div>
  );
}