import MyPropertiesPageComponent from "@/components/myproperties/myproperties";
import GetMyProperties from "@/data/properties/get-myproperties";

export const metadata = {
    title: "My Properties",
    description: "Manage the properties you have listed.",
};

export default async function MyPropertyPage(){
    const properties = await GetMyProperties();
    return <MyPropertiesPageComponent properties={properties}/>
}