import { Injectable } from '@nestjs/common';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../generated/prisma';

@Injectable()
export class PrismaService extends PrismaClient {

    constructor() {
        const adapter = new PrismaMariaDb ({
            host:"localhost",
            port:3306,
            connectionLimit:10,
            database:"contentassitant",
            user:"root",
            password:""
        })
        super({adapter})

    }

}
