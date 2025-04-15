import 'module-alias/register'; // for resolving customized paths
import { app } from '@/app';
import env from '@/config/env.config'
import prisma from '@/lib/prisma';

init()

async function init() {
    try {
        app.listen(process.env.PORT || env.PORT || 3200, () => {
            console.log(`App Listening on Port ${env.PORT}`)
        })
  
    } catch (error) {
        console.error(`An error occurred: ${JSON.stringify(error)}`)
        await prisma.$disconnect()
        process.exit(1)
    }
}
