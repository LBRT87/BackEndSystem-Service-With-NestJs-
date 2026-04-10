import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, Req, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateContentDTO } from '../dto/createContent.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { UpdateContentDTO } from '../dto/updateContent.dto';
import { DeleteContentDTO } from '../dto/deleteContent.dto';
import { GetContentByIDDTO } from '../dto/getContentById';

@ApiTags('Manage Content')
@Controller('manageContent')
export class ManageContentController {
    constructor(@Inject('POST_SERVICE') private postClient:ClientProxy ) {}

  
  @Post('create/content')
    @ApiConsumes('multipart/form-data')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @UseInterceptors(FileFieldsInterceptor([
        {name:'file',maxCount:1}
    ], {
        storage:diskStorage({
            destination:'public/upload',
            filename: (req,file,cb) => {
                const namaFile = file.originalname
                cb(null,namaFile)
            }
        })
    }))
    createContent (
        @Req() req,
        @Body() dto:CreateContentDTO,
        @UploadedFiles() files: {file?:Express.Multer.File[]}
    ) {
        const uploadfile = files.file ? files.file[0] : null

        const objekData = {
            user:req.user.userid,
            pathContent:uploadfile ? uploadfile.filename : null ,
            title:dto.title

        }
        return this.postClient.send({cmd:'CREATEPOST'},objekData)
    }

    @Patch('update/content')
    @ApiConsumes('multipart/form-data')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @UseInterceptors(FileFieldsInterceptor([
        {name:'file',maxCount:1}
    ], {
        storage:diskStorage({
            destination:'public/upload',
            filename: (req,file,cb) => {
                const namaFile = file.originalname
                cb(null,namaFile)
            }
        })
    }))
    updateContent (
        @Req() req,
        @Body() dto:UpdateContentDTO,
        @UploadedFiles() files: {file? :Express.Multer.File}
    ) {
        const uploadfile = files.file ? files.file[0] : null
        const objekData = {
            user:req.user.userid,
            pathContent:uploadfile ? uploadfile.filename : null ,
            title:dto.title,
            idcontent:dto.idContent

        }
        return this.postClient.send({cmd:'UPDATEPOST'},objekData)
    }


    @Delete('delete/content')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    deleteContent (@Req() req, @Query() dto:DeleteContentDTO) {
        const userid = req.user.userid
        const objekData = {
            userid:userid,
            idcontent:Number(dto.idcontent)
        }
        return this.postClient.send({cmd:'DELETEPOST'},objekData)
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Get('get/allcontent')
    async getAllContent () {
        return this.postClient.send({cmd:'GETPOSTS'},0)
    }

    @Get('get/contentbyid')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async getContentById (@Query() id:GetContentByIDDTO) {
        const idcontent = Number(id.id)
        return this.postClient.send({cmd:'GETPOSTBYID'},idcontent)
    }

    @Get('get/contentbyuser')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async getContentByUser (@Req() userid) {
        const user_id = userid.user.userid
        return this.postClient.send({cmd:'GETPOSTBYUSER'},user_id)
    }
}
