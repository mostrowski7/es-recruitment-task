import Product from "../entities/Product";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import Basket from "../entities/Basket";
import HttpException from "../utils/HttpException";
import { Service } from "typedi";
import axios from "axios";
import { env } from "../config";

@Service()
export default class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  async create(data: Partial<Product>): Promise<Product> {
    const createdProduct = await this.productRepository.save(data);
    if (!createdProduct) throw new HttpException(500, "Cannot create product");
    return createdProduct;
  }

  async delete(id: string): Promise<void> {
    const deletedProduct = await this.productRepository.delete(id);
    if (deletedProduct.affected === 0)
      throw new HttpException(500, "Cannot delete product");
  }

  async checkIfProductIsAlreadyAssigned(data: {
    basket: Basket;
    productId: number;
  }): Promise<Product | undefined> {
    const { basket, productId } = data;
    const productRow = await this.productRepository.findOne({
      basket,
      productId,
    });
    return productRow;
  }

  async updateProductAmount(
    product: Product,
    amount: number
  ): Promise<Product> {
    product.amount = amount;
    return await this.productRepository.save(product);
  }

  increaseProductAmount(current: number, toAdd: number): number {
    return current + toAdd;
  }

  decreaseProductAmount(current: number, toSubtract: number) {
    if (toSubtract > current)
      throw new HttpException(400, "Cannot remove more product than you have");
    return current - toSubtract;
  }

  async checkProductAmount(productId: number): Promise<void> {
    const response = await axios.get<Product>(
      `${env.PRODUCT_SERVICE_PATH}/${productId.toString()}/get`
    );
    if (response.data?.amount === 0)
      throw new HttpException(409, "Product run out");
  }
}
