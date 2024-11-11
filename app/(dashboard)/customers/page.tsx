import { DataTable } from '@/components/custom ui/DataTable'
import { columns } from '@/components/customers/CustomerColumns'
import { Separator } from '@/components/ui/separator'
import prisma from '@/lib/db'



const Customers = async () => {

  const customers = await prisma.customer.findMany({
    orderBy:{createdAt:"desc"}
  })

  return (
    <div className='px-10 py-5'>
      <p className='text-heading2-bold'>Customers</p>
      <Separator className='bg-grey-1 my-5' />
      <DataTable columns={columns} data={customers} searchKey="name"/>
    </div>
  )
}

export const dynamic = "force-dynamic";

export default Customers