import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ExploreService } from './explore.service';
import { AuthGuard } from '../auth/auth.guard';
import { AuthorGuard } from '../auth/author.guard';
import { RegisterAdminData } from '../../resource/user/dto/request.dto';
import {
  AddProductData,
  PaidCartData,
} from '../../resource/cart/dto/request.dto';
import { AddOrderData } from '../../resource/order/dto/request.dto';
import { GetCmsShoesData } from '../../resource/shoes/dto/request.dto';

@Controller('explore')
export class ExploreController {
  constructor(private readonly exploreService: ExploreService) {}

  @Post('registers')
  async registerUser(@Body() body: RegisterAdminData) {
    return this.exploreService.registerUser(body);
  }

  @Get('shoes')
  async getListShoes(@Query() getShoesData: GetCmsShoesData) {
    return this.exploreService.getListShoes(getShoesData);
  }

  @Get('shoes/:id')
  async getShoesDetail(@Param() param) {
    return this.exploreService.getShoesDetail(Number(param.id));
  }

  @Get('categories')
  async getListCategory() {
    return this.exploreService.getListCategory();
  }

  @Get('categories/:id')
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
  @Get('orders/:id')
  async getOrderDetail(@Param() param) {
    return this.exploreService.getOrderDetail(param.id);
  }

  @UseGuards(AuthGuard, AuthorGuard)
  @Post('add-orders')
  async addOrder(@Request() req, @Body() body: AddOrderData) {
    return this.exploreService.addOrder(req.user, body);
  }

  @UseGuards(AuthGuard, AuthorGuard)
  @Get('profile')
  async getUserDetail(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard, AuthorGuard)
  @Delete('carts/delete-product/:id')
  async deleteProductInCart(@Request() req, @Param() param) {
    return this.exploreService.deleteProductInCart(req?.user, param?.id);
  }

  @UseGuards(AuthGuard, AuthorGuard)
  @Patch('carts/update-product/:id')
  async updateProductQuantityInCart(
    @Request() req,
    @Param() param,
    @Body() body,
  ) {
    return this.exploreService.updateProductQuantityInCart(
      req?.user,
      param?.id,
      body?.quantity,
    );
  }

  @UseGuards(AuthGuard, AuthorGuard)
  @Patch('carts/paid')
  async paidCart(@Request() req, @Body() body: PaidCartData) {
    return this.exploreService.paidCart(req?.user, body);
  }

  @UseGuards(AuthGuard, AuthorGuard)
  @Get('orders')
  async getOrders(@Request() req) {
    return this.exploreService.getListOrderByUser(req?.user);
  }

  @Get('todos')
  async getListTodos() {
    return this.exploreService.getListTodos();
  }

  @Get('todos/:id')
  async getTodosDetail(@Param() param) {
    return this.exploreService.getDetailTodos(Number(param.id));
  }

  @Post('todos')
  async createTodos(@Body() body) {
    return this.exploreService.createTodos(body);
  }

  @Patch('todos/:id')
  async updateTodos(@Param() params, @Body() body) {
    return this.exploreService.updateTodos(params.id, body);
  }

  @Delete('todos/:id')
  async deleteTodos(@Param() params) {
    return this.exploreService.deleteTodos(params.id);
  }
}
