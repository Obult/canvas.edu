import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Pixel, Prisma } from '@prisma/client';

export interface pixelDto {
  x: number,
  y: number,

}

@Injectable()
export class PrismaPixelService {
  constructor(private prisma: PrismaService) {}

  async Pixel(
    PixelWhereUniqueInput: Prisma.PixelWhereUniqueInput,
  ): Promise<Pixel | null> {
    return this.prisma.pixel.findUnique({
      where: PixelWhereUniqueInput,
    });
  }

  async Pixels(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PixelWhereUniqueInput;
    where?: Prisma.PixelWhereInput;
    orderBy?: Prisma.PixelOrderByWithRelationInput;
  }): Promise<Pixel[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.pixel.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createPixel(data: Prisma.PixelCreateInput): Promise<Pixel> {
    return this.prisma.pixel.create({
      data,
    });
  }

  async updatePixel(params: {
    where: Prisma.PixelWhereUniqueInput;
    data: Prisma.PixelUpdateInput;
  }): Promise<Pixel> {
    const { where, data } = params;
    return this.prisma.pixel.update({
      data,
      where,
    });
  }
  
  async deletePixel(where: Prisma.PixelWhereUniqueInput): Promise<Pixel> {
    return this.prisma.pixel.delete({
      where,
    });
  }
}
