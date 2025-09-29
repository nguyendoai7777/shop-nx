import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaClientService } from '@services';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaClientService) {}

  create(data: CreateArticleDto) {
    return this.prisma.article.create({ data: data });
  }

  findDrafts() {
    return this.prisma.article.findMany({ where: { published: false } });
  }

  findAll() {
    return `this.prisma.article.findMany({ where: { published: true } })`;
  }

  findOne(id: number) {
    return this.prisma.article.findUnique({ where: { id } });
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return this.prisma.article.update({
      where: { id },
      data: updateArticleDto,
    });
  }

  remove(id: number) {
    return this.prisma.article.delete({ where: { id } });
  }
}
