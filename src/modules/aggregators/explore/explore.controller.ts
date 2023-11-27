import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { ExploreService } from './explore.service';
import { AuthGuard } from '../auth/auth.guard';
import { AuthorGuard } from '../auth/author.guard';
import { RegisterAdminData } from '../../resource/user/dto/request.dto';
import { AddProductData } from '../../resource/cart/dto/request.dto';
import { AddOrderData } from '../../resource/order/dto/request.dto';

@Controller('explore')
export class ExploreController {
  constructor(private readonly exploreService: ExploreService) {}

  @Post('registers')
  @ApiOkResponse({
    description: 'Register User',
  })
  async registerUser(@Body() body: RegisterAdminData) {
    return this.exploreService.registerUser(body);
  }

  @UseGuards(AuthGuard, AuthorGuard)
  @Get('shoes')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Get list Shoes',
  })
  async getListShoes() {
    return this.exploreService.getListShoes();
  }

  @UseGuards(AuthGuard, AuthorGuard)
  @Get('shoes/:id')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Get Shoes detail',
  })
  async getShoesDetail(@Param() param) {
    return this.exploreService.getShoesDetail(Number(param.id));
  }

  @UseGuards(AuthGuard, AuthorGuard)
  @Get('categories')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Get list Category',
  })
  async getListCategory() {
    return this.exploreService.getListCategory();
  }

  @UseGuards(AuthGuard, AuthorGuard)
  @Get('categories/:id')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Get Category detail',
  })
  async getCategoryDetail(@Param() param) {
    return this.exploreService.getCategoryDetail(Number(param.id));
  }

  @UseGuards(AuthGuard, AuthorGuard)
  @Post('carts/add-product')
  async addProductToCart(@Request() req, @Body() body: AddProductData) {
    return this.exploreService.addProductToCart(req.user, body);
  }

  @UseGuards(AuthGuard, AuthorGuard)
  @Get('carts/orders')
  async getOrderInCart(@Request() req) {
    return this.exploreService.getOrderInCart(Number(req.user.id));
  }

  @UseGuards(AuthGuard, AuthorGuard)
  @Get('orders')
  async getOrder() {
    return this.exploreService.getOrder();
  }

  @UseGuards(AuthGuard, AuthorGuard)
  @Post('add-orders')
  async addOrder(@Request() req, @Body() body: AddOrderData) {
    return this.exploreService.addOrder(req.user, body);
  }
}
