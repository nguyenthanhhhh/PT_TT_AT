import { Injectable } from '@nestjs/common';
import { UserService } from '../../resource/user/user.service';
import { RegisterAdminData } from '../../resource/user/dto/request.dto';
import { ShoesService } from '../../resource/shoes/shoes.service';
import { CategoryService } from '../../resource/category/category.service';
import { AddProductData } from '../../resource/cart/dto/request.dto';
import { CartService } from '../../resource/cart/cart.service';
import { OrderService } from '../../resource/order/order.service';
import { AddOrderData } from '../../resource/order/dto/request.dto';

@Injectable()
export class ExploreService {
  constructor(
    private readonly userService: UserService,
    private readonly shoesService: ShoesService,
    private readonly categoryService: CategoryService,
    private readonly cartService: CartService,
    private readonly orderService: OrderService,
  ) {}

  async registerUser(registerUserData: RegisterAdminData) {
    return this.userService.registerUser(registerUserData);
  }

  async getListShoes() {
    return this.shoesService.getListShoes();
  }

  async getShoesDetail(shoesId: number) {
    return this.shoesService.getShoesDetail(shoesId);
  }

  async getListCategory() {
    return this.categoryService.getListCategory();
  }

  async getCategoryDetail(categoryId: number) {
    return this.categoryService.getCategoryDetail(categoryId);
  }

  async addProductToCart(user: any, addProductData: AddProductData) {
    return this.cartService.addProductToCart(user, addProductData);
  }

  async getOrderInCart(userId: number) {
    return this.cartService.getOrderInCart(userId);
  }

  async getOrder() {
    return this.orderService.getOrderCms();
  }

  async addOrder(user: any, addOrderData: AddOrderData) {
    return this.orderService.addOrder(user, addOrderData);
  }
}
