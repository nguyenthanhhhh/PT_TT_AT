import { Injectable } from '@nestjs/common';
import { UserService } from '../../resource/user/user.service';
import { RegisterAdminData } from '../../resource/user/dto/request.dto';
import { ShoesService } from '../../resource/shoes/shoes.service';
import { CategoryService } from '../../resource/category/category.service';
import {
  AddProductData,
  PaidCartData,
} from '../../resource/cart/dto/request.dto';
import { CartService } from '../../resource/cart/cart.service';
import { OrderService } from '../../resource/order/order.service';
import { AddOrderData } from '../../resource/order/dto/request.dto';
import { GetCmsShoesData } from '../../resource/shoes/dto/request.dto';
import { TodosService } from '../../resource/todos/todos.service';

@Injectable()
export class ExploreService {
  constructor(
    private readonly userService: UserService,
    private readonly shoesService: ShoesService,
    private readonly categoryService: CategoryService,
    private readonly cartService: CartService,
    private readonly orderService: OrderService,
    private readonly todosService: TodosService,
  ) {}

  async registerUser(registerUserData: RegisterAdminData) {
    return this.userService.registerUser(registerUserData);
  }

  async getListShoes(getShoesData: GetCmsShoesData) {
    return this.shoesService.getListShoes(getShoesData);
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

  async getOrderDetail(id: number) {
    return this.orderService.getOrderDetail(id);
  }

  async addOrder(user: any, addOrderData: AddOrderData) {
    return this.orderService.addOrder(user, addOrderData);
  }

  async deleteProductInCart(user: any, orderId: number) {
    return this.cartService.deleteProductInCart(user, orderId);
  }

  async updateProductQuantityInCart(
    user: any,
    orderId: number,
    quantity: number,
  ) {
    return this.cartService.updateProductQuantityInCart(
      user,
      orderId,
      quantity,
    );
  }

  async paidCart(user: any, paidCartData: PaidCartData) {
    return this.cartService.paidCart(user, paidCartData);
  }

  async getListOrderByUser(user: any) {
    return this.orderService.getOrderByUser(user);
  }

  async getListTodos() {
    return this.todosService.getList();
  }

  async getDetailTodos(id) {
    return this.todosService.getDetail(id);
  }

  async createTodos(createData) {
    return this.todosService.create(createData);
  }

  async updateTodos(id, updateData) {
    return this.todosService.update(id, updateData);
  }

  async deleteTodos(id) {
    return this.todosService.delete(id);
  }
}
