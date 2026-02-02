import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) { }

  async findAll(filter:string) {
    return await this.userModel.find({role:filter}).exec();
  }
  async findByEmail(email: string) {    
    return this.userModel.findOne({ email }).exec();
  }
  async findById(id: string) {
    return this.userModel.findById(id).exec();
  }
  async create(userData: Partial<User>) {
    const existing = await this.findByEmail(userData.email!);
    if (existing) throw new ConflictException('Email already exists');

    const user = new this.userModel(userData);
    return user.save();
  }


async update(id: string, updateData: Partial<User>) {
  if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Invalid id');

  // لو بعت email جديد
  if (updateData.email) {
    const exists = await this.userModel.findOne({
      email: updateData.email,
      _id: { $ne: id }, // مش نفس اليوزر
    });

    if (exists) {
      throw new ConflictException(
        'this email is registred for another account',
      );
    }
  }

  const user = await this.userModel.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  if (!user) throw new NotFoundException('User not found');

  return user;
}

  async delete(id: string) {
    const user = await this.userModel.findByIdAndDelete(id);
    return user;
  }
}
