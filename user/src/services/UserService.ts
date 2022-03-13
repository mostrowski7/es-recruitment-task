import User, { Role } from "../entities/User";
import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import HttpException from "../utils/HttpException";
import CreateUserDto from "dto/CreateUserDto";
import bcrypt from "bcrypt";
import LoginUserDto from "dto/LoginUserDto";
import { env } from "../config/index";
import jwt from "jsonwebtoken";
import { checkPermissions } from "../middlewares/checkRole";

@Service()
export default class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(user: Partial<User>): Promise<User> {
    const createdUser = await this.userRepository.save(user);
    if (!createdUser) throw new HttpException(500, "Cannot create user");
    return createdUser;
  }

  async findOneById(id: string): Promise<User> {
    const userRow = await this.userRepository.findOne(id);
    if (!userRow) throw new HttpException(404, "User not found");
    return userRow;
  }

  async findOneWithPassword(username: string): Promise<User> {
    const userRow = await this.userRepository.findOne({
      where: { username },
      select: ["id", "username", "password", "role"],
    });
    if (!userRow) throw new HttpException(404, "User not found");
    return userRow;
  }

  async register(createUserDto: CreateUserDto): Promise<Partial<User>> {
    const { username, password } = createUserDto;
    await this.checkIfUserAlreadyExists(username);
    const hashedPassword = await this.hashPassword(password);
    const createdUser: Partial<User> = await this.create({
      username,
      password: hashedPassword,
    });
    delete createdUser.password;
    return createdUser;
  }

  async login(loginUserDto: LoginUserDto): Promise<string> {
    const userRow = await this.findOneWithPassword(loginUserDto.username);
    await this.comparePasswords(loginUserDto.password, userRow.password);
    return await this.generateToken({
      id: userRow.id,
      username: userRow.username,
      role: userRow.role,
    });
  }

  async validateUser(data: { user: Partial<User> | undefined; role: Role }) {
    const { user, role } = data;
    if (user && user.role && role) {
      if (checkPermissions(user.role, role)) return user;
    }
    throw new HttpException(401, "Permission denied");
  }

  async comparePasswords(plaintext: string, hash: string): Promise<void> {
    const result = bcrypt.compare(plaintext, hash);
    if (!result) throw new HttpException(400, "Incorrect password");
  }

  async hashPassword(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, 10);
    if (!hash) throw new HttpException(500, "Cannot hash password");
    return hash;
  }

  async generateToken(data: Partial<User>): Promise<string> {
    const token = jwt.sign(data, env.JWT_USER_SECRET_KEY, { expiresIn: "1h" });
    if (!token) throw new HttpException(500, "Cannot sign token");
    return token;
  }

  async checkIfUserAlreadyExists(username: string): Promise<void> {
    const userRow = await this.userRepository.findOne({ username });
    if (userRow) throw new HttpException(409, "User already exists");
  }
}
