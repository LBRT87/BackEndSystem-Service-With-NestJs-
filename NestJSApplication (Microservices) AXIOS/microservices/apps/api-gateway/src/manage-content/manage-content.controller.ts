import { Body, Controller, Delete, Get,  Param,  Patch, Post, Query, Req, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateContentDTO } from '../dto/createContent.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { UpdateContentDTO } from '../dto/updateContent.dto';
import { DeleteContentDTO } from '../dto/deleteContent.dto';
import { GetContentByIDDTO } from '../dto/getContentById';
import axios from 'axios';

@ApiTags('Manage Content')
@Controller('manageContent')
export class ManageContentController {
    constructor() {}
  
    @Post('create')
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
    async createContent (
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

        const token = req.headers.authorization
        const response = await axios.post('http://localhost:3015/content/post',objekData,{
            headers:{Authorization:token}
        })
        return response.data
    }

    @Patch('update')
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
    async updateContent (
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
        const token = req.headers.authorization
        const response = await axios.patch('http://localhost:3015/content/update',objekData,{
            headers:{Authorization:token}
        })
        return response.data
    }


    @Delete('delete')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async deleteContent (@Req() req, @Query() dto:DeleteContentDTO) {
        const userid = req.user.userid
        const objekData = {
            userid:userid,
            idcontent:Number(dto.idcontent)
        }
        const token = req.headers.Authorization
        const response = await axios.delete('http://localhost:3015/content/remove',{
            headers:{Authorization:token},
            data:objekData
        })
        return response.data
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Get('get/allcontent')
    async getAllContent (@Req() req) {
        const token = req.headers.authorization
        const response = await axios.get('http://localhost:3015/content/getall',{
            headers:{Authorization:token}
        })
        return response.data
    }

    @Get('get/contentbyid')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async getContentById (@Query() id:GetContentByIDDTO, @Req() req) {
        const token = req.headers.authorization
        const idObject = Number(id.id)
        const response = await axios.get('http://localhost:3015/content/getbyid',{
            headers:{Authorization:token},
            params:{id:idObject}
        })
        return response.data
    }

    @Get('get/contentbyuser')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async getContentByUser (@Req() req) {

        console.log('SAMPE DI GATEWAY GET CONTENT BY USER',req.user.userid)
        const idObject = Number(req.user.userid)
        const token = req.headers.authorization
        const response = await axios.get('http://localhost:3015/content/getbyuser',{
            headers:{Authorization:token},
            params:{iduser:Number(idObject)}
        })
        return response.data
    }
}
