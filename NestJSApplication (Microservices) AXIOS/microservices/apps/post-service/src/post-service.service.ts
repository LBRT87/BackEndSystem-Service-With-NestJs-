import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { RpcException } from '@nestjs/microservices';
import { GetContentId } from './dto/getContentbyId.dto';

@Injectable()
export class PostServiceService {
  constructor(private readonly prisma:PrismaService) {}

  async createPost (
    id:number,
    title:string,
    pathcontent:string
  ) {

    try {

      const newPost = await this.prisma.content.create({
        data:{
          User_id:Number(id),
          Title:title,
          Content:pathcontent
        }
      })
      return {message:'Content Succed Post !'}
    } catch (error) {
      console.log(error)
      return {message:'Failed Post !'}
    }
  }

  async updatePost (
    userid:number, 
    idContent:number,
    title:string,
    content:string
  ) {

    const existContent = await this.prisma.content.findUnique({
      where:{Id:idContent}})
  
    if(!existContent){
      return {message:'Content Not Found'}
      }
      
    if (existContent.User_id !== userid) {
      return {pesan: 'You Dont Have Access'}
    }

    const updatePost = await this.prisma.content.update({
      where:{Id:idContent},
      data:{
        Title:title,
        Content:content
      }
    })

    return {message:'Update Success !'}
  }

  async deletePost (
    userid:number,
    idContent:number
  ) {
    const existContent = await this.prisma.content.findUnique({
      where:{Id:idContent}
    })

    if (!existContent){
      return {message: 'Content Not Found'}
    }
    if (existContent?.User_id !== userid) {
      return {message: 'You Dont Have Access To Delete'}
    }

    const deletePost = await this.prisma.content.delete({
      where:{Id:idContent}
    })

    return {message:'Delete Success'}
  }

  async getPosts () {
    return this.prisma.content.findMany()
  }

  async getPostById (idContent:number) {
    const existContent = await this.prisma.content.findUnique({
      where:{Id:Number(idContent)}
    })

    if (!existContent){
      return {message : 'Content Not Found'}
    }

    return existContent
  }

  async getPostByUser (userid:number) {
    return this.prisma.content.findMany({
      where:{User_id:Number(userid)}
    })
  }
}
