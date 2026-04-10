import { Controller, Get } from '@nestjs/common';
import { PostServiceService } from './post-service.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateContent } from './dto/create.dto';
import { UpdateContent } from './dto/update.dto';
import { DeleteContent } from './dto/delete.dto';

@Controller()
export class PostServiceController {
  constructor(private readonly postServiceService: PostServiceService) {}

  @MessagePattern({cmd:'CREATEPOST'})
  createPost (objekdata:CreateContent) {
    const userid = Number( objekdata.user )
    const title = objekdata.title
    const pathcontent = objekdata.pathContent
    console.log('Sampe Di Controller Create Post')
    console.log(objekdata)
    return this.postServiceService.createPost(userid,title,pathcontent)
  }

  @MessagePattern ({cmd:'UPDATEPOST'})
  updatePost (objekdata:UpdateContent){
    const userid = Number (objekdata.user)
    const idContent = Number(objekdata.idcontent)
    const title = objekdata.title
    const pathcontent = objekdata.pathContent
    return this.postServiceService.updatePost(userid,idContent,title,pathcontent)
  }
        

  @MessagePattern({cmd:'DELETEPOST'})
  deletePost (objekData:DeleteContent){
    const userid = objekData.userid
    const idContent = objekData.idcontent
    return this.postServiceService.deletePost(userid,idContent)
  }

  @MessagePattern({cmd:'GETPOSTS'})
  getPosts(){
    return this.postServiceService.getPosts()
  }

  @MessagePattern({cmd:'GETPOSTBYID'})
  getPostById (idContent:number) {
    return this.postServiceService.getPostById(idContent)
  }

  @MessagePattern({cmd:'GETPOSTBYUSER'})
  getPostByUser(userid:number) {
    return this.postServiceService.getPostByUser(userid)
  }

}
