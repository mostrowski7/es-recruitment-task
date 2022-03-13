import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsPostalCode,
  IsString,
  IsUUID,
  Length,
} from "class-validator";

export default class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  basketId: string;

  @IsString()
  @Length(3, 50)
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @Length(3, 50)
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @Length(3, 50)
  @IsNotEmpty()
  city: string;

  @IsPostalCode("PL")
  @IsNotEmpty()
  postalCode: string;

  @IsString()
  @Length(3, 50)
  @IsNotEmpty()
  street: string;

  constructor(
    basketId: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    city: string,
    postalCode: string,
    street: string
  ) {
    this.basketId = basketId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.city = city;
    this.postalCode = postalCode;
    this.street = street;
  }
}
