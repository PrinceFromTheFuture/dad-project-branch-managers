import getPayload from '@/lib/getPayload'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ branchName: string }> },
) {
  try {
    const { branchName } = await params // This would work if destructuring was right
    const payload = await getPayload()
    // Since branchName is unique, we should query by `where` instead of findByID
    const branches = await payload.find({
      collection: 'branches',
      where: {
        name: { equals: branchName },
      },
      depth: 5,
    })

    if (!branches.docs?.length) {
      return NextResponse.json({ success: false, message: 'Branch not found' }, { status: 404 })
    }

    const branch = branches.docs[0]
    return NextResponse.json(branch.settings)
  } catch (e) {
    console.log(e)
    return NextResponse.json({ success: false }, { status: 400 })
  }
}
