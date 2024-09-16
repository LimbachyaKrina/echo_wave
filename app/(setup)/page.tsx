import { initialProfile } from "@/lib/initial-profile"
import { db } from "@/lib/db"
import { redirect } from 'next/navigation'
import { RedirectToSignIn } from '@clerk/nextjs'
import { InitialModal } from "@/components/modals/initial-modal"

const SetupPage = async () => {
    const result = await initialProfile()

    if ('redirect' in result) {
        return <RedirectToSignIn />
    }

    const { profile } = result

    const server = await db.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    if (server) {
        redirect(`/servers/${server.id}`);
    }

    return <InitialModal />
}

export default SetupPage;