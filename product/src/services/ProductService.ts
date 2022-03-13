import { Service } from "typedi";
import { Raw, Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import HttpException from "../utils/HttpException";
import Product from "../entities/Product";

@Service()
export default class ProductService {
  constructor(
    @InjectRepository(Product)
    protected productRepository: Repository<Product>
  ) {}

  async create(product: Partial<Product>): Promise<Product> {
    const createdProduct = await this.productRepository.save(product);
    if (!createdProduct) throw new HttpException(500, "Cannot create product");
    return createdProduct;
  }

  async delete(id: string): Promise<void> {
    await this.findOne(id);
    const deletedRow = await this.productRepository.delete(id);
    if (deletedRow.affected === 0)
      throw new HttpException(500, "Cannot delete product");
  }

  async update(product: Product): Promise<Product> {
    await this.findOne(product.id);
    const updatedProduct = await this.productRepository.save(product);
    if (!updatedProduct) throw new HttpException(500, "Cannot update product");
    return updatedProduct;
  }

  async findOne(id: string): Promise<Product> {
    const productRow = await this.productRepository.findOne(id);
    if (!productRow) throw new HttpException(404, "Product not found");
    return productRow;
  }

  async findAll(id: string): Promise<Product | Product[]> {
    if (id) return await this.findOne(id);
    return await this.productRepository.find();
  }

  async decreaseProductsAmount(
    products: Pick<Product, "id" | "amount">[]
  ): Promise<void> {
    const productIds = products.map((p) => p.id);
    const productRows = await this.productRepository.find({
      id: Raw((alias) => `${alias} IN (:...productIds)`, { productIds }),
    });
    const productsWithChangedAmount = this.calculateAmount(
      productRows,
      products
    );
    await this.productRepository.save(productsWithChangedAmount);
  }

  calculateAmount(
    products: Product[],
    toSubstract: Pick<Product, "id" | "amount">[]
  ): Product[] {
    if (products.length !== toSubstract.length)
      throw new HttpException(500, "Cannot update products amount");
    for (const product of products) {
      const foundProduct = toSubstract.find((p) => p.id === product.id);
      if (!foundProduct)
        throw new HttpException(404, "Product to decrease not found");
      if (foundProduct?.amount > product.amount)
        throw new HttpException(409, "Too much product to decrease");
      product.amount = product.amount - foundProduct.amount;
    }
    return products;
  }
}
