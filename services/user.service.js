import UserModel from '../models/user.schema';

export const findAllAsync = async () => {
    return await UserModel.find().populate('');
}

export const findOne = async (id) => {
    const user = UserModel.find({_id: id});
    return await user.populate('posts');
}

export const createAsync = async (name) => {
    const row = new UserModel({name});
    return await row.save();
}