import { columns } from "@/components/app/create-cert/columns"
import { DataTable } from "@/components/app/create-cert/data-table"
import { UserNav } from "@/components/app/create-cert/user-nav"

import { tasks } from "@/components/app/create-cert/data/tasks"

import DashboardLayout from "@/components/layout/dashboard/dashboard"
import { ReactElement } from "react"
import { Button } from "@/components/ui/button"



const TaskPage = () => {
    return (
        <>

            <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        {/* <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
                        <p className="text-muted-foreground">
                            Here&apos;s a list of your tasks for this month!
                        </p> */}
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button> upload csv</Button>
                    </div>
                </div>
                <DataTable data={tasks} columns={columns} />
            </div>
        </>
    )
}

TaskPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <DashboardLayout>{page}</DashboardLayout>
    )
}

export default TaskPage