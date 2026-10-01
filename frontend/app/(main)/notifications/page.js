import NotificationsPageComponent from "@/components/notificationpage/notificationpage"
import GetNotifications from "@/data/notidications/get-notifications"

export const metadata = {
    title: "Notifications",
    description: "View your latest notifications.",
};

export default async function NotificationsPage(){
    const notifications=await GetNotifications()
    return <NotificationsPageComponent notifications={notifications}/>
}