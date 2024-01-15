"use server"

import { currentUser } from "@clerk/nextjs";
import AccountProfile from "@/components/forms/AccountProfile";
import { fetchUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

async function Page() {
    const user = await currentUser();
    if(!user) return  null;

    const userInfo = await fetchUser(user.id);
    if(userInfo?.onboarded) redirect('/')

    const userData = {
             id: user ? user.id : "",
            objectId: userInfo ? userInfo._id : "",
            username: userInfo ? userInfo.username || (user ? user.username : "") : "",
            name: userInfo ? userInfo.name || (user ? user.firstName : "") || "" : "",
            bio: userInfo ? userInfo.bio || "" : "",
            image: userInfo ? userInfo.image || (user ? user.imageUrl : "") : "",

    };
 
    return  (
        <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
            <h1 className="head-text">Onboarding</h1>
            <p className=" mt-3 text-base-regular text-light-2">
                Complete your profile to use Threads
            </p>

            <section className="mt-9 bg-dark-2 p-10">
                <AccountProfile 
                    user = {userData} 
                    btnTitle = "Continue"
                />
            </section>
        </main>
    );
}

export default Page;