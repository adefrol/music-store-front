import { Admin } from "@/components/pages/admin";
import { UserService } from "@/service/user.service";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
    beforeLoad: async({ location }) => {
        if (!await UserService.isAdmin()) {
            throw redirect({
                to: "/login",
                search: {
                    redirect: location.href,
                },
            });
        }
    },
    component: Admin,
    
});
