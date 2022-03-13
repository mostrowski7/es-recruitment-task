import { Inject, Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import HttpException from "../utils/HttpException";
import Basket from "../entities/Basket";
import Product from "../entities/Product";
import ProductService from "./ProductService";

@Service()
export default class BasketService {
  constructor(
    @InjectRepository(Basket)
    private readonly basketRepository: Repository<Basket>,
    @Inject() private readonly productService: ProductService
  ) {}

  async create(userId: string): Promise<Partial<Basket>> {
    const basketRow = await this.basketRepository.findOne({ userId });
    if (basketRow) throw new HttpException(409, "Basket already exists");
    const createdBasket: Partial<Basket> = await this.basketRepository.save({
      userId,
    });
    delete createdBasket.userId;
    if (!createdBasket) throw new HttpException(500, "Cannot create basket");
    return createdBasket;
  }

  async addProduct(data: {
    product: Pick<Product, "productId" | "amount">;
    userId: string;
  }): Promise<Product> {
    const {
      userId,
      product: { productId, amount },
    } = data;
    const basketRow = await this.findOneByUserId(userId);
    await this.productService.checkProductAmount(productId);
    const assignedProduct =
      await this.productService.checkIfProductIsAlreadyAssigned({
        basket: basketRow,
        productId,
      });
    if (assignedProduct) {
      const updatedAmount = this.productService.increaseProductAmount(
        assignedProduct.amount,
        amount
      );
      return await this.productService.updateProductAmount(
        assignedProduct,
        updatedAmount
      );
    }
    return await this.productService.create({
      basket: basketRow,
      productId,
      amount,
    });
  }

  async removeProduct(data: {
    product: Pick<Product, "productId" | "amount">;
    userId: string;
  }): Promise<Product | undefined> {
    const {
      userId,
      product: { productId, amount },
    } = data;
    const basketRow = await this.findOneByUserId(userId);
    const assignedProduct =
      await this.productService.checkIfProductIsAlreadyAssigned({
        basket: basketRow,
        productId,
      });
    if (!assignedProduct)
      throw new HttpException(404, "Product is not assigned to basket");
    const updatedAmount = this.productService.decreaseProductAmount(
      assignedProduct.amount,
      amount
    );
    if (updatedAmount === 0) {
      await this.productService.delete(assignedProduct.id);
      return;
    }
    return await this.productService.updateProductAmount(
      assignedProduct,
      updatedAmount
    );
  }

  async findOneByUserId(userId: string): Promise<Basket> {
    const basketRow = await this.basketRepository.findOne({
      where: { userId },
      relations: ["products"],
    });
    if (!basketRow) throw new HttpException(409, "Basket not found");
    return basketRow;
  }

  async findOneById(id: string): Promise<Basket> {
    const basketRow = await this.basketRepository.findOne({
      where: { id },
      relations: ["products"],
    });
    if (!basketRow) throw new HttpException(404, "Basket not found");
    return basketRow;
  }
}
