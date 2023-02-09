// import { Injectable } from '@nestjs/common';
// import { PrismaService } from 'src/prisma/prisma.service';
// import { User, Prisma } from '@prisma/client';

// // @Injectable
// export class UserRetreiver {
//   constructor(private prisma: PrismaService) {}

//   async retreiveUser(intraId: number): Promise<User | null>  {
//     const temp = this.prisma.user.findUnique({where: {intraId: intraId}})
//     if (temp === null) {
//       return createNewUser()  // which needs to create a new user
//     }
//     return temp;
//   }
// }