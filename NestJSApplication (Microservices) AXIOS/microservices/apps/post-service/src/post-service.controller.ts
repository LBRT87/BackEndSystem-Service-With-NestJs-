import { Body, Controller, Delete, Get, Patch, Post, Query, Req } from '@nestjs/common';
import { PostServiceService } from './post-service.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateContent } from './dto/create.dto';
import { UpdateContent } from './dto/update.dto';
import { DeleteContent } from './dto/delete.dto';
import { GetContentId } from './dto/getContentbyId.dto';

@Controller('content')
export class PostServiceController {
  constructor(private readonly postServiceService: PostServiceService) {}

  @Post('post')
  createPost (@Body() objekdata:CreateContent) {
    const userid = Number( objekdata.user )
    const title = objekdata.title
    const pathcontent = objekdata.pathContent
    return this.postServiceService.createPost(userid,title,pathcontent)
  }

  @Patch('update')
  updatePost (@Body() objekdata:UpdateContent){
    const userid = Number (objekdata.user)
    const idContent = Number(objekdata.idcontent)
    const title = objekdata.title
    const pathcontent = objekdata.pathContent
    return this.postServiceService.updatePost(userid,idContent,title,pathcontent)
  }
        

  @Delete('remove')
  deletePost (@Body() objekData:DeleteContent){
    const userid = objekData.userid
    const idContent = objekData.idcontent
    return this.postServiceService.deletePost(userid,idContent)
  }

  @Get('getall')
  getPosts(){
    return this.postServiceService.getPosts()
  }

  @Get('getbyid')
  getPostById (@Query('id') idContent:number) {
    return this.postServiceService.getPostById(idContent)
  }

  @Get('getbyuser')
  getPostByUser(@Query('iduser') userid:number) {

    return this.postServiceService.getPostByUser(userid)
  }

}
