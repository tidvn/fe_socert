import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function ExplorerPage() {
    const [data, setData] = useState()

    const handleChanges = (e: any) => {
        setData(e.target.value)
    }

    const handleSubmit = () => {
        console.log(data)
    }
    return (
        <>
            <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
                <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
                    <div className="space-x-4 w-[800px]">
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Input id="name" placeholder="Enter certificate address" onChange={handleChanges} />
                                    </div>
                                    <div className="flex flex-col items-center space-y-1.5">
                                        <Button onClick={handleSubmit}>Search</Button>
                                    </div>

                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </section>

        </>
    )
}
