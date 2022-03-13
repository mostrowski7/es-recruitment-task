import axios from "axios";
import { env } from "../config";
import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import Order from "../entities/Order";
import generateServiceToken from "../utils/generateServiceToken";
import { Basket, Product } from "types";
import HttpException from "../utils/HttpException";

@Service()
export default class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>
  ) {}

  async create(order: Omit<Order, "userId">): Promise<Order> {
    const { basketId, ...restOrderInfo } = order;
    const basketRow = await this.checkIfBasketExists(basketId);
    const orderRow = await this.orderRepository.save({
      basketId,
      userId: basketRow.userId,
      ...restOrderInfo,
    });
    await this.decreaseProductsAmount(basketRow.products);
    return orderRow;
  }

  async checkIfBasketExists(basketId: string): Promise<Basket> {
    const response = await axios.get<Basket>(
      `${env.BASKET_SERVICE_PATH}/${basketId}/get/service`,
      { headers: { service: generateServiceToken() } }
    );
    return response.data;
  }

  async decreaseProductsAmount(products: Product[]): Promise<Product[]> {
    const transformedProducts = products.map((p: Product) => ({
      id: p.productId,
      amount: p.amount,
    }));
    const response = await axios.put<Product[]>(
      `${env.PRODUCT_SERVICE_PATH}/decrease/service`,
      {
        products: transformedProducts,
      },
      {
        headers: { service: generateServiceToken() },
      }
    );
    return response.data;
  }

  async find(data: { id: string; userId: string }): Promise<Order | Order[]> {
    const { id, userId } = data;
    if (id) return await this.findOne(id);
    return await this.findByUserId(userId);
  }

  async findOne(id: string): Promise<Order> {
    const orderRow = await this.orderRepository.findOne(id);
    if (!orderRow) throw new HttpException(404, "Order not found");
    return orderRow;
  }

  async findByUserId(userId: string): Promise<Order | Order[]> {
    return await this.orderRepository.find({ userId });
  }

  async deleteOrder(id: string): Promise<void> {
    await this.findOne(id);
    await this.orderRepository.delete(id);
  }
}
