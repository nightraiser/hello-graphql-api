import PostModel from '../models/post.schema';

export const findAllAsync = async () => {
    return await PostModel.find();
}

export const findOne = async (id) => {
    return await PostModel.find({_id: id});
}

export const findByUser = async (userId) => {
    return await PostModel.find({user: userId});
}

export const createAsync = async (title, text, userId) => {
    const row = new PostModel({title, text, user: userId});
    return await row.save();
}